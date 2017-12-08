import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthHttp } from 'angular2-jwt';
import { Business, IBusinessService, Category, SubCategory, BizCategory, BizNearbyFilter, BusinessNearby, BusinessWithUsers } from './business.model';
import { Headers, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class BusinessService implements IBusinessService {
    private requestOptions: RequestOptionsArgs;
    constructor(private authHttp: AuthHttp,
        @Inject('apiBase') private apiBase: string
    ) {
        let corsheaders = new Headers();
        corsheaders.append('Content-Type', 'application/json');
        this.requestOptions = { headers: corsheaders, withCredentials: true };
    }

    addNewBusiness(biz:  Business): Observable<Business> {
        return this.authHttp.post(`${this.apiBase}/new/biz`, biz)
            .map(res => (res.json() as Business));
    }

    getAllCategories(): Observable<BizCategory> {
        return this.authHttp.get(`${this.apiBase}/biz/getallcategories`)
            .map(res => (res.json() as BizCategory));
    }

    getSubCategories(categoryId: string): Observable<SubCategory[]> {
        return this.authHttp.get(`${this.apiBase}/biz/${categoryId}/getsubcategories`)
            .map(res => (res.json() as SubCategory[]));
    }

    getAllBusiness(): Observable<Business[]> {
        return this.authHttp.get(`${this.apiBase}/biz/suggested`)
            .map(res => (res.json() as Business[]));
    }

    getBusinessNearby(currentLoc: BizNearbyFilter): Observable<Business[]>{
           return this.authHttp.get(`${this.apiBase}/biz/nearby?long=${currentLoc.long}&lat=${currentLoc.lat}&maxDistance=${currentLoc.maxDistance}&limit=${currentLoc.limit}`)
            .map(res => (<BusinessNearby[]>res.json()).map(biz => biz.obj))

    }

    followBiz(bizId: string): Observable<Business> {
        return this.authHttp.post(`${this.apiBase}/biz/${bizId}/follow`, {})
            .map(res => (<Business>res.json()))
    }


    unfollowBiz(bizId: string): Observable<Business> {
        return this.authHttp.post(`${this.apiBase}/biz/${bizId}/unfollow`, {})
            .map(res => (<Business>res.json()))
    }

    getMyBusiness(): Observable<Business[]> {
        return this.authHttp.get(`${this.apiBase}/my/biz`)
            .map(res => (res.json() as Business[]));
    }

    getBusiness(id: string): Observable<BusinessWithUsers> {
        return this.authHttp.get(`${this.apiBase}/biz/${id}`)
            .map(res => (res.json() as BusinessWithUsers));
    }

    updateBusiness(business: Business): Observable<Business> {
        return this.authHttp.post(`${this.apiBase}/biz/update`, business)
            .map(res => (res.json() as Business));
    }

    getMyBusinessFollowing(): Observable<Business[]> {
        return this.authHttp.get(`${this.apiBase}/biz/my/following`)
            .map(res => {
                return (res.json() as Business[])});
    }

    getFollowingOfBusiness(userId: string): Observable<Business[]> {
        return this.authHttp.get(`${this.apiBase}/business/${userId}/following`)
            .map(res => (res.json() as Business[]));
    }

    getMyBusinessFollowers(): Observable<Business[]> {
        return this.authHttp.get(`${this.apiBase}/my/business/follower`)
            .map(res => (res.json() as Business[]));
    }

    getFollowersOfBusiness(userId: string): Observable<Business[]> {
        return this.authHttp.get(`${this.apiBase}/business/${userId}/follower`)
            .map(res => (res.json() as Business[]));
    }
    getPlacesNearby(param: any) {
      return this.authHttp.get(`${this.apiBase}/places/search?lat=${param.lat}&long=${param.long}&bizName=${param.bizName}`)
            .map(res => res.json());
    }

}
