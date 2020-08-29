import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeneralErroPage } from './general_error';
import {UserProvider} from '../../providers/user/user';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
 
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { generate } from 'rxjs/observable/generate';









@NgModule({
	declarations: [
		GeneralErroPage,
		
	],
	imports: [
		IonicPageModule.forChild(GeneralErroPage), HttpModule
	],
	exports: [
		GeneralErroPage,
		
	
	],
	providers:[
		UserProvider, 
		File,
		Transfer,
		Camera,
		FilePath, ]
})

export class GeneralErroModule { }
