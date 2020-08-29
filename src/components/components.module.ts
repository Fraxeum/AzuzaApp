import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { SharedBuywizardComponent } from './shared-buywizard/shared-buywizard';
import { SharedTradeWizardComponent } from './shared-trade-wizard/shared-trade-wizard';
import { AccordionComponent } from '../components/accordion/accordion';


@NgModule({
	imports: [
		CommonModule,
		IonicModule
	  ],
	  declarations: [ SharedBuywizardComponent, SharedTradeWizardComponent, AccordionComponent],
	  providers: [ SharedBuywizardComponent, SharedTradeWizardComponent ],
	  exports: [ 
		  CommonModule, 
		  SharedBuywizardComponent,
		  SharedTradeWizardComponent,
		  IonicModule,
		  AccordionComponent
	 ]
})
export class ComponentsModule {}	
export * from './shared-buywizard/shared-buywizard';
export * from './shared-trade-wizard/shared-trade-wizard';
export * from './accordion/accordion';