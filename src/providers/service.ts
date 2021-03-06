import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers } from '@angular/http';
import { Api } from './api';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/timeoutWith';
import "rxjs/add/operator/share";
import { SweetAlertService } from 'angular-sweetalert-service';





@Injectable()
export class Service {

  public headers:Headers= new Headers({'Cache-Control': 'no-cache',
          'Pragma': 'no-cache' });
public options: RequestOptions = new RequestOptions({headers:this.headers}); 
  

  constructor(public http: Http, public api: Api, private alertService: SweetAlertService ) {
  }

 

  getRegionDetails(){

    let url="/refinery/fetchLimiteFields/TestDB/Region";
    let seq = this.api.get(url, null, this. options).share();

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
    
        let url="/refinery/fetchLimiteFields/TestDB/Site";
        let seq = this.api.get(url, null, this. options).share();
    
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

      getRegionSpecificSiteDetails(regionName: string){
    
        let url="/refinery/fetchSiteDataAttachedToRegion/"+regionName;
        let seq = this.api.get(url, null, this. options).share();
    
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
        
            let url="/refinery/fetchData/TestDB/Refinary";
            let seq = this.api.get(url, null, this. options).share();
        
            seq
              .timeoutWith(30000, Observable.throw(new Error('Request timedout!!')))
              .map(res => res.json())
              .subscribe(res => {
                // If the API returned a successful response, mark the user as logged in
              }, err => {
                console.error('ERROR', err);
              });
        
            return seq;
          }

          getRegionSpecificRefineryDetails(regionName: string){
        
            let url="/refinery/fetchRefinaryDataAttachedToRegion/"+regionName;
            let seq = this.api.get(url, null, this. options).share();
        
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

          

          getSiteSpecificRefineryDetails(siteName: string){
        
            let url="/refinery/fetchRefinaryDataAttachedToSite/"+siteName;
            let seq = this.api.get(url, null, this. options).share();
        
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
          

  getSpecificRegionDetail(regionName: string) {

    let url = "/refinery/fetchAttributes/TestDB/Region/" + regionName;
    let seq = this.api.get(url, null, this. options).share();

    seq
      .timeoutWith(3000, Observable.throw(new Error('Request timedout!!')))
      .map(res => res.json())
      .subscribe(res => {
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  getSpecificSiteDetail(siteName: string) {

    let url = "/refinery/fetchAttributes/TestDB/Site/" + siteName;
    let seq = this.api.get(url, null, this. options).share();

    seq
      .timeoutWith(3000, Observable.throw(new Error('Request timedout!!')))
      .map(res => res.json())
      .subscribe(res => {
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  getSpecificRefineryDetail(refineryName: string) {

    let url = "/refinery/fetchAttributes/TestDB/Refinary/" + refineryName;
    let seq = this.api.get(url, null, this. options).share();

    seq
      .timeoutWith(3000, Observable.throw(new Error('Request timedout!!')))
      .map(res => res.json())
      .subscribe(res => {
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }


  deleteRefineryDetails(refineryName: string) {
    
        let url = "/refinery/deleteRecord/TestDB/Refinary/Refinery_Name/" + refineryName;
        console.log(url);
        let seq = this.api.get(url, null, this. options).share();
    
        seq
          .timeoutWith(3000, Observable.throw(new Error('Request timedout!!')))
          .subscribe(res => {
            //console.error('success', res);
          }, err => {
            console.error('ERROR', err);
          });
          
          console.log(seq);
        return seq;
      }

  
      updateRefineryDetails(refineryModal : JSON) {
        
            let url = "/refinery/updateRecord/TestDB/Refinary";
            console.log(url);
          /*  let headers = new Headers({'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache' });
            let options = new RequestOptions({headers:headers}); */
            
            let seq = this.api.post(url, refineryModal,this. options ).share();
        
            seq
              .timeoutWith(3000, Observable.throw(new Error('Request timedout!!')))
              .subscribe(res => {
                //console.error('success', res);
              }, err => {
                console.error('ERROR', err);
              });
              
              console.log(seq);
            return seq;
          }


          saveRefineryDetails(refineryModal : JSON) {
            
                let url = "/refinery/saveRefinary/TestDB/Refinary";
                console.log(url);
                let seq = this.api.post(url, refineryModal, this. options).share();
            
                seq
                  .timeoutWith(3000, Observable.throw(new Error('Request timedout!!')))
                  .subscribe(res => {
                    //console.error('success', res);
                  }, err => {
                    console.error('ERROR', err);
                  });
                  
                  console.log(seq);
                return seq;
              }
  
  pushFileToStorage(file1: File, file2: File) {

    const formdata: FormData = new FormData();
    formdata.append('file1', file1);
    formdata.append('file2', file2);
    const URL = 'refinery/saveData';

    let seq = this.api.post(URL, formdata, this. options).share();
    seq
      .timeoutWith(20000, Observable.throw(new Error('Request timedout!!')))
      .map(res => res)
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in
        console.log(res);
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  runModalForUploadedData() {

    const URL = 'runModal';

    let seq = this.api.postModal(URL, null, this. options).share();
    seq
      .timeoutWith(20000, Observable.throw(new Error('Request timedout!!')))
      .map(res => res)
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in
        console.log(res);
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }


  getAttributes(type: string) {

    let url: any;
    let seq: any;
    if(type == "refinery"){
      url = "/refinery/getKeys/TestDB/Refinary";
      seq = this.api.get(url, null, this. options).share();
    }

    seq
      .timeoutWith(3000, Observable.throw(new Error('Request timedout!!')))
      .map(res => res.json())
      .subscribe(res => {
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  
}
