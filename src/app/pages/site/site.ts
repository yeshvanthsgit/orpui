import { OnInit, Component, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { DataSource } from '@angular/cdk/table';
import { SiteBO } from '../../pages/bo/ObjectBO'
import { Service,Constants } from '../../../providers/index';
import { Http, Response } from '@angular/http';
import { Router,ActivatedRoute,NavigationEnd } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ViewAttributes } from '../../pages/viewAttributes/viewAttributes';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

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

  
  public goodCount:number=0;
  public badCount:number=0;
  public avgCount:number=0;

  public dataloaded:boolean=false;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor( public constants: Constants,public serv: Service, private http: Http, private router: Router,private route: ActivatedRoute,public dialog: MatDialog,private spinnerService: Ng4LoadingSpinnerService) {

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
         // site.status = siteDetail.Overall_Site_Performance;
          site.status=siteDetail.Calculated_Site_Performance;

          if(site.status){
            
                   if( site.status.toUpperCase()==this.constants.PERFORMANCE_GOOD){
                    this.goodCount++;
                   } else if( site.status.toUpperCase()==this.constants.PERFORMANCE_AVERAGE){
                    this.avgCount++;
                   } else if( site.status.toUpperCase()==this.constants.PERFORMANCE_BAD){
                    this.badCount++;
                   }
                  } 

                  if(site.status==="?"){
                    site.status="N/A"
                  }

          this.SiteBODetailArr.push(site);

        });

        this.dataSource = new MatTableDataSource(this.SiteBODetailArr);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataloaded=true;
        this.spinnerService.hide();
      } else {

      }
  

    }, (err: Response) => {
      let msg = err.json()['message'];
      this.spinnerService.hide();
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
            //site.status = siteDetail.Overall_Site_Performance;
            site.status=siteDetail.Calculated_Site_Performance;
            if(site.status){
              
                     if( site.status.toUpperCase()==this.constants.PERFORMANCE_GOOD){
                      this.goodCount++;
                     } else if( site.status.toUpperCase()==this.constants.PERFORMANCE_AVERAGE){
                      this.avgCount++;
                     } else if( site.status.toUpperCase()==this.constants.PERFORMANCE_BAD){
                      this.badCount++;
                     }
                    } 

                    if(site.status==="?"){
                      site.status="N/A"
                    }
  
            this.SiteBODetailArr.push(site);
  
          });
  
          this.dataSource = new MatTableDataSource(this.SiteBODetailArr);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.dataloaded=true;
          this.spinnerService.hide();
  
        } else {
  
        }
  
  
      }, (err: Response) => {
        let msg = err.json()['message'];
        this.spinnerService.hide();
  
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
      width: '600px',
      height: '600px',
      data: { name: "Sit_"+sitename }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  
  }
}

