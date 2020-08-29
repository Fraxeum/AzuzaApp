import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';
import { TrxHistoryPage } from './trx-history';
import { UserProvider } from '../../providers/user/user';

@NgModule({
  declarations: [
    TrxHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(TrxHistoryPage),
    CommonModule
  ],
  providers:[ UserProvider ]
})
export class TrxHistoryPageModule {}
