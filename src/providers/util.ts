import { Injectable } from '@angular/core';


/**
 * Util is a collection of reusable methods .
 */
@Injectable()
export class UtilService {
    constructor(){}
    isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    prepareErrMsg(errorJSON:any) {
        return errorJSON.exceptionCode + ': ' + errorJSON.exceptionMessage;
    }
    prepareValidationMessage(message, keys:Array<String>) {
        return message + ': [' + keys.join(', ') + ']'
    }
    showMessage(message:string, period?:number) {

    }
    showErrMsg(processStr:string, errorJSON?:any) {

    }
    isEmpty(obj:any) {
        if (obj == null || obj == undefined || obj.toString().length == 0) return true;
        return false;
    }

    showSpinner() {

        document.getElementById('progressSpinner').style.visibility = "visible";
    }

    hideSpinner() {
        document.getElementById('progressSpinner').style.visibility = "hidden";
    }
}