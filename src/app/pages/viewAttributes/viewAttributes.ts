import { OnInit, Component, ViewChild, Inject } from '@angular/core';
import { User, Constants } from '../../../providers/index';
import { Http, Response } from '@angular/http';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { DataSource } from '@angular/cdk/table';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';




@Component({
  selector: 'viewAttributes',
  templateUrl: 'viewAttributes.html'


})
export class ViewAttributes implements OnInit {
  title = 'viewAttributes';

  dataSource = null;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, public constants: Constants, private http: Http, private router: Router) {


  }

  ngOnInit() {

    alert(this.data.name);


  }


}


