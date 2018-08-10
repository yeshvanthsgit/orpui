import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  constructor (
    private http: Http
  ) {

  }

  getUser() {
    return this.http.get('http://localhost:8544/refinery/fetchLimiteFields/TestDB/Region')
    .map((res:Response) => res.json());
  }

}