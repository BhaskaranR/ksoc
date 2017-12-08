import AccountsServer from '@accounts/server';

export default  {
  Mutation: {
    loginWithServiceAccessToken: async (root, { user, userFields, password }, context) => {
      try {
        let loginFields = userFields;
          if (user && user !== '') {
            loginFields = {
              username: user,
            };
          }
          const loginResult = await AccountsServer.loginWithPassword(loginFields, password);
          if (loginResult && loginResult.user) {
            context.user = loginResult.user;
            context.authToken = loginResult.tokens.accessToken;
          }
          return loginResult;
      }
      catch (e) {
      }
    }
  }
};
