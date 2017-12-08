import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Response, Headers, RequestOptionsArgs, Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { AuthActions } from '../auth-data/auth.action';
import { LoginModel } from '../auth-data/auth.model';
import { AppState } from '../../reducers';
import { Storage} from '../storage';

@Injectable()
export class TokenService {

    private requestOptions: RequestOptionsArgs;
    jwtHelper: JwtHelper = new JwtHelper();

    constructor(private storage: Storage,
        private http: Http,
        private store: Store<AppState>,
        private authActions: AuthActions,
        @Inject('apiBase') private apiBase: string
    ) {
        let corsheaders = new Headers();
        corsheaders.append('Content-Type', 'application/json');
        this.requestOptions = { headers: corsheaders, withCredentials: true };
    }

    getTokens(data: LoginModel): Observable<Response> {
        return this.http.post(this.apiBase + '/users/login', JSON.stringify(data), this.requestOptions);
    }

    deleteTokens() {
        this.storage.removeItem('tokens');
        // this.tokenActions.deleteTokens();
    }
}
