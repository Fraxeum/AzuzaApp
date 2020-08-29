import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { DepositMoneyPage } from './deposit-money';
import { Clipboard } from '@ionic-native/clipboard';

@NgModule({
	declarations: [
		DepositMoneyPage
	],
	imports: [
		IonicPageModule.forChild(DepositMoneyPage),
		CommonModule
	],
	exports: [
		DepositMoneyPage
	],
	providers:[ Clipboard ]
})

export class MyAccountPageModule { }
