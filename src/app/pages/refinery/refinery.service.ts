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
    return this.http.get('http://USHYDPSHANMUKH3:8544/admin/getUsers/')
    .map((res:Response) => res.json());
  }

}