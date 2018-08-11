import { OnInit, Component, ViewChild, Inject } from '@angular/core';
import { Service } from '../../../providers/index';
import { Constants } from '../../../providers/index';
import { Http, Response } from '@angular/http';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { DataSource } from '@angular/cdk/table';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AttrbuiteBO } from '../bo/ObjectBO';





@Component({
  selector: 'viewAttributes',
  templateUrl: 'viewAttributes.html'


})
export class ViewAttributes implements OnInit {
  title = 'viewAttributes';
  typeOfAttribute: string;
  AttributeDetailArr: Array<AttrbuiteBO> = new Array();
  seqNumArr : Array<number> = new Array();

  dataSource = null;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // 'seqNo',
  displayedColumns = [ 'name', 'value'];
 

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, public serv: Service, public constants: Constants, private http: Http, private router: Router) {


  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {

   
    
    
    
     this.typeOfAttribute=this.data.name;

    if (this.typeOfAttribute.substr(0, 3) === "Reg") {


      this.serv.getSpecificRegionDetail(this.typeOfAttribute).subscribe((resp) => {
        if (resp != null && resp.json() != null) {
          let element = resp.json();
          element.forEach(attrDetail => {



            for (var keyName in attrDetail) {
              var key = keyName;
              var value = attrDetail[keyName];
              var i = 0;

              let attributes = new AttrbuiteBO();
              //alert(key)
              //alert(JSON.stringify(value));
              attributes.AttributeName = key;
              attributes.AttributeValue = JSON.stringify(value);
              //attributes.AttributeNo= 1;
              this.seqNumArr[i]= i++;

              this.AttributeDetailArr.push(attributes);

            }

          });

         // alert(this.AttributeDetailArr.length);
         this.dataSource = new Array(this.seqNumArr);

          this.dataSource = new MatTableDataSource(this.AttributeDetailArr);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

        } else {

        }


      }, (err: Response) => {
        let msg = err.json()['message'];

      });

    }else 

    if (this.typeOfAttribute.substr(0, 3) === "Sit") {


      this.serv.getSpecificSiteDetail(this.typeOfAttribute).subscribe((resp) => {
        if (resp != null && resp.json() != null) {
          let element = resp.json();
          element.forEach(attrDetail => {


            // alert(attrDetail.Region_Processing_Capacity);

            for (var keyName in attrDetail) {
              var key = keyName;
              var value = attrDetail[keyName];

              let attributes = new AttrbuiteBO();
              //alert(key)
              //alert(JSON.stringify(value));
              attributes.AttributeName = key;
              attributes.AttributeValue = JSON.stringify(value);

              this.AttributeDetailArr.push(attributes);

            }

          });

          //alert(this.AttributeDetailArr.length);

          this.dataSource = new MatTableDataSource(this.AttributeDetailArr);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

        } else {

        }


      }, (err: Response) => {
        let msg = err.json()['message'];

      });

    }else 

    if (this.typeOfAttribute.substr(0, 3) === "Ref") {


      this.serv.getSpecificRefineryDetail(this.typeOfAttribute).subscribe((resp) => {
        if (resp != null && resp.json() != null) {
          let element = resp.json();
          element.forEach(attrDetail => {


            // alert(attrDetail.Region_Processing_Capacity);

            for (var keyName in attrDetail) {
              var key = keyName;
              var value = attrDetail[keyName];

              let attributes = new AttrbuiteBO();
              //alert(key)
              //alert(JSON.stringify(value));
              attributes.AttributeName = key;
              attributes.AttributeValue = JSON.stringify(value);

              this.AttributeDetailArr.push(attributes);

            }

          });

         // alert(this.AttributeDetailArr.length);

          this.dataSource = new MatTableDataSource(this.AttributeDetailArr);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

        } else {

        }


      }, (err: Response) => {
        let msg = err.json()['message'];

      });

    }




  }



  


}


