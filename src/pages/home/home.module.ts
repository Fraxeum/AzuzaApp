import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { UserProvider } from '../../providers/user/user';
import { OrderByPipe } from "./orderby.pipe";
;
 
import { ComponentsModule, SharedBuywizardComponent } from '../../components/components.module';

 
@NgModule({
	declarations: [
		HomePage, OrderByPipe
	],
	imports: [
		IonicPageModule.forChild(HomePage),
		CommonModule,
		ComponentsModule
	],
	exports: [
		HomePage
	],
	providers:[UserProvider, SharedBuywizardComponent]
})

export class HomePageModule { }
