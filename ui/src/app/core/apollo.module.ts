import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { ApolloLink } from 'apollo-link';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';


const uri =  environment.apiBaseUrl + '/graphql';

@NgModule({
  exports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphQLModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    const http = httpLink.create({ uri });
    const tokens = JSON.parse(localStorage.getItem('tokens'));
      
    const middleware = new ApolloLink((operation, forward) => {

      const headers = new HttpHeaders();
      headers.set('authorization', 'Bearer ' + tokens.access_token || null);
      headers.set('Access-Control-Allow-Credentials', 'true');
      operation.setContext({
        headers: headers
      });
      return forward(operation)
    })

    const link = middleware.concat(http);
    apollo.create({
      link: middleware.concat(http),
      cache: new InMemoryCache()
    });
  }
}