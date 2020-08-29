import { Component } from '@angular/core';
import { IonicPage, NavParams, ModalController, Events, NavController, Platform, LoadingController, Loading, ActionSheetController, ToastController, AlertCmp, AlertController, Nav } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Subscription } from 'rxjs';




declare var cordova: any;

@IonicPage({
  name: 'page-general_error',
  segment: 'general_error'
})

@Component({
  selector: 'page-general_error',
  templateUrl: 'general_error.html'
})

export class GeneralErroPage {
  data: any;
  address: any;


  constructor(public navCtrl: NavController, public platform: Platform, public params: NavParams, public user: UserProvider) {

    this.platform = platform;
  }



  exitApp() {
    //  alert('test');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('MemberId');
    localStorage.removeItem("token");
    localStorage.removeItem('2fa');
    localStorage.removeItem('VerificationLevel');
    navigator['app'].exitApp();

  }


}







