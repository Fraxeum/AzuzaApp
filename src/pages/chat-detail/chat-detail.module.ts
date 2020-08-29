import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatDetailPage } from './chat-detail';
import { UserProvider } from '../../providers/user/user';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

@NgModule({
	declarations: [
		ChatDetailPage
	],
	imports: [
		IonicPageModule.forChild(ChatDetailPage), HttpModule
	],
	exports: [
		ChatDetailPage
	],
	providers:[UserProvider]
})

export class ChatDetailPageModule { }
