import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthHttp } from 'angular2-jwt';
import { User, IUserService, WorkHistory, PersonalInfo, PersonalContact, CustomUrls, PlacesHistory, EducationHistory, Story } from './user-model';
import { Headers, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class UserService implements IUserService {
    private requestOptions: RequestOptionsArgs;
    constructor(private authHttp: AuthHttp,
        @Inject('apiBase') private apiBase: string
    ) {
        let corsheaders = new Headers();
        corsheaders.append('Content-Type', 'application/json');
        this.requestOptions = { headers: corsheaders, withCredentials: true };
    }

    getAllUsers(): Observable<User[]> {
        return this.authHttp.get(`${this.apiBase}/users/fetchAll`)
            .map(res => (res.json() as User[]));
    }

    getMyProfile(): Observable<User> {
        return this.authHttp.get(`${this.apiBase}/users/protected?count=followers`)
            .map(res => (res.json() as User));
    }


    PostUserImage(): Observable<User> {
        return this.authHttp.get(`${this.apiBase}/users/image`)
            .map(res => (res.json() as User));
    }

    PostUserBackgroundImage(): Observable<User> {
        return this.authHttp.get(`${this.apiBase}/my/bgimage`)
            .map(res => (res.json() as User));
    }


    getUser(id: string): Observable<User> {
        return this.authHttp.get(`${this.apiBase}/users/${id}?count=followers;posts;biz`, this.requestOptions)
            .map(res => (res.json() as User));
    }

    updateUser(user: User): Observable<User> {
        return this.authHttp.post(`${this.apiBase}/my/update`, user)
            .map(res => (res.json() as User));
    }

    updateUserPersonalInfo(userPersonalInfo: PersonalInfo){
        return this.authHttp.post(`${this.apiBase}/my/updatePersonalInfo`, userPersonalInfo)
        .map(res => (res.json() as User));
    }
    updateUserPersonalContact(userPersonalContact: PersonalContact){
        return this.authHttp.post(`${this.apiBase}/my/updatePersonalContact`, userPersonalContact)
        .map(res => (res.json() as User));

    }
    updateUserCustomUrls(userCustomUrls: CustomUrls){
        return this.authHttp.post(`${this.apiBase}/my/updateCustomUrls`, userCustomUrls)
        .map(res => (res.json() as User));

    }
    updateUserPlacesHistory(userPlacesHistory: PlacesHistory){
        return this.authHttp.post(`${this.apiBase}/my/updatePlacesHistory`, userPlacesHistory)
        .map(res => (res.json() as User));

    }
    updateUserEducationHistory(userEducationHistory: EducationHistory[]){
        return this.authHttp.post(`${this.apiBase}/my/updateEducationHistory`, userEducationHistory)
        .map(res => (res.json() as User));

    }
    updateUserWorkHistory(userWorkHistory: WorkHistory){
        return this.authHttp.post(`${this.apiBase}/my/updateWorkHistory`, userWorkHistory)
        .map(res => (res.json() as User));

    }
    updateUserStory(userStory: Story){
        return this.authHttp.post(`${this.apiBase}/my/updateUserStory`, userStory)
        .map(res => (res.json() as User));
    }

    followUser(followId: string): Observable<User> {
        return this.authHttp.post(`${this.apiBase}/users/${followId}/follow`, {})
            .map(res => (res.json() as User));
    }

    unFollowUser(followId: string): Observable<User> {
        return this.authHttp.post(`${this.apiBase}/users/${followId}/unfollow`, {})
            .map(res => (res.json() as User));
    }

    getMyFollowing(): Observable<User[]> {
        return this.authHttp.get(`${this.apiBase}/my/users/following`)
            .map(res => (res.json() as User[]));
    }

    getFollowingOfUser(userId: string): Observable<User[]> {
        return this.authHttp.get(`${this.apiBase}/users/${userId}/following`)
            .map(res => (res.json() as User[]));
    }

    getMyFollowers(): Observable<User[]> {
        return this.authHttp.get(`${this.apiBase}/my/users/follower`)
            .map(res => (res.json() as User[]));
    }

    getFollowersOfUser(userId: string): Observable<User[]> {
        return this.authHttp.get(`${this.apiBase}/users/${userId}/follower`)
            .map(res => (res.json() as User[]));
    }

    forgotpassword(useremail: any): Observable<{}> {
        return this.authHttp.post(`${this.apiBase}/users/forgetPassword`, useremail)
            .map(res => (res.json() as User[]));
    }


    changepassword(password : {old_password: string, new_password: string}): Observable<{}> {
        return this.authHttp.put(`${this.apiBase}/my/users/changePwd`, password)
            .map(res => (res.json() as User[]));
    }

    updatesettings(settings : any): Observable<{}> {
        return this.authHttp.post(`${this.apiBase}/my/users/settings`, { settings: settings })
            .map(res => (res.json() as User[]));
    }



}
