import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { NgServiceWorker } from '@angular/service-worker';
import { AuthHttp } from 'angular2-jwt';


@Injectable()
export class WebPushService {

    private swScope: string = './';
    private API_URL: string;
    private convertedVapidKey: any;
    // private vapidPublicKey = 'BHe82datFpiOOT0k3D4pieGt1GU-xx8brPjBj0b22gvmwl-HLD1vBOP1AxlDKtwYUQiS9S-SDVGYe_TdZrYJLw8';


    constructor(
        public sw: NgServiceWorker,
        private authHttp: AuthHttp,
        @Inject('apiBase') private _apiBase: string) {
    }

    subscribeToPush(vapidPublicKey) {
        return new Promise((resolve, reject) => {
            this.convertedVapidKey = this.urlBase64ToUint8Array(vapidPublicKey);
            navigator['serviceWorker']
                .getRegistration(this.swScope)
                .then(registration => {
                    registration.pushManager
                        .subscribe({ userVisibleOnly: true, applicationServerKey: this.convertedVapidKey })
                        .then(subscription => {
                            this.addSubscriber(subscription).then((resp) => {
                                console.log(resp);
                                resolve();
                            })
                        });
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                })
        });
    }

    unsubscribeFromPush() {
        return new Promise((resolve, reject) => {
            navigator['serviceWorker']
                .getRegistration(this.swScope)
                .then(registration => {
                    registration.pushManager
                        .getSubscription()
                        .then(subscription => {
                            this.deleteSubscriber(subscription).then((resp) => {
                                resolve(resp);
                            })
                        })
                    //unregister
                    registration.unregister().then(function (boolean) {
                        console.log(boolean ? 'Service Worker unregister is successful' : 'Service Worker unregister is unsuccessful')
                    });
                })
                .catch(err => {
                    reject(err);
                })
        });
    }

    subscribeToPushNGSW(vapidPublicKey: string) {
        return new Promise((resolve, reject) => {
            this
                .sw
                .registerForPush({ applicationServerKey: vapidPublicKey })
                .subscribe(subscription => {
                    console.log('[App] Subscription object received', subscription)
                    this.addSubscriber(subscription)
                    resolve();
                });
            this
                .sw
                .push
                .subscribe(res => {
                    console.log('[App] Push message received', res);

                });
    });
}

urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

addSubscriber(subscription) {
    return this.authHttp.post(this._apiBase + '/device/register', JSON.stringify(subscription))
        .map(response => {
            return response.json();
        }).toPromise();
}

deleteSubscriber(subscription) {
    return this.authHttp.post(this._apiBase + '/device/unregister', JSON.stringify(subscription))
        .map(response => {
            return response.json();
        }).toPromise();
}


    private extractData(res: Response): string {
    let body = res.json();
    return body.message || '';
}

    private handleError(error: Response) {
    return Observable.throw(error || 'Server Error');
}

}
