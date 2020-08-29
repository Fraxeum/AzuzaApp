import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicApp, IonicErrorHandler, IonicModule, Modal } from 'ionic-angular';

import { ComponentsModule, AccordionComponent } from '../components/components.module';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { PipesModule } from '../pipes/pipes.module';

import { AzuzaApp } from './app.component';

import { UserProvider } from '../providers/user/user';

import { ServerProvider } from '../providers/server/server';
import { ServerHelperProvider } from '../providers/server-helper/server-helper';
import { CountryListProvider } from '../providers/country-list/country-list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

import { IonicImageViewerModule } from 'ionic-img-viewer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { OtcMarketMainPageModule } from '../pages/otc-market-main/otc-market-main.module';

import { TrxHistoryPageModule } from '../pages/trx-history/trx-history.module';

import { SupportChatPageModule } from '../pages/support-chat/support-chat.module';

import { OtcNegotiationPopupPageModule } from '../pages/otc-negotiation-popup/otc-negotiation-popup.module';
/*import { OtcNegotiationPopupPage } from '../pages/otc-negotiation-popup/otc-negotiation-popup';*/

import { SessionProvider } from '../providers/session/session';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { SaBankListProvider } from '../providers/sa-bank-list/sa-bank-list';

import { InvestmentPage1Module } from '../pages/investment-detail-1/investment-detail-1.module';
import { InvestmentPage2Module } from '../pages/investment-detail-2/investment-detail-2.module';

import { InvestmentDetailPage1 } from '../pages/investment-detail-1/investment-detail-1';
import { InvestmentDetailPage2 } from '../pages/investment-detail-2/investment-detail-2';

import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

import { HtmlHelpStringsProvider } from '../providers/html-help-strings/html-help-strings';


/* File upload */
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { FileUploadModule } from 'ng2-file-upload';


@NgModule({
  declarations: [
    AzuzaApp
  ],
  imports: [
    IonicModule.forRoot(AzuzaApp, {
      preloadModules: true,
      iconMode: 'md',
      mode: 'md'
    }),
    IonicStorageModule.forRoot({
      name: '__azuzaDB',
      driverOrder: ['sqlite', 'indexeddb', 'websql']
    }),
    FileUploadModule,
    PipesModule,
    IonicImageViewerModule,
    BrowserAnimationsModule,
    CommonModule,
    ComponentsModule,
    BrowserModule,
    HttpClientModule,
    InvestmentPage1Module,
    InvestmentPage2Module,
    OtcNegotiationPopupPageModule,
    OtcMarketMainPageModule,
    TrxHistoryPageModule,
    SupportChatPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AzuzaApp,
    InvestmentDetailPage1,
    InvestmentDetailPage2
  ],
  providers: [
    UserProvider,
    ServerProvider,
    ServerHelperProvider,
    CountryListProvider,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    YoutubeVideoPlayer,
    SessionProvider,
    SaBankListProvider,
    File,
    FilePath,
    Transfer,
    Camera,
    PhotoViewer,
    HtmlHelpStringsProvider
  ]
})
export class AppModule { }

