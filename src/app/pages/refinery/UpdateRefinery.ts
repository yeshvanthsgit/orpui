import { OnInit, Component, Inject } from '@angular/core';
import { Service } from '../../../providers/index';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn,FormControl} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { SweetAlertService } from 'angular-sweetalert-service';
import { MatDialogRef } from '@angular/material';


function goodBadAverage(c: AbstractControl): {[key: string]: boolean} | null {
  if (c.value !== undefined && (c.value.toLowerCase() != 'good' && c.value.toLowerCase()!= 'average' && c.value.toLowerCase() != 'bad')) {
      return { 'gab': true };
  };
  return null;
}

@Component({
  selector: 'UpdateRefinery',
  templateUrl: 'UpdateRefinery.html',
  styles: ['.help-block {color : red }']
})

export class UpdateRefinery implements OnInit {
  title = 'Update Refinery Data';
  typeOfAttribute: string;
  refineryModal : any;
  siteList : any;
  message = '';
  refineryForm : FormGroup;
  displayUpdateFormData : boolean;

  attributes: Object=new Object();

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, public serv: Service,
              private dialogRef: MatDialogRef<UpdateRefinery>,private alertService: SweetAlertService) {


  }

  keys() : Array<string> {
    return Object.keys(this.attributes);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
  }

  ngOnInit() {
    this.typeOfAttribute= this.data.name;
    //this.displayUpdateFormData = true;
    this.message = "";
    this.refineryModal={};

    this.serv.getSiteDetails().subscribe((resp) => {
      if (resp != null && resp.json() != null) {
        this.siteList= resp.json();
        console.log(this.siteList)
      } 
    }, (err: Response) => {
      let msg = err.json()['message'];
      console.log(msg);
    
    })

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
        this.displayUpdateFormData = true;
      }
    }, (err: Response) => {
      let msg = err.json()['message'];
      console.log(msg);
    });    
   

    /*this.refineryForm = this.fb.group({
      Refinery_Name: ['', [Validators.required]],
      Site_Name: ['', [Validators.required]],
      Thermal_Cracking_Pressure: ['', [Validators.required,goodBadAverage]],
      Thermal_Cracking_Temperature: ['', [Validators.required,goodBadAverage]],
      Vaccum_Residue_Heavier_Hydrocarbons: ['', [Validators.required,goodBadAverage]],
      Claus_H2S: ['', [Validators.required,goodBadAverage]],
      Coking_Feed: ['', [Validators.required,goodBadAverage]],
      Condensor_Water: ['', [Validators.required,goodBadAverage]],
      Condensor_Naphtha: ['', [Validators.required,goodBadAverage]],
      Cracking_Side_Chained_Aromatics_Chained_Aromatics: ['', [Validators.required,goodBadAverage]],
      Crude_Oil_ASTM_Distillation: ['', [Validators.required,goodBadAverage]],
      Crude_Oil_Boiling_Point: ['', [Validators.required,goodBadAverage]],
      Crude_Oil_Density: ['', [Validators.required,goodBadAverage]],
      Crude_Oil_Viscosity: ['', [Validators.required,goodBadAverage]],
      Furnance_Fuel_Oil: ['', [Validators.required,goodBadAverage]],
      Gas_Processing_Methane: ['', [Validators.required,goodBadAverage]],
      Hydrogen_Production_Methane_Reforming: ['', [Validators.required,goodBadAverage]],
      Hydrogen_Production_Technology_Sulphur: ['', [Validators.required,goodBadAverage]],
      Hydrotreating_Organic_Sulphur_Compounds: ['', [Validators.required,goodBadAverage]],
      Olefin_Polymerization_Process_Technology_C3_C4_Olefin_Feed: ['', [Validators.required,goodBadAverage]],
      Petroleum_Refinery_Hydrocarbon_Balances: ['', [Validators.required,goodBadAverage]],
      Reaction_Mechanism_Pressure: ['', [Validators.required,goodBadAverage]],
      Crude_Oil_API_Gravity: ['', [Validators.required,goodBadAverage]]
    });*/


   
    this.serv.getSpecificRefineryDetail(this.typeOfAttribute).subscribe((resp) => {
      
      
      let top = document.getElementById('top');
      if (top !== null) {
        top.scrollIntoView();
        top = null;
      }

      let refineryModal = resp.json();
          this.refineryModal = refineryModal[0];

      }, (err: Response) => {
      
        this.message  = "Erro while fetching Refinery Data.";
      });   
    
   }



   public UpdateRefinery(refineryModal : JSON){
    
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
		
		var id = refineryModal["_id"]["$oid"];
		refineryModal["id"] = id;


      this.serv.updateRefineryDetails(refineryModal).subscribe((resp) => {
        this.alertService.alert({
          type: "success",
          text: "Record has been updated successfully!",
        }).then(result => {
          this.dialogRef.close();
        });
      
      }, (err: Response) => {
        let msg = err.json()['message'];
        this.alertService.error({
          text: "Error while inserting the record. Please check the logs and try again.",
        }).then(result => {
          this.dialogRef.close();
        });
      });
    
    } 


}


