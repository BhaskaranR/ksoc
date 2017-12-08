import 'babel-polyfill';
import * as express from 'express';
import * as session from 'express-session';
import * as Grant from 'grant-express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { JSAccountsContext } from '@accounts/graphql-api';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { initAccounts } from './accounts';
import { initializeOAuthResolver } from './oauth/oauth-service';
import { GRANT_PATH, grantConfig } from './oauth/grant-config';
import AccountsServer from '@accounts/server';
import formidable from 'formidable';
import * as path from 'path';
import jwt from 'jsonwebtoken';



import { addMockFunctionsToSchema, makeExecutableSchema } from 'graphql-tools';
import { createJSAccountsGraphQL } from '@accounts/graphql-api';

import * as mergeGraphqlSchemas from 'merge-graphql-schemas';

const PORT = 3000;
const WS_GQL_PATH = '/subscriptions';
const STATIC_SERVER = 'http://localhost:3000';


const fileLoader = mergeGraphqlSchemas.fileLoader;
const mergeTypes = mergeGraphqlSchemas.mergeTypes;
const mergeResolvers = mergeGraphqlSchemas.mergeResolvers;

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas'), { recursive: true, extensions: ['.graphql'] }))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));


function createSchemeWithAccounts(accountsServer) {
  const accountsGraphQL = createJSAccountsGraphQL(accountsServer);

  const mockResolvers = {
    Query: {},
    Mutation: {}
  };
  const resolversWithAccounts = accountsGraphQL.extendWithResolvers(resolvers);

  const executableSchema = makeExecutableSchema({
    typeDefs: [typeDefs, accountsGraphQL.schema],
    resolvers: resolversWithAccounts,
    logger: { log: (e) => console.log(e) },
  });

  return executableSchema;
}


const uploadDir = 'files';

const fileMiddleware = (req, res, next) => {
  if (!req.is('multipart/form-data')) {
    return next();
  }

  const form = formidable.IncomingForm({
    uploadDir,
  });

  form.parse(req, (error, { operations }, files) => {
    if (error) {
      console.log(error);
    }
    const document = JSON.parse(operations);
    if (Object.keys(files).length) {
      const { file: { type, path: filePath } } = files;
      console.log(type);
      console.log(filePath);
      document.variables.file = {
        type,
        path: filePath,
      };
    }
    req.body = document;
    next();
  });
};


async function main() {
  const app = express();
  app.use(cors());

  await initAccounts();

  app.use(session({
    secret: 'grant',
    resave: true,
    saveUninitialized: true,
  }));

  app.use(bodyParser.urlencoded({ extended: true }));

  const grant = new Grant(grantConfig);

  app.use(GRANT_PATH, grant);

  app.get(`${GRANT_PATH}/handle_facebook_callback`, function (req, res) {
    const accessToken = req.query.access_token;
    res.redirect(`${STATIC_SERVER}/login?service=facebook&access_token=${accessToken}`);
  });

  app.get(`${GRANT_PATH}/handle_google_callback`, function (req, res) {
    const accessToken = req.query.access_token;
    res.redirect(`${STATIC_SERVER}/login?service=google&access_token=${accessToken}`);
  });

  initializeOAuthResolver();

  const schema = createSchemeWithAccounts(AccountsServer);

  app.use('/graphql', bodyParser.json(), graphqlExpress(request => ({
    schema,
    context: JSAccountsContext(request),
    debug: true,
  })));

  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: 'ws://localhost:3000/subscriptions',
  }));

  const server = createServer(app);

  new SubscriptionServer(
    {
      schema,
      execute,
      subscribe,
      onConnect: async ({ token, refreshToken }, webSocket) => {
        if (token && refreshToken) {
          try {
            const { user } = jwt.verify(token, SECRET);
            return { models, user };
          } catch (err) {
            const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);
            return { models, user: newTokens.user };
          }
        }

        return { models };
      }
    },
    {
      path: WS_GQL_PATH,
      server,
    }
  );

  server.listen(PORT, () => {
    console.log('server running on: ' + PORT);
  });
}

main().catch((e) => console.error('Failed to start server', e));
