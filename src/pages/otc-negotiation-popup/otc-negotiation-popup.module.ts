import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OtcNegotiationPopupPage } from './otc-negotiation-popup';

@NgModule({
  declarations: [
    OtcNegotiationPopupPage
  ],
  imports: [
    IonicPageModule.forChild(OtcNegotiationPopupPage),
  ]
})
export class OtcNegotiationPopupPageModule {}
