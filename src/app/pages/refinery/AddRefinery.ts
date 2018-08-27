import { OnInit, Component, Inject } from '@angular/core';
import { Service } from '../../../providers/index';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn} from '@angular/forms';
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
  refineryForm : FormGroup;
  displayAddFormData : boolean;
 

  constructor(private fb: FormBuilder,  public serv: Service, private alertService: SweetAlertService,
     private dialogRef: MatDialogRef<AddRefinery>) {

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
  }

  ngOnInit() {
    var data = {};
this.refineryModal=data;
this.message = "";
this.displayAddFormData = true;

this.refineryForm = this.fb.group({
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
});
    
   }



   public SaveRefinery(refineryModal : JSON){
    
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
    for(var key in refineryModal){
			if("good" == refineryModal[key] || "average" == refineryModal[key] || "bad" == refineryModal[key]){
        refineryModal[key] = refineryModal[key].toUpperCase();
			}
		}


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