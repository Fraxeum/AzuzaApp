import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthPage } from './auth';
import { UserProvider } from '../../providers/user/user';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
;
 


 


@NgModule({
	declarations: [
		AuthPage
	],
	imports: [
		IonicPageModule.forChild(AuthPage),
		HttpClientModule, 
		HttpModule,
		 
	],
	exports: [
		AuthPage
	],
	providers:[UserProvider]
})

export class AuthPageModule { }
