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
import { SweetAlertService } from 'angular-sweetalert-service';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';


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

   


  constructor( public constants: Constants,private location: Location,public serv: Service,private http: Http,private router:Router,private route: ActivatedRoute,public dialog: MatDialog , private spinnerService: Ng4LoadingSpinnerService, private alertService : SweetAlertService,iconRegistry: MatIconRegistry,sanitizer: DomSanitizer) {
    
    iconRegistry.addSvgIcon(
      'edit',
      sanitizer.bypassSecurityTrustResourceUrl('assets/edit.svg'));
      iconRegistry.addSvgIcon(
        'delete',
        sanitizer.bypassSecurityTrustResourceUrl('assets/delete.svg'));
        
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

    this.redirectOnRequest();    

  }

  public redirectOnRequest(){

    this.spinnerService.show();
    let paramVal: any = this.route.snapshot.params.name;
    if (paramVal != null) {


      let typeOfAttr: string = paramVal;

      this.typeOfParam = 'Refineries of ' + paramVal;

      if (typeOfAttr.substr(0, 3) === "Reg") {

        //nchowhan - get Refineries for specific Region
        // alert('Refineries for :' + paramVal);

        this.serv.getRegionSpecificRefineryDetails(paramVal).subscribe((resp) => {
          if (resp != null && resp.json() != null) {
            let element = resp.json();
            element.forEach(refineryDetail => {
              let refinery = new RefineryBO();

              refinery.name = refineryDetail.Refinery_Name;
              refinery.status = refineryDetail.Overall_Refinery_Performance;

              if (refinery.status) {

                if (refinery.status.toUpperCase() == this.constants.PERFORMANCE_GOOD) {
                  this.goodCount++;
                } else if (refinery.status.toUpperCase() == this.constants.PERFORMANCE_AVERAGE) {
                  this.avgCount++;
                } else if (refinery.status.toUpperCase() == this.constants.PERFORMANCE_BAD) {
                  this.badCount++;
                }
              }else{
                refinery.status="N/A"
              }

              if(refinery.status==="?"){
                refinery.status="N/A"
              }

              this.RefineryDetailArr.push(refinery);

            });
            this.dataloaded = true;
            this.dataSource = new MatTableDataSource(this.RefineryDetailArr);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.spinnerService.hide();

          } else {

          }


        }, (err: Response) => {
          let msg = err.json()['message'];

        });
      } else {

        // nchowhan - get Refineries for specific site
        // alert('Refineries for :' + paramVal);


        this.serv.getSiteSpecificRefineryDetails(paramVal).subscribe((resp) => {
          if (resp != null && resp.json() != null) {
            let element = resp.json();
            element.forEach(refineryDetail => {
              let refinery = new RefineryBO();

              refinery.name = refineryDetail.Refinery_Name;
              refinery.status = refineryDetail.Overall_Refinery_Performance;

              if (refinery.status) {

                if (refinery.status.toUpperCase() == this.constants.PERFORMANCE_GOOD) {
                  this.goodCount++;
                } else if (refinery.status.toUpperCase() == this.constants.PERFORMANCE_AVERAGE) {
                  this.avgCount++;
                } else if (refinery.status.toUpperCase() == this.constants.PERFORMANCE_BAD) {
                  this.badCount++;
                }
              }else{
                refinery.status="N/A"
              }

              if(refinery.status==="?"){
                refinery.status="N/A"
              }
              
              this.RefineryDetailArr.push(refinery);

            });
            this.dataloaded = true;
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

    } else {

      this.typeOfParam = "Refineries";
      //nchowhan - Get al Refinery details
      this.serv.getRefineryDetails().subscribe((resp) => {
        if (resp != null && resp.json() != null) {
          let element = resp.json()
            ;
          element.forEach(refineryDetail => {
            let refinery = new RefineryBO();

            refinery.name = refineryDetail.Refinery_Name;
            refinery.status = refineryDetail.Overall_Refinery_Performance;
            if (refinery.status) {

              if (refinery.status.toUpperCase() == this.constants.PERFORMANCE_GOOD) {
                this.goodCount++;
              } else if (refinery.status.toUpperCase() == this.constants.PERFORMANCE_AVERAGE) {
                this.avgCount++;
              } else if (refinery.status.toUpperCase() == this.constants.PERFORMANCE_BAD) {
                this.badCount++;
              }
            }else{
              refinery.status="N/A"
            }

            if(refinery.status==="?"){
              refinery.status="N/A"
            }

            this.RefineryDetailArr.push(refinery);

          });
          this.dataloaded = true;
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
    width: '600px',
    height: '600px',
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
    this.RefineryDetailArr = new Array();
    this.redirectOnRequest();  
    
  });

}



public AddRefinery(){
  let dialogRef = this.dialog.open(AddRefinery, {
    width: '90%',
    height: '90%',
    data: {}
  });
  dialogRef.afterClosed().subscribe(result => {
    this.RefineryDetailArr = new Array();
    this.redirectOnRequest();  
    
  });

}


  public DeleteRefinery(refineryname: string) {

    this.alertService.confirm({
      title: "Delete Refinery",
      text: "Are you sure that you want to delete this refinery?",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#0077b3",
      cancelButtonColor: "#0077b3"
    }).then(result => {
      if (result.value) {
        this.serv.deleteRefineryDetails(refineryname).subscribe((resp) => {
          let element = resp;
          console.log(element);
          this.alertService.alert({
            type: "success",
            text: "Refinery deleted!",
          }).then(result => {
            if (result.value) {
              this.redirectOnRequest();
              let paramVal: any = this.route.snapshot.params.name;
              let url: any
              if (paramVal != undefined) {
                url = '/refinery/' + paramVal;
              } else {
                url = '/refinery';
              }
              this.router.navigate([url]);
            }
          });

        }, (err: Response) => {
          let msg = err.json()['message'];
        });
      } else {
        //cancel operation called
      }

    }).catch(function () {
      console.log('This action is canceled!');
    });

  } 


}


