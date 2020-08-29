import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { InitialPage } from './initial';
;
 
 

@NgModule({
	declarations: [
		InitialPage
	],
	imports: [
		IonicPageModule.forChild(InitialPage),
		HttpClientModule,
		 
	],
	exports: [
		InitialPage
	]
})

export class InitialPageModule { }
