import { OnInit, Component, ViewChild, Inject } from '@angular/core';
import { Service } from '../../../providers/index';
import { Constants } from '../../../providers/index';
import { Http, Response } from '@angular/http';
import { CdkTableModule } from '@angular/cdk/table';
import { DataSource } from '@angular/cdk/table';
import { Router } from '@angular/router';
import { AttrbuiteBO } from '../bo/ObjectBO';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';




@Component({
  selector: 'UpdateRefinery',
  templateUrl: 'UpdateRefinery.html'


})

export class UpdateRefinery implements OnInit {
  title = 'Refinery Data';
  typeOfAttribute: string;
  AttributeDetailArr: Array<AttrbuiteBO> = new Array();
  seqNumArr : Array<number> = new Array();
  refineryModal : JSON;
 

  constructor(private dialogRef:MatDialogRef<UpdateRefinery>, @Inject(MAT_DIALOG_DATA) public data: any, public serv: Service, public constants: Constants, private http: Http, private router: Router) {


  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  }

  ngOnInit() {
    this.typeOfAttribute= this.data.name;
    console.log(this.typeOfAttribute);
   
    this.serv.getSpecificRefineryDetail(this.typeOfAttribute).subscribe((resp) => {
          let refineryModal = resp.json();
         console.log(refineryModal[0]);
          this.refineryModal = refineryModal[0];


      }, (err: Response) => {
        let msg = err.json()['message'];

      });   
    
   }



   public UpdateRefinery(refineryModal : JSON){
    

    for(var key in refineryModal){
			if("good" == refineryModal[key] || "average" == refineryModal[key] || "bad" == refineryModal[key]){
        refineryModal[key] = refineryModal[key].toUpperCase();
			}
		}
		
		console.log(refineryModal);
		
		var id = refineryModal["_id"]["$oid"];
		refineryModal["id"] = id;


      this.serv.updateRefineryDetails(refineryModal).subscribe((resp) => {
          let element = resp;
        location.reload();
      }, (err: Response) => {
        let msg = err.json()['message'];
       
      });
    
    } 


}


