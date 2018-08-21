import { OnInit, Component } from '@angular/core';
import { Service } from '../../../providers/index';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material'
import { SweetAlertService } from 'angular-sweetalert-service';
import { error } from 'protractor';

@Component({
    selector: 'uploadData',
    templateUrl: 'uploadData.html',
    styleUrls: ['uploadData.css']

})

export class UploadData implements OnInit {

    ngOnInit(): any {
    }

    selectedTestFile: FileList;
    selectedTrainFile: FileList;
    currentTestFileUpload: File;
    currentTrainFileUpload: File;

    constructor(private uploadService: Service, private alertService: SweetAlertService,
        private dialogRef: MatDialogRef<UploadData>,
        private router: Router, private route: ActivatedRoute) {

    }

    selectTestFile(event) {
        this.selectedTestFile = event.target.files;
    }
    selectTrainFile(event) {
        this.selectedTrainFile = event.target.files;
    }
    upload() {
        this.currentTestFileUpload = this.selectedTestFile.item(0);
        this.currentTrainFileUpload = this.selectedTrainFile.item(0);
        if (this.currentTestFileUpload.type != null &&
            this.currentTrainFileUpload.type != null) {
            console.log("Upload tested");
            this.uploadService.pushFileToStorage(this.currentTestFileUpload, this.currentTrainFileUpload).subscribe(event => {

                if (event != undefined && event.status == 200) {
                    console.log('Files have uploaded successfully!');
                    let url:any='/region/'+this.randomInt(0, 1000);
                    this.dialogRef.close();
                    this.alertService.success({ title: "Testing and Training data has been uploaded successfully! Please run the model." }).then(this.router.navigate([url]));
                } else {
                    console.log('Service is unavailable!');
                    let url:any='/region';
                    this.dialogRef.close();
                    this.alertService.error({title:"Service is unavailable!"}).then(this.router.navigate([url]));
                }

            },error => {
                console.log('Service is unavailable!');
                let url:any='/region';
                this.dialogRef.close();
                this.alertService.error({title:"Service is unavailable!"}).then(this.router.navigate([url]));
            });

        }

        this.selectedTestFile = undefined;
        this.selectedTrainFile = undefined;
    }

    randomInt(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
     }

}
