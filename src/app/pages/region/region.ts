import { OnInit,Component,ViewChild, Input} from '@angular/core';
import { Service,Constants } from '../../../providers/index';
import { Http, Response } from '@angular/http';
import {RegionBO} from '../../pages/bo/ObjectBO'
import {MatTableDataSource, MatSort,MatPaginator} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import {DataSource} from '@angular/cdk/table';
import { Router,ActivatedRoute,NavigationEnd } from '@angular/router';
import { ViewAttributes } from '../../pages/viewAttributes/viewAttributes';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';



@Component({ 
  selector: 'region',
  templateUrl: 'region.html',
  styleUrls: ['region.css'],
  

})
export class Region implements OnInit {
  title = 'Region';
  regionArr: Array<RegionBO> = new Array();

  public goodCount:number=0;
  public badCount:number=0;
  public avgCount:number=0;

  public dataloaded:boolean=false;
   

   
// dataSource:MatTableDataSource|null ;
  displayedColumns = ['name', 'status', 'attributes','viewSites','viewRefinery'];
  dataSource = null;
  
   @ViewChild(MatSort) sort: MatSort;
   @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor( public constants: Constants ,public serv: Service,private http: Http,private router:Router,private route: ActivatedRoute,public dialog: MatDialog) {
    alert('constructor called');
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

        //this.dataSource.paginator = this.paginator;
       // this.dataSource.sort = this.sort;
      }
      applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
      }

  ngOnInit(): any {

    alert('ng init called');

    
    let paramVal:any=this.route.snapshot.params.name;
    

if(paramVal!=null ){

  
  this.serv.getRegionDetails().subscribe((resp) => {
    if (resp != null && resp.json() != null) {
      let element = resp.json();
      element.forEach(regDetail => {
        let reg= new RegionBO();
        

        reg.name=regDetail.Region_Name;
        reg.status=regDetail.Overall_Region_Performance;

        if(reg.status){
  
         if( reg.status.toUpperCase()==this.constants.PERFORMANCE_GOOD){
          this.goodCount++;
         } else if( reg.status.toUpperCase()==this.constants.PERFORMANCE_AVERAGE){
          this.avgCount++;
         } else if( reg.status.toUpperCase()==this.constants.PERFORMANCE_BAD){
          this.badCount++;
         }
        } 
        this.regionArr.push(reg);
  
    });   


    this.dataloaded=true;

    
    this.dataSource = new MatTableDataSource(this.regionArr);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  
    } else {
  
    }
  
  
  }, (err: Response) => {
    let msg = err.json()['message'];
   
  });

}else{
this.serv.getRegionDetails().subscribe((resp) => {
  if (resp != null && resp.json() != null) {
    let element = resp.json();
    element.forEach(regDetail => {
      let reg= new RegionBO();
      
console.log('region name'+element);
reg.name=regDetail.Region_Name;
reg.status=regDetail.Overall_Region_Performance;

if(reg.status){
  
         if( reg.status.toUpperCase()==this.constants.PERFORMANCE_GOOD){
          this.goodCount++;
         } else if( reg.status.toUpperCase()==this.constants.PERFORMANCE_AVERAGE){
          this.avgCount++;
         } else if( reg.status.toUpperCase()==this.constants.PERFORMANCE_BAD){
          this.badCount++;
         }
        } 
      this.regionArr.push(reg);

  });   


  this.dataloaded=true;
  
  this.dataSource = new MatTableDataSource(this.regionArr);
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;

  } else {

  }





}, (err: Response) => {
  let msg = err.json()['message'];
 
});
  }

}

public viewSites(regionname:string){
  let paramVal:any=regionname;
  let url:any='/site/'+ paramVal;
  this.router.navigate([url]);

}


public viewRefineries(regionname:string){
  let paramVal:any=regionname;
  let url:any='/refinery/'+ paramVal;
  this.router.navigate([url]);

}



public viewAttributes(regionname:string){
  let dialogRef = this.dialog.open(ViewAttributes, {
    width: '1000px',
    height: '800px',
    data: { name: "Reg_"+regionname }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    
  });

}


}


