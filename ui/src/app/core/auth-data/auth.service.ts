import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Response, Http, Headers, RequestOptionsArgs } from '@angular/http';
import { TokenService } from '../token-data/token.service';
import { AuthActions } from './auth.action';
import { RegisterModel, ExternalRegistrationModel, LoginModel, ChangePasswordModel } from './auth.model';
import { AuthHttp } from 'angular2-jwt';


@Injectable()
export class AccountService {

    private loginApi = this.apiBase + '/users/login';
    private logoutApi = this.apiBase + '/logout';
    private authenticatedApi = this.apiBase + '/authenticated';
    private registerApi = this.apiBase + '/users/register';
    private userExistsApi = this.apiBase + '/users/exists';
    private googleAuthApiUrl = this.apiBase + '/users/googleurl';
    private forgotPasswordUrl = this.apiBase + '/users/forgetPassword';
    private fbAuthUrl = this.apiBase + '/users/facebookurl';

    private requestOptions: RequestOptionsArgs;
    constructor(private http: Http,
        private tokens: TokenService,
        private authActions: AuthActions,
        private authHttp: AuthHttp,
        @Inject('apiBase') private apiBase: string
    ) {
        let corsheaders = new Headers();
        corsheaders.append('Content-Type', 'application/json');
        corsheaders.append('Access-Control-Allow-Credentials', 'true');
        this.requestOptions = { headers: corsheaders, withCredentials: true };
    }

    register(data: RegisterModel): Observable<Response> {
        return this.http.post(this.registerApi, data);
    }



    getFbAuthUrl(): Observable<Response> {
        return this.http.get(this.fbAuthUrl, this.requestOptions);
    }

    getGoogleAuthUrl(): Observable<Response> {
        return this.http.get(this.googleAuthApiUrl, this.requestOptions);
    }

    externalRegister(model: ExternalRegistrationModel) {
        return this.http.post('/api/account/CreateExternal', model);
    }

    login(user: LoginModel) {
        return this.tokens.getTokens(user)
    }

    sendForgotPassword(data) {
        return this.http.post(this.forgotPasswordUrl, data);
    }

    changePassword(data: ChangePasswordModel) {
        return this.http.post('/users/changePassword', data);
    }

    /*  resetPassword(data: ResetPasswordModel) {
          return this.authApi.post('/users/resetPassword', data );
      } */

    logout() {
       return this.authHttp.get(`${this.apiBase}/users/logout`).toPromise();
    }
}
