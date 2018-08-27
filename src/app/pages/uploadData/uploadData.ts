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
        let urlExtnsn:String = event.target.files.item(0).type;
        if(urlExtnsn != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
            document.getElementById('errorMessage').innerHTML = "Incorrect file format.Acceptable format is .xlsx. Please try again!";
            this.selectedTestFile = undefined;
        }
    }
    selectTrainFile(event) {
        this.selectedTrainFile = event.target.files;
        let urlExtnsn:String = event.target.files.item(0).type;
        if(urlExtnsn != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
            document.getElementById('errorMessage').innerHTML = "Incorrect file format.Acceptable format is .xlsx. Please try again!";
            this.selectedTrainFile = undefined;
        }
    }
    upload() {
        document.getElementById('errorMessage').innerHTML = "";
        this.currentTestFileUpload = this.selectedTestFile.item(0);
        this.currentTrainFileUpload = this.selectedTrainFile.item(0);
        if (this.currentTestFileUpload.type != null &&
            this.currentTrainFileUpload.type != null) {
            console.log("Upload tested");
            this.uploadService.pushFileToStorage(this.currentTestFileUpload, this.currentTrainFileUpload).subscribe(event => {

                if (event != undefined && event.status == 200) {
                    console.log('Files have uploaded successfully!');
                    let url:any='/region/';
                    this.dialogRef.close();
                    this.alertService.success({ title: "Testing and Training data has been uploaded successfully! Please run the model." }).then(this.router.navigate([url]));
                } else {
                    alert(event);
                    console.log('Service is unavailable!');
                    let url:any='/region';
                    this.dialogRef.close();
                    this.alertService.error({title:"Service is unavailable!"}).then(this.router.navigate([url]));
                }

            },error => {
                if (error != undefined && error.status == 406) {
                    let response: String = JSON.stringify(error.json());
                    let messageArr: String[] = response.substring(1, response.length - 1).split(",", 2);
                    console.log(messageArr[1]);
                    let messageAttrArr: String[] = messageArr[1].substring(1, messageArr[1].length - 1).split("|");
                    console.log('Invalid data uploaded!');
                    let url: any = '/region';
                    this.dialogRef.close();
                    this.alertService.error({
                        title: "Invalid data uploaded in \n" + 
                        "Sheet: "+messageAttrArr[1] + "\n "+"Row: " +
                            messageAttrArr[2] + "\n"+"Column: " + messageAttrArr[3] + "\n"+
                            "Incorrect Value: " + messageAttrArr[4] + "\n"+"Values can either be Good,Bad or Average only."
                    }).then(this.router.navigate([url]));
                } else {
                    console.log('Service is unavailable!');
                    let url: any = '/region';
                    this.dialogRef.close();
                    this.alertService.error({ title: "Service is unavailable!" }).then(this.router.navigate([url]));
                }
            });

        }

        this.selectedTestFile = undefined;
        this.selectedTrainFile = undefined;
    }

    randomInt(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
     }

}
