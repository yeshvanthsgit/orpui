import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from './api';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/timeoutWith';
import "rxjs/add/operator/share";





@Injectable()
export class Service {
  

  constructor(public http: Http, public api: Api ) {
  }

  getRegionDetails(){

    let url="testRegion";
    let seq = this.api.get(url, null, null).share();

    seq
      .timeoutWith(3000, Observable.throw(new Error('Request timedout!!')))
      .map(res => res.json())
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }


  getSiteDetails(){
    
        let url="testSite";
        let seq = this.api.get(url, null, null).share();
    
        seq
          .timeoutWith(3000, Observable.throw(new Error('Request timedout!!')))
          .map(res => res.json())
          .subscribe(res => {
            // If the API returned a successful response, mark the user as logged in
          }, err => {
            console.error('ERROR', err);
          });
    
        return seq;
      }


getRefineryDetails(){
        
            let url="testRefinery";
            let seq = this.api.get(url, null, null).share();
        
            seq
              .timeoutWith(3000, Observable.throw(new Error('Request timedout!!')))
              .map(res => res.json())
              .subscribe(res => {
                // If the API returned a successful response, mark the user as logged in
              }, err => {
                console.error('ERROR', err);
              });
        
            return seq;
          }




  



  

  
}
