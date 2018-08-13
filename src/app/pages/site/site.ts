import { OnInit, Component, ViewChild, Input } from '@angular/core';
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
  templateUrl: 'site.html',
  styleUrls: ['site.css'],


})
export class Site implements OnInit {
  title = 'Sites';
  SiteBODetailArr: Array<SiteBO> = new Array();
  

 @Input() typeOfParam;

  // dataSource:MatTableDataSource|null ;

  displayedColumns = ['name', 'status', 'attributes', 'viewRefinery'];
  dataSource = null;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(public serv: Service, private http: Http, private router: Router,private route: ActivatedRoute,public dialog: MatDialog) {

  }

  ngAfterViewInit() {
   
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit(): any {

    let paramVal:any=this.route.snapshot.params.name;

    if(paramVal!=null ){

      //nchowhan - get Sites for specific Regions
    // alert('Sites for :' + paramVal);

    this.typeOfParam ='Sites of '+ paramVal;

    this.serv.getRegionSpecificSiteDetails(paramVal).subscribe((resp) => {
      if (resp != null && resp.json() != null) {
        let element = resp.json();
        element.forEach(siteDetail => {
          let site = new SiteBO();
          site.name = siteDetail.Site_Name;
          site.status = siteDetail.Overall_Site_Performance;

          this.SiteBODetailArr.push(site);

        });

        this.dataSource = new MatTableDataSource(this.SiteBODetailArr);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      } else {

      }


    }, (err: Response) => {
      let msg = err.json()['message'];

    })
     
    
    }else{
      this.typeOfParam ='Sites';
      //nchowhan - Get all Sites details
      this.serv.getSiteDetails().subscribe((resp) => {
        if (resp != null && resp.json() != null) {
          let element = resp.json();
          element.forEach(siteDetail => {
            let site = new SiteBO();
            site.name = siteDetail.Site_Name;
            site.status = siteDetail.Overall_Site_Performance;
  
            this.SiteBODetailArr.push(site);
  
          });
  
          this.dataSource = new MatTableDataSource(this.SiteBODetailArr);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
  
        } else {
  
        }
  
  
      }, (err: Response) => {
        let msg = err.json()['message'];
  
      })

    }
    

  }


  public viewRefineries(sitename:string){
    let paramVal:any=sitename;
    let url:any='/refinery/'+ paramVal;
    this.router.navigate([url]); 
  
  }
  

  public viewAttributes(sitename:string){
    let dialogRef = this.dialog.open(ViewAttributes, {
      width: '1000px',
      height: '800px',
      data: { name: sitename }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  
  }
}

