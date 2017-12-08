import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, Routes } from '@angular/router';
import {AuthGuard} from './auth-guard.service';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class AuthenticatedAuthGuard implements CanActivate {

    constructor(private authGuard: AuthGuard,
                private router: Router ,
                private activatedRoute: ActivatedRoute) { }


    canActivate(): Observable<boolean> {
        return this.authGuard.isLoggedIn()
         .do( (loggedIn: boolean) => {
                if (!loggedIn) {
                    this.router.navigate(['/login'], {relativeTo: this.activatedRoute.root});
                }
            });
    }
}
