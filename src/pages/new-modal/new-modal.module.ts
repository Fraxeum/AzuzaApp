import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewModalPage } from './new-modal';
;
 
import { HttpModule } from '@angular/http';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
 


@NgModule({
  declarations: [
    NewModalPage
  ],
  imports: [
    IonicPageModule.forChild(NewModalPage),
    HttpClientModule, 
    HttpModule
  ]
})
export class NewModalPageModule {}
