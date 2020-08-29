import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessagePage } from './message';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {UserProvider} from '../../providers/user/user';

@NgModule({
	declarations: [
		MessagePage
	],
	imports: [
		IonicPageModule.forChild(MessagePage), HttpModule,
		 
	],
	exports: [
		MessagePage
	],
	providers:[UserProvider]
})

export class SupportPageModule { }
