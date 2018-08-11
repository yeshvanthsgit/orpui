import { OnInit,Component,ViewChild, Input} from '@angular/core';
import { Service } from '../../../providers/index';
import { Http, Response } from '@angular/http';
import {RegionBO} from '../../pages/bo/ObjectBO'
import {MatTableDataSource, MatSort,MatPaginator} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import {DataSource} from '@angular/cdk/table';
import { Router,ActivatedRoute} from '@angular/router';
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
   

   
// dataSource:MatTableDataSource|null ;
  displayedColumns = ['name', 'status', 'attributes','viewSites','viewRefinery'];
  dataSource = null;
  
   @ViewChild(MatSort) sort: MatSort;
   @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor( public serv: Service,private http: Http,private router:Router,private route: ActivatedRoute,public dialog: MatDialog) {
    
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

    
    let paramVal:any=this.route.snapshot.params.name;
    

if(paramVal!=null && parseInt(paramVal)>0){

  
  this.serv.getRegionDetails().subscribe((resp) => {
    if (resp != null && resp.json() != null) {
      let element = resp.json();
      element.forEach(regDetail => {
        let reg= new RegionBO();
        

        reg.name=regDetail.Region_Name;
        reg.status=regDetail.Overall_Region_Performance;
        this.regionArr.push(reg);
  
    });   
    
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
      this.regionArr.push(reg);

  });   
  
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
    width: '700px',
    height: '700px',
    data: { name: regionname }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    
  });

}


}


