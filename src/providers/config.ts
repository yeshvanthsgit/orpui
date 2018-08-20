import { Injectable } from '@angular/core'

@Injectable()
export class Config {
    private DEFAULT_ENDPOINT_URL:string = 'http://USSLTCSNW2627.solutions.glbsnet.com:8082';
    private MODAL_ENDPOINT_URL:string = 'http://USSLTCSNW2627.solutions.glbsnet.com:8080';
  
    
      public get url() {
        let localEndpointURL = window.localStorage.getItem('ENDPOINT_URL');
        if (localEndpointURL == undefined || localEndpointURL == null || localEndpointURL == '') {
          localEndpointURL = this.DEFAULT_ENDPOINT_URL;
        }
        return localEndpointURL;
      }

      public get modalUrl() {
        return this.MODAL_ENDPOINT_URL;
      }
}
