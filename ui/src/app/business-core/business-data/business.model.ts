import { Observable } from 'rxjs';
import { PhotoDetails } from '../../core/services/photodetails';
import { User } from '../../core/user-data/user-model';



export interface Geotag {
    type: string;
    coordinates:  {
        lat: number;
        long: number;
    };
}
export interface Google {
    _id: string;
    title: string;
    distance: number;
    geotag: Geotag;
}

export interface Nearby {
    biz: any[];
    google: Google[];
}


export interface BizCategory {
    [bizname: string]: Category[];
}

export interface Category {
    _id: string;
    name: string;
}

export interface SubCategory {
    _id: string;
    category_id: string;
    name: string;
}

export interface BusinessNearby {
    dis: number;
    obj: Business;
}

export interface BusinessWithUsers extends Business{
    followingUsers: User[];
}


export interface Business {
    _id: string;
    title: string;
    businessId: string;
    categoryId: string;
    subcategoryId: string | null;
    phonenumber: string;
    address: string;
    city: {title: string, place_id: string};
    zipcode: string;
    images: PhotoDetails;
    story: string;
    geotag: {type: string, coordinates: number[]};
    followers: string[];
    following: string[];
    followersCount: number;
    followingCount: number;
    createdAt: string | Date;
    modifiedAt: string | Date;
    userId: string;
    referredBy: string;
}

export interface BizNearbyFilter{
    long: number;
    lat: number;
    maxDistance: number;
    limit: number;
}

export interface IBusinessService {
    getBusiness(id: string): Observable<Business> ;
    updateBusiness(Business: Business): Observable<Business>;
    followBiz(followid: string): Observable<Business>;
    unfollowBiz(followid: string): Observable<Business>;
    getMyBusinessFollowing(): Observable<Business[]>;
    getFollowingOfBusiness(id: string): Observable<Business[]>;
    getMyBusinessFollowers(): Observable<Business[]>;
    getFollowersOfBusiness(id: string): Observable<Business[]>;
    getBusinessNearby(currentLoc: BizNearbyFilter): Observable<Business[]>;
}