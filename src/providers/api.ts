import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/map';
import { Config } from './config';
/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  

  constructor(
    public http: Http, public config: Config) {
  }

  get(endpoint: string, params?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }

    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }

    return this.http.get(this.config.url + '/' + endpoint, options);
  }
  testEndpoint(string:string) {    
    // TODO: Uncomment this to show up the ongoing API call endpoint
    /*
    let toast = this.toastCtrl.create({
      message: string,
      duration: 3000,
      position: 'top'
    });
    toast.present();
    */
  }
  post(endpoint: string, body: any, options?: RequestOptions) {
    this.testEndpoint(this.config.url + '/' + endpoint);
    return this.http.post(this.config.url + '/' + endpoint, body, options);
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    this.testEndpoint(this.config.url + '/' + endpoint);
    return this.http.put(this.config.url + '/' + endpoint, body, options);
  }

  delete(endpoint: string, options?: RequestOptions) {
    this.testEndpoint(this.config.url + '/' + endpoint);
    return this.http.delete(this.config.url + '/' + endpoint, options);
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {
    this.testEndpoint(this.config.url + '/' + endpoint);
    return this.http.put(this.config.url + '/' + endpoint, body, options);
  }
}
