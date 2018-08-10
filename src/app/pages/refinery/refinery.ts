import { OnInit,Component,ViewChild} from '@angular/core';
import { Service } from '../../../providers/index';
import { Http, Response } from '@angular/http';
import {RefineryBO} from '../../pages/bo/ObjectBO'
import {MatTableDataSource, MatSort,MatPaginator} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import {DataSource} from '@angular/cdk/table';
import { Router,ActivatedRoute} from '@angular/router';
import { ViewAttributes } from '../../pages/viewAttributes/viewAttributes';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';



@Component({
  selector: 'refinery',
  templateUrl: 'refinery.html',
  styleUrls: ['Refinery.css'],
 
}) 
export class Refinery implements OnInit {
  title = 'USERS';
  RefineryDetailArr: Array<RefineryBO> = new Array();
// dataSource:MatTableDataSource|null ;
  displayedColumns = ['name', 'status', 'attributes','action'];
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
    

if(paramVal!=null){
  alert('Refineries for :' + paramVal);
  this.serv.getRefineryDetails().subscribe((resp) => {
    if (resp != null && resp.json() != null) {
      let element = resp.json();
      element.forEach(refineryDetail => {
        let refinery= new RefineryBO();

        refinery.name=refineryDetail.Refinery_Name;
        refinery.status=refineryDetail.Overall_Refinery_Performance;
        this.RefineryDetailArr.push(refinery);
  
    });   
    
    this.dataSource = new MatTableDataSource(this.RefineryDetailArr);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  
    } else {
  
    }
  
  
  }, (err: Response) => {
    let msg = err.json()['message'];
   
  });

}else{
this.serv.getRefineryDetails().subscribe((resp) => {
  if (resp != null && resp.json() != null) {
    let element = resp.json()
    ;
    element.forEach(refineryDetail => {
      let refinery= new RefineryBO();

      refinery.name=refineryDetail.Refinery_Name;
      refinery.status=refineryDetail.Overall_Refinery_Performance;
      this.RefineryDetailArr.push(refinery);

  });   
  
  this.dataSource = new MatTableDataSource(this.RefineryDetailArr);
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;

  } else {

  }


}, (err: Response) => {
  let msg = err.json()['message'];
 
});
  }

}

public viewAttributes(refineryname:string){
  let dialogRef = this.dialog.open(ViewAttributes, {
    width: '700px',
    height: '700px',
    data: { name: refineryname }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    
  });

}


}


