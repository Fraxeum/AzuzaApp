import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatPage } from './chat';
import { UserProvider } from '../../providers/user/user';
import { HttpModule } from '@angular/http';
import {OrderByPipe} from "./orderby.pipe"


@NgModule({
	declarations: [
		ChatPage, OrderByPipe
	],
	imports: [
		IonicPageModule.forChild(ChatPage), HttpModule,
		
	],
	exports: [
		ChatPage
	],
	providers:[UserProvider]
})

export class SupportPageModule { }
