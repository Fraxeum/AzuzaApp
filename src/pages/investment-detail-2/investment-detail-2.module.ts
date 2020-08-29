import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import {UserProvider} from '../../providers/user/user';

import { HttpModule } from '@angular/http';
import { ThousandSuffixesPipe } from "./orderby.pipe"
import { ChartsModule } from 'ng2-charts-x';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ComponentsModule, AccordionComponent } from '../../components/components.module';

import { InvestmentDetailPage2 } from './investment-detail-2';



@NgModule({
	declarations: [
		InvestmentDetailPage2, ThousandSuffixesPipe
	],
	imports: [
		IonicPageModule.forChild(InvestmentDetailPage2), 
		HttpModule, 
		ChartsModule,
		ComponentsModule,
		NgCircleProgressModule.forRoot({
			backgroundOpacity: 1,
			backgroundStrokeWidth: 0,
			backgroundPadding: -8,
			radius: 100,
			space: 10,
			toFixed: 0,
			maxPercent: 100,
			outerStrokeWidth: 20,
			outerStrokeColor: "#0C8E28",
			outerStrokeLinecap: "butt",
			innerStrokeColor: "rgba(255,255,255,0.4)",
			backgroundColor: "rgba(255,255,255,0.4)",
			innerStrokeWidth: 0,
			animationDuration: 300,
			showSubtitle: true,
			showBackground: true,
			responsive: true,
			unitsColor: "#000000",
			titleColor: "#000000",
			unitsFontSize: '30',
			titleFontSize: '40',
			subtitleFontSize: '20',
			subtitleColor: '#000000',
			clockwise: true
		  })
		
	],
	exports: [ InvestmentDetailPage2 ],
	providers: [
		InAppBrowser, 
		UserProvider,
		YoutubeVideoPlayer
	]
})

export class InvestmentPage2Module { }
