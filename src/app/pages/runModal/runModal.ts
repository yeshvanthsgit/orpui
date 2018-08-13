import { OnInit, Component } from '@angular/core';
import { Service } from '../../../providers/index';

@Component({
    selector: 'runModal',
    templateUrl: 'runModal.html'


})

export class RunModal implements OnInit {

    ngOnInit(): any {
    }

    constructor(private runModalService: Service) {
        if(document.getElementById('runMessage') != null 
             && document.getElementById('runMessage') != undefined){
                document.getElementById('runMessage').innerHTML = '';
         }  
    }

    doConfirm() {

        this.runModalService.runModalForUploadedData().subscribe(event => {
            if (event != undefined && event.status == 200) {
                console.log('Modal has run successfully!');
                document.getElementById('runMessage').innerHTML = 
                    "Modal has run successfully!";
            } else{
                console.log('Modal has failed to run!');
                document.getElementById('runMessage').innerHTML = 
                    "Modal has failed to run!";
                document.getElementById('runMessage').setAttribute('style','color: red;');
            }

        });
        
        
    }

}


