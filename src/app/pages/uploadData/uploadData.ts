import { OnInit, Component } from '@angular/core';
import { Service } from '../../../providers/index';

@Component({
    selector: 'uploadData',
    templateUrl: 'uploadData.html'


})

export class UploadData implements OnInit {

    ngOnInit(): any {
    }

    selectedTestFile: FileList;
    selectedTrainFile: FileList;
    currentTestFileUpload: File;
    currentTrainFileUpload: File;

    constructor(private uploadService: Service) {
        if(document.getElementById('successMessage') != null 
             && document.getElementById('successMessage') != undefined){
                document.getElementById('successMessage').innerHTML = '';
         }  
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
                    document.getElementById('successMessage').innerHTML = 
                        "Testing and Training data has been uploaded successfully.";
                }

            });

        }

        this.selectedTestFile = undefined;
        this.selectedTrainFile = undefined;
    }

}
