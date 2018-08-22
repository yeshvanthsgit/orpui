import { OnInit,Component,ViewChild, Input} from '@angular/core';
import { Service,Constants } from '../../../providers/index';
import { Http, Response } from '@angular/http';
import {RefineryBO} from '../../pages/bo/ObjectBO'
import {MatTableDataSource, MatSort,MatPaginator} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import {DataSource} from '@angular/cdk/table';
import { Router,ActivatedRoute,NavigationEnd} from '@angular/router';
import { ViewAttributes } from '../../pages/viewAttributes/viewAttributes';
import { UpdateRefinery } from './UpdateRefinery';
import { AddRefinery } from './AddRefinery';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Location } from '@angular/common';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'refinery',
  templateUrl: 'refinery.html',
  styleUrls: ['Refinery.css'],
 
}) 



export class Refinery implements OnInit {
  title = 'USERS';
  RefineryDetailArr: Array<RefineryBO> = new Array();
  @Input() typeOfParam;
// dataSource:MatTableDataSource|null ;
  displayedColumns = ['name', 'status', 'attributes','action'];
  dataSource = null;
  
   @ViewChild(MatSort) sort: MatSort;
   @ViewChild(MatPaginator) paginator: MatPaginator;

   public goodCount:number=0;
   public badCount:number=0;
   public avgCount:number=0;
 
   public dataloaded:boolean=false;

   


  constructor( public constants: Constants,private location: Location,public serv: Service,private http: Http,private router:Router,private route: ActivatedRoute,public dialog: MatDialog , private spinnerService: Ng4LoadingSpinnerService) {
    
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
   }

   this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
         // trick the Router into believing it's last link wasn't previously loaded
         this.router.navigated = false;
         // if you need to scroll back to top, here is the right place
         window.scrollTo(0, 0);
      }
  });
      }

      ngAfterViewInit() {

      }
      applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
      }

  ngOnInit(): any {

    this.spinnerService.show();
    let paramVal:any=this.route.snapshot.params.name;
    

if(paramVal!=null){
   
  
   let typeOfAttr: string = paramVal;

   this.typeOfParam ='Refineries of '+ paramVal;

   if(typeOfAttr.substr(0,3)==="Reg"){

    //nchowhan - get Refineries for specific Region
    // alert('Refineries for :' + paramVal);

  this.serv.getRegionSpecificRefineryDetails(paramVal).subscribe((resp) => {
    if (resp != null && resp.json() != null) {
      let element = resp.json();
      element.forEach(refineryDetail => {
        let refinery= new RefineryBO();

        refinery.name=refineryDetail.Refinery_Name;
        refinery.status=refineryDetail.Overall_Refinery_Performance;

        if(refinery.status){
          
                 if( refinery.status.toUpperCase()==this.constants.PERFORMANCE_GOOD){
                  this.goodCount++;
                 } else if( refinery.status.toUpperCase()==this.constants.PERFORMANCE_AVERAGE){
                  this.avgCount++;
                 } else if( refinery.status.toUpperCase()==this.constants.PERFORMANCE_BAD){
                  this.badCount++;
                 }
                }
        this.RefineryDetailArr.push(refinery);
  
    });   
    this.dataloaded=true;
    this.dataSource = new MatTableDataSource(this.RefineryDetailArr);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.spinnerService.hide();
  
    } else {
  
    }
  
  
  }, (err: Response) => {
    let msg = err.json()['message'];
   
  });
}else{

  // nchowhan - get Refineries for specific site
  // alert('Refineries for :' + paramVal);


  this.serv.getSiteSpecificRefineryDetails(paramVal).subscribe((resp) => {
    if (resp != null && resp.json() != null) {
      let element = resp.json();
      element.forEach(refineryDetail => {
        let refinery= new RefineryBO();

        refinery.name=refineryDetail.Refinery_Name;
        refinery.status=refineryDetail.Overall_Refinery_Performance;

        if(refinery.status){
          
                 if( refinery.status.toUpperCase()==this.constants.PERFORMANCE_GOOD){
                  this.goodCount++;
                 } else if( refinery.status.toUpperCase()==this.constants.PERFORMANCE_AVERAGE){
                  this.avgCount++;
                 } else if( refinery.status.toUpperCase()==this.constants.PERFORMANCE_BAD){
                  this.badCount++;
                 }
                }
        this.RefineryDetailArr.push(refinery);
  
    });   
    this.dataloaded=true;
    this.dataSource = new MatTableDataSource(this.RefineryDetailArr);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.spinnerService.hide();
  
  
    } else {
  
    }
  
  
  }, (err: Response) => {
    let msg = err.json()['message'];
    this.spinnerService.hide();
   
  });

}

}else{

  this.typeOfParam ="Refineries";
  //nchowhan - Get al Refinery details
this.serv.getRefineryDetails().subscribe((resp) => {
  if (resp != null && resp.json() != null) {
    let element = resp.json()
    ;
    element.forEach(refineryDetail => {
      let refinery= new RefineryBO();

      refinery.name=refineryDetail.Refinery_Name;
      refinery.status=refineryDetail.Overall_Refinery_Performance;
      if(refinery.status){
        
               if( refinery.status.toUpperCase()==this.constants.PERFORMANCE_GOOD){
                this.goodCount++;
               } else if( refinery.status.toUpperCase()==this.constants.PERFORMANCE_AVERAGE){
                this.avgCount++;
               } else if( refinery.status.toUpperCase()==this.constants.PERFORMANCE_BAD){
                this.badCount++;
               }
              }
      this.RefineryDetailArr.push(refinery);

  });   
  this.dataloaded=true;
  this.dataSource = new MatTableDataSource(this.RefineryDetailArr);
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
  this.spinnerService.hide();

  } else {

  }


}, (err: Response) => {
  let msg = err.json()['message'];
 
});
  }

}

public getRefineryDetails() {

  //nchowhan - Get al Refinery details
  this.serv.getRefineryDetails().subscribe((resp) => {
    if (resp != null && resp.json() != null) {
      let element = resp.json();
      this.RefineryDetailArr = [];
      element.forEach(refineryDetail => {
        let refinery= new RefineryBO();
  
        refinery.name=refineryDetail.Refinery_Name;
        refinery.status=refineryDetail.Overall_Refinery_Performance;
        this.RefineryDetailArr.push(refinery);
  
    });   
    this.dataloaded=true;
    this.dataSource = new MatTableDataSource(this.RefineryDetailArr);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.spinnerService.hide();
  
    } else {
  
    }
  
  
  }, (err: Response) => {
    let msg = err.json()['message'];
   
  });


}

public viewAttributes(refineryname:string){
  let dialogRef = this.dialog.open(ViewAttributes, {
    width: '1000px',
    height: '800px',
    data: { name: "Ref_"+refineryname }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    
  });

}

public SearchRefinery(refineryname:string){
  let dialogRef = this.dialog.open(UpdateRefinery, {
    width: '90%',
    height: '90%',
    data: { name: refineryname}
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    
  });

}

public AddRefinery(){
  let dialogRef = this.dialog.open(AddRefinery, {
    width: '90%',
    height: '90%',
    data: {}
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    
  });

}


public DeleteRefinery(refineryname:string){

  this.serv.deleteRefineryDetails(refineryname).subscribe((resp) => {
      let element = resp;
  console.log(element);
  this.getRefineryDetails();
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


