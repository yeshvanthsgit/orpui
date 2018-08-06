import { Injectable } from '@angular/core';


@Injectable()
export class Constants {
    public static FROM_SCREEN_SEARCH_BY_RETAILER:number = 1;
    public static FROM_SCREEN_SEARCH_BY_MEDICINE:number = 2;
    public static FROM_SCREEN_OTC:number = 3;

    constructor() {
      }
}