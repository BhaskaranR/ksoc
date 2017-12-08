import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthHttp } from 'angular2-jwt';
import { Headers, RequestOptionsArgs } from '@angular/http';
import { PhotoDetails } from '../../../core/services/photodetails';

@Injectable()
export class ImageUploadService {
    private requestOptions: RequestOptionsArgs;
    constructor(private authHttp: AuthHttp,
        @Inject('apiBase') private apiBase: string
    ) {
        let corsheaders = new Headers();
        corsheaders.append('Content-Type', 'application/json');
        this.requestOptions = { headers: corsheaders, withCredentials: true };
    }

    removeTempImage(photo: string): Observable<boolean> {
        return this.authHttp.delete(`${this.apiBase}/posts/${photo}`)
            .map(res => (res.json() as boolean));
    }

    removeAllTempImages(uuid: string): Observable<string> {
        return this.authHttp.delete(`${this.apiBase}/images/${uuid}`)
            .map(res => res.json() as string);
    }

    changePhoto(payload: any): Observable<PhotoDetails> {
        return this.authHttp.post(`${this.apiBase}/edit/photo`, payload)
            .map(res => (res.json().data as PhotoDetails));
    }
}