import { Component, Input } from '@angular/core';
import { Service } from '../../../providers';
import { SiteBO } from '../bo/ObjectBO';
import { Http, Response } from '@angular/http';
import { Router,ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
 
@Component({
  selector: 'piechart',
  templateUrl: './piechart.html'
})
export class PieChartComponent {

    @Input() public countGreen;
    @Input() public countYellow;
    @Input() public countRed;

   constructor(public serv: Service, private http: Http, private router: Router,private route: ActivatedRoute,public dialog: MatDialog) {

    }
    public pieChartLabels:string[] = ['Good', 'Average', 'Bad'];
    public pieChartType:string = 'pie';
    public pieChartColors:any[] = [{
    backgroundColor: ['green','yellow','red']
    }]
    public pieChartData:number[];
    ngOnInit() {
        this.pieChartData = [parseInt(this.countGreen),parseInt(this.countYellow),parseInt(this.countRed)];
    }
    public pieChartOptions:any = {
        legend: {position: 'right'}
    }

    // events
  public chartClicked(e:any):void {
    console.log("hover",e);
  }
 
  public chartHovered(e:any):void {
    console.log("click",e);
  }
}