import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { UserProvider } from '../../providers/user/user';

import { HttpModule } from '@angular/http';
import { ThousandSuffixesPipe } from "./orderby.pipe"
import { ChartsModule } from 'ng2-charts-x';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ComponentsModule, AccordionComponent } from '../../components/components.module';

import { InvestmentDetailPage1 } from './investment-detail-1';


@NgModule({
	declarations: [
		InvestmentDetailPage1, ThousandSuffixesPipe
	],
	imports: [
		IonicPageModule.forChild(InvestmentDetailPage1),
		HttpModule,
		ChartsModule,
		ComponentsModule,
		NgCircleProgressModule.forRoot({
			"radius": 60,
			"space": -10,
			"outerStrokeGradient": false,
			"outerStrokeLinecap": "square",
			"outerStrokeWidth": 10,
			"outerStrokeColor": "rgba(44,54,81,1)",
			"innerStrokeColor": "rgba(44,54,81,0.1)",
			"innerStrokeWidth": 10,
			"unitsColor": "#ffffff",
			"titleColor": "#ffffff",
			"subtitleColor": "#ffffff",
			"titleFontSize": '30',
			"animateTitle": false,
			"animationDuration": 300,
			"showUnits": false,
			"showBackground": false,
		}),
	],
	exports: [InvestmentDetailPage1],
	providers: [
		InAppBrowser,
		UserProvider,
		YoutubeVideoPlayer,
		AccordionComponent
	]
})

export class InvestmentPage1Module { }
