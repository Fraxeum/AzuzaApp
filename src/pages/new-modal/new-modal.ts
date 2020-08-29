import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-new-modal',
  templateUrl: 'new-modal.html'
})

export class NewModalPage {

  content: any = null;
 // addpersonImageHTML: string = "<img src='../../assets/img/md-person-add.svg'></img>";

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
   
    this.content = navParams.get('html');
  
  }

  ionViewDidLoad() {
   
  }

  dismissModal() {
    this.viewCtrl.dismiss(false);
  }

}
