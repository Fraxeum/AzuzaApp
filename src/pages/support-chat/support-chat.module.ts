import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';
import { SupportChatPage } from './support-chat';
import { UserProvider } from '../../providers/user/user';

@NgModule({
  declarations: [
    SupportChatPage,
  ],
  imports: [
    IonicPageModule.forChild(SupportChatPage),
    CommonModule
  ],
  providers:[ UserProvider ]
})
export class SupportChatPageModule {}

