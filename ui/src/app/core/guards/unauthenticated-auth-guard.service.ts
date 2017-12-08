import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute } from '@angular/router';
import {AuthGuard} from './auth-guard.service';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class UnAuthenticatedAuthGuard implements CanActivate {
    constructor(private authGuard: AuthGuard,
                private router: Router,
                private activatedRoute: ActivatedRoute) { }

    canActivate(): Observable<boolean> {
        return this.authGuard.isLoggedIn().map(loggedIn => {
            if (loggedIn) {
                 this.router.navigate(['/home'], {relativeTo : this.activatedRoute});
                 return false;
            }
            return true;
        });
    }
}
