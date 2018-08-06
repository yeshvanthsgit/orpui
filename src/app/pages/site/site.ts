import { OnInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { DataSource } from '@angular/cdk/table';
import { SiteBO } from '../../pages/bo/ObjectBO'
import { Service } from '../../../providers/index';
import { Http, Response } from '@angular/http';
import { Router,ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ViewAttributes } from '../../pages/viewAttributes/viewAttributes';

@Component({
  selector: 'site',
  templateUrl: 'site.html'


})
export class Site implements OnInit {
  title = 'Sites';
  SiteBODetailArr: Array<SiteBO> = new Array();
  // dataSource:MatTableDataSource|null ;

  displayedColumns = ['name', 'status', 'attributes', 'viewRefinery'];
  dataSource = null;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(public serv: Service, private http: Http, private router: Router,private route: ActivatedRoute,public dialog: MatDialog) {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit(): any {

    let paramVal:any=this.route.snapshot.params.name;

    if(paramVal!=null){
    alert('Sites for :' + paramVal);
    }
    this.serv.getSiteDetails().subscribe((resp) => {
      if (resp != null && resp.json() != null) {
        let element = resp.json()['data'];
        element.forEach(siteDetail => {
          let site = new SiteBO();
          site.name = siteDetail.name;
          site.status = siteDetail.status;

          this.SiteBODetailArr.push(site);

        });

        this.dataSource = new MatTableDataSource(this.SiteBODetailArr);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      } else {

      }


    }, (err: Response) => {
      let msg = err.json()['message'];

    });

  }


  public viewRefineries(sitename:string){
    let paramVal:any="site_"+sitename;
    let url:any='/refinery/'+ paramVal;
    this.router.navigate([url]); 
  
  }
  

  public viewAttributes(sitename:string){
    let dialogRef = this.dialog.open(ViewAttributes, {
      width: '700px',
      height: '700px',
      data: { name: sitename }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  
  }
}

