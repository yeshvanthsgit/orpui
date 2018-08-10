import { Injectable } from '@angular/core'

@Injectable()
export class Config {
    private DEFAULT_ENDPOINT_URL:string = 'http://localhost:8544';
  
    
      public get url() {
        let localEndpointURL = window.localStorage.getItem('ENDPOINT_URL');
        if (localEndpointURL == undefined || localEndpointURL == null || localEndpointURL == '') {
          localEndpointURL = this.DEFAULT_ENDPOINT_URL;
        }
        return localEndpointURL;
      }
}