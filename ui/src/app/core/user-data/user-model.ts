import { Observable } from 'rxjs';
import { PhotoDetails } from '../services/photodetails';

export interface UserGroup {
    _id: string;
    icon: string;
    name: string;
}


export interface Email {
    email: any;
    emailtype: any;
}
export interface Phone {
    phoneNumber: any;
    phoneType: any;
}
export interface Address {
    address: any;
}
export interface PersonalContact {
    website: Email[];
    phonenumber: Phone[];
    address: Address[];
    visibility: string;
}


export interface PersonalInfo {
    gender: string;
    birthday: string;
    occupation: string;
    visibility: string;
}

export interface  CustomUrls {
    customUrls: string[];
    visibility: string;
}

export interface Places {
    currentPlace: string;
    livedPlaces: string[];
}
export interface PlacesHistory {
    placesHistory: Places[];
    visibility: string;
}
export interface WorkHistory {
    workHistory: string[];
    visibility: string;
}
export interface EducationHistory {
    eductionHistory: EducationHistory[];
    visibility: string;
}

export interface Story {
    story: string;
    tagline: string;
}

export interface EducationHistory {
    schoolName: string;
    major: string;
    year: number;
    endyear: number;
    description: string;
}


export interface User {
    _id: string;
    fbId: string;
    googlePlusId: string;
    firstName: string;
    lastName: string;
    mail: string;
    requesting_device_id: string;
    strategy: string;
    avatarId: string;
    images: PhotoDetails;
    userPersonalContact: PersonalContact;
    personalContact: PersonalContact;
    personalInfo: PersonalInfo;
    userCustomUrls: CustomUrls;
    placesHistory: PlacesHistory;
    workHistory: WorkHistory;
    educationHistory: EducationHistory[];
    userStory: Story;
    backgroundImage: PhotoDetails;
    profileSet: boolean;
    followers: User[];
    following: string[];
    followersCount: number;
    followingCount: number;
    postsCount: number;
    createdAt: string | Date;
    modifiedAt: string | Date;
    settings: any | Settings;
    followingBusiness: string[];
    mybusinesses: string[];
}

/*
export interface User {
    _id: string;
    fbId: string;
    googlePlusId: string;
    firstName: string;
    lastName: string;
    mail: string;
    phonenumber: string;
    address: string;
    requesting_device_id: string;
    strategy: string;
    avatarId: string;
    images: PhotoDetails;
    backgroundImage: PhotoDetails;
    placesLived: string[];
    gender: string;
    dateofbirth: string;
    occupation: string;
    story: string;
    confirmMail: boolean;
    profileSet: boolean;
    followers: User[];
    following: string[];
    followersCount: number;
    followingCount: number;
    postsCount: number;
    createdAt: string | Date;
    modifiedAt: string | Date;
    settings: any | Settings;
    followingBusiness: string[];
    mybusinesses: string[];
}
*/
export interface Settings {
    notifyposts: string;
    listposts: string;
    commentposts: string;
    profile: string;
    following: string;
    enablenotifications: boolean;
    enableemail: boolean;
}

export interface UserAction {
    entity: User;
    action: string;
}

export interface IUserService {
    getUser(id: string): Observable<User> ;
    updateUser(user: User): Observable<User>;
   /* updateUserPersonalInfo(userPersonalInfo: UserPersonalInfo);
    updateUserPersonalContact(userPersonalContact: UserPersonalContact);
    updateUserCustomUrls(userCustomUrls: UserCustomUrls);
    updateUserPlacesHistory(userPlacesHistory: UserPlacesHistory);
    updateUserEducationHistory(userEducationHistory: UserEducationHistory);*/
    updateUserStory(userStory: Story);
    followUser(followid: string): Observable<User>;
    unFollowUser(followid: string): Observable<User>;
    getMyFollowing(): Observable<User[]>;
    getFollowingOfUser(id: string): Observable<User[]>;
    getMyFollowers(): Observable<User[]>;
    getFollowersOfUser(id: string): Observable<User[]>;
}
