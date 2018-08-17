import { OnInit, Component } from '@angular/core';
import { Service } from '../../../providers/index';
import { SweetAlertService } from 'angular-sweetalert-service';

@Component({
    selector: 'runModal',
    templateUrl: 'runModal.html'


})

export class RunModal implements OnInit {

    ngOnInit(): any {
    }

    constructor(private runModalService: Service, private alertService: SweetAlertService) {
         
    }

    doConfirm() {

        this.runModalService.runModalForUploadedData().subscribe(event => {
            if (event != undefined && event.status == 200) {
                console.log('Modal has run successfully!');

                this.alertService.success({title:"Modal has run successfully!"}).then(location.reload());
                
            } else{
                console.log('Modal has failed to run!');
                
                this.alertService.error({title:"Modal has failed to run!"}).then(location.reload());
            }

        });
        
        
    }

}


