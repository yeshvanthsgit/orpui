import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UploadData } from './pages/uploadData/uploadData';
import { RunModal } from './pages/runModal/runModal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],


})
export class AppComponent {
  title = 'app';
  
  constructor(public dialog: MatDialog) {

  }

  public uploadData(){
    let dialogRef = this.dialog.open(UploadData, {
      width: '700px',
      height: '400px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  
  }

  public runModal(){
    let dialogRef = this.dialog.open(RunModal, {
      width: '700px',
      height: '300px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
}
