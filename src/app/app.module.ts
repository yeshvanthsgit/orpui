import { BrowserModule } from '@angular/platform-browser';
import { NgModule, keyframes } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Region } from './pages/region/region';
import { Site } from './pages/site/site';
import { Refinery } from './pages/refinery/refinery';
import { ViewAttributes } from './pages/viewAttributes/viewAttributes';
import { UpdateRefinery } from './pages/refinery/UpdateRefinery';
import { AddRefinery } from './pages/refinery/AddRefinery';
import { UploadData } from './pages/uploadData/uploadData';
import { RunModal } from './pages/runModal/runModal';

import { Api,Config,Constants,Service} from '../providers/index';
import {CdkTableModule} from '@angular/cdk/table';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  
  MatTableModule,
  MatTabsModule,
  MatHeaderCell,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatDialogModule,
} from '@angular/material'; 
 




@NgModule({
  declarations: [
    AppComponent,Region,Site,Refinery,ViewAttributes,UpdateRefinery,AddRefinery,UploadData,RunModal
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    CdkTableModule,
    MatTableModule,
    MatTabsModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,MatPaginatorModule,MatDialogModule,
    NgbModule.forRoot()
  ],
  entryComponents: [
    Region,Site,Refinery,ViewAttributes, UpdateRefinery,AddRefinery,UploadData,RunModal
  ],
  providers: [Api,Config,Constants,CdkTableModule,Service],
  bootstrap: [AppComponent ]
})
export class AppModule { }
