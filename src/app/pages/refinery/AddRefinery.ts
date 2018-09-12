import { OnInit, Component, Inject } from '@angular/core';
import { Service } from '../../../providers/index';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn,FormControl} from '@angular/forms';
import { SweetAlertService } from 'angular-sweetalert-service';
import { MatDialogRef } from '@angular/material';



function goodBadAverage(c: AbstractControl): {[key: string]: boolean} | null {
  if (c.value !== undefined && (c.value.toLowerCase() != 'good' && c.value.toLowerCase()!= 'average' && c.value.toLowerCase() != 'bad')) {
      return { 'gab': true };
  };
  return null;
}




@Component({
  selector: 'AddRefinery',
  templateUrl: 'AddRefinery.html',
  styles: ['.help-block {color : red }']

})

export class AddRefinery implements OnInit {
  title = 'Add Refinery Data';
  message = '';
  refineryModal : any;
  siteList : any;

  refineryForm : FormGroup;
  displayAddFormData : boolean;
  attributes: Object=new Object();

  constructor(private fb: FormBuilder,  public serv: Service, private alertService: SweetAlertService,
     private dialogRef: MatDialogRef<AddRefinery>) {

  }



  keys() : Array<string> {
    return Object.keys(this.attributes);
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
  }

  ngOnInit() {
    var data = {};
this.refineryModal=data;
this.message = "";



this.serv.getSiteDetails().subscribe((resp) => {
  if (resp != null && resp.json() != null) {
    this.siteList= resp.json();
    console.log(this.siteList)
  } 
}, (err: Response) => {
  let msg = err.json()['message'];
  console.log(msg);

});

    this.serv.getAttributes('refinery').subscribe((resp) => {
      if (resp != null && resp.json() != null) {
        let attributeList:string = JSON.stringify(resp.json());
        let attrArr: string[] = attributeList.substring(1, attributeList.length - 1).replace(/\"/gi, "").split(",");
        for (let i=0; i< attrArr.length ; i++) {
          if (attrArr[i] != "_id" && attrArr[i] != "Refinery_Name" && attrArr[i] != "Site_Name") {
            this.attributes[attrArr[i]]= attrArr[i].replace(/\_/gi, " ");
          }
        }
        
        const jobGroup: FormGroup = new FormGroup({});

        let refNamecontrol: FormControl = new FormControl('Refinery_Name', [Validators.required]);
        let siteNamecontrol: FormControl = new FormControl('Site_Name', [Validators.required]);
        jobGroup.addControl('Refinery_Name', refNamecontrol);
        jobGroup.addControl('Site_Name', siteNamecontrol);

        for (const key in this.attributes) {
          if (this.attributes.hasOwnProperty(key)) {
            const control: FormControl = new FormControl(this.attributes[key], [Validators.required, goodBadAverage]);
            jobGroup.addControl(key, control); // instead of this.obj[key]
          }
        }

        this.refineryForm = jobGroup;
        this.displayAddFormData = true;
      }
    }, (err: Response) => {
      let msg = err.json()['message'];
      console.log(msg);
    });    
   }



   public SaveRefinery(refineryModal : JSON){
    
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
    for(var key in refineryModal){
			if('good' == refineryModal[key].toString().toLowerCase() || 'average' == refineryModal[key].toString().toLowerCase() || 'bad' == refineryModal[key].toString().toLowerCase()){
        refineryModal[key] = refineryModal[key].toUpperCase();
			}
		}

console.log(refineryModal)
      this.serv.saveRefineryDetails(refineryModal).subscribe((resp) => {
      
        if (resp.json().data == "success") {
          this.alertService.alert({
            type: "success",
            text: "Record has been added successfully!",
          }).then(result => {
            this.dialogRef.close();
          });
        }

        else if (resp.json().data == "duplicate") {
          this.alertService.error({
            text: "Record already exists. Please change the Refinery Name and try again!",
          });
        }

        else if (resp.json().data == "Site Not Found") {
          this.alertService.error({
            text: "Site Name does not exist. Please change the Site Name and try again!",
          });
        }

      }, (err: Response) => {
        let msg = err.json()['message'];
        console.log(msg);
        this.alertService.error({
          text: "Error while inserting the record. Please check the logs and try again.",
        }).then(result => {
          this.dialogRef.close();
        });
      });
    
    } 


}
