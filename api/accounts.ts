import AccountsServer from '@accounts/server';
import MongoAdapter from '@accounts/mongo';
import * as faker from 'faker';
import { getMongoClient } from './db/mongo';


export const initAccounts = async () => {
  let mongoAdapter = null;
  try {
    mongoAdapter = await getMongoClient().then(db => new MongoAdapter(db));
  }
  catch (e) {
    return;
  }
  AccountsServer.config({
    tokenConfigs: {
      accessToken: {
        expiresIn: '3d',
      },
      refreshToken: {
        expiresIn: '30d',
      },
    }
  }, mongoAdapter);

  return AccountsServer;
};
