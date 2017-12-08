import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
//import { Router } from '@angular/router';


import * as productsActions from '../actions/products.actions';
import { Products } from '../models/products.model';
import { ProductService } from '../services/product.service';

import { Action } from '@ngrx/store';

export type Action = productsActions.All;
@Injectable()
export class ProductEffects {
  constructor(
        private productsService: ProductService,
        private actions$: Actions,
        //private router: Router
    ) { }

  @Effect()
  loadAllProductsAction$: Observable<Action> = this.actions$
    .ofType(productsActions.PRODUCTS_LOAD_REQUESTED)
    .mergeMap(payload => this.productsService.getSellers_Products()
      .map(res => (new productsActions.LoadAllProductsCompletedAction(new productsActions.ProductsPayload(res))))
    );
  // @Effect()
  // getPost: Observable<Action> = this.actions
  //   .ofType(productsActions.GET_POST)
  //   .map((action: productsActions.GetPost) => action.payload)
  //   .delay(2000) // delay to show spinner
  //   .mergeMap(payload => this.productService.getProducts())
  //   .map(post => {
  //     post.pushKey = post.$key;
  //     return new productsActions.GetPostSuccess(post);
  //   });
//   @Effect()
//   voteUpdate: Observable<Action> = this.actions.ofType(productsActions.VOTE_UPDATE)
//     .map((action: productsActions.VoteUpdate) => action.payload)
//     .mergeMap(payload => of(this.db.object('posts/' + payload.post.pushKey)
//       .update({
//         votes: payload.post.votes + payload.val
//       })))
//     .map(() => new productsActions.VoteSuccess())
//     .catch(err => of(new productsActions.VoteFail({ error: err.message })));
 }