import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { OtcMarketMainPage } from './otc-market-main';


@NgModule({
  declarations: [
    OtcMarketMainPage
  ],
  imports: [
    IonicPageModule.forChild(OtcMarketMainPage),
    CommonModule
  ],
  providers:[ ], 
  exports: [ ]

})
export class OtcMarketMainPageModule {}
