import { OnInit, Component } from '@angular/core';
import { Service } from '../../../providers/index';
import { SweetAlertService } from 'angular-sweetalert-service';
import { Router,ActivatedRoute} from '@angular/router';
import { MatDialogRef } from '@angular/material'

@Component({
    selector: 'runModal',
    templateUrl: 'runModal.html',
    styleUrls: ['runModal.css']

})

export class RunModal implements OnInit {

    ngOnInit(): any {
    }

    constructor(private runModalService: Service, private alertService: SweetAlertService,
        private dialogRef:MatDialogRef<RunModal>, 
        private router:Router, private route: ActivatedRoute) {
         
    }

    doConfirm() {

        this.runModalService.runModalForUploadedData().subscribe(event => {
            if (event != undefined && event.status == 200) {
                console.log('Modal has run successfully!');
                let url:any='/region/'+this.randomInt(0, 1000);
                this.dialogRef.close();
                this.alertService.success({title:"Modal has run successfully!"}).then(this.router.navigate([url]));
                
            } else{
                console.log('Modal has failed to run!');
                let url:any='/region';
                this.dialogRef.close();
                this.alertService.error({title:"Modal has failed to run!"}).then(this.router.navigate([url]));
            }

        },error =>{
            console.log('Service is unavailable!');
            let url:any='/region';
            this.dialogRef.close();
            this.alertService.error({title:"Service is unavailable!"}).then(this.router.navigate([url]));
        });
        
        
    }

    randomInt(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
     }

}


