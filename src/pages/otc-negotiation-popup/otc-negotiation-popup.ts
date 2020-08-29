import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ActionSheetController, ActionSheet} from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the OtcNegotiationPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otc-negotiation-popup',
  templateUrl: 'otc-negotiation-popup.html',
})

export class OtcNegotiationPopupPage {

  private data;
  private showCounterField: boolean;
  private counterOfferAmount: number;
  private actionSheet: ActionSheet;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public user: UserProvider, public alertController: AlertController,
    public actionSheetCtrl: ActionSheetController) {
      this.data = navParams.get("data");
      this.showCounterField = false;
      console.log("this is popup data");
      console.log(this.data);
  }

  private formatPrice(num: string){
    if(isNaN(Number(num))){ return null; }

    if(num > this.data.price){
      return false;
    }

    return (Number(num)).toFixed(2);
  }

  private showActionSheet() {

    let version = 2; //this is my sales-offer so I am seller

    if (this.data.whoami === 'B') {
      version = 1; //this is buyer
    }

    
    console.log("This is POPUP version: "+version);

    switch (version) {

      case 1: {
        this.showBuyerActionSheet();
        break;
      }

      case 2: {
        this.showSellerActionSheet();
        break;
      }
      
    }
  }

  private convertDate(dateStr){
		return Date.parse(dateStr);
	}

  private async showBuyerActionSheet(){
    
    this.actionSheet = this.createActionSheet();

    console.log(this.data.Counter[0]);
    console.log(this.data.Counter[0].Price);

    if(this.data.lastbidder != this.data.whoami){

      let accept_button = {
				text: 'Buy (R' + this.formatPrice(this.data.Counter[0].Price) + "/share)",
				handler: () => {
					this.acceptOffer();
					return;
				}
			}
      this.actionSheet.data.buttons.splice(0, 0, accept_button);
      let negotiate_button = {
				text: 'Set counter offer',
				handler: () => {
					this.showCounterForm();
					return;
				}
			}
      this.actionSheet.data.buttons.splice(1, 0, negotiate_button);
      
      let reject_button = {
				text: 'Cancel deal',
				handler: () => {
					this.confirmCancelOffer();
					return;
				}
			}
			this.actionSheet.data.buttons.splice(2, 0, reject_button);

    } 

    if(this.data.lastbidder == this.data.whoami){

      let cancel_button = {
				text: 'Cancel deal',
				handler: () => {
          setTimeout(()=>{
            this.confirmCancelOffer();
          },500);
					
					return;
				}
			}
			this.actionSheet.data.buttons.splice(0, 0, cancel_button);

    }

    await this.actionSheet.present();

  }

  private async showSellerActionSheet(){
    
    this.actionSheet = this.createActionSheet();

    console.log(this.data);

    if(this.data.lastbidder != this.data.whoami){

      let accept_button = {
        text: 'Sell (R' + this.formatPrice(this.data.price) + "/share)",
				handler: () => {
          let data = { 
            'action': 'acceptbid',
            'amount': this.counterOfferAmount
         };
      
          this.viewCtrl.dismiss(data);
				}
			}
      this.actionSheet.data.buttons.splice(0, 0, accept_button);
      
      let negotiate_button = {
				text: 'Set counter offer',
				handler: () => {
					this.showCounterForm();
					return;
				}
			}
      this.actionSheet.data.buttons.splice(1, 0, negotiate_button);
      
      let reject_button = {
				text: 'Cancel deal',
				handler: () => {
					this.confirmCancelOffer();
					return;
				}
			}
			this.actionSheet.data.buttons.splice(2, 0, reject_button);

    } 

    if(this.data.lastbidder == this.data.whoami){

      let cancel_button = {
				text: 'Cancel this deal',
				handler: () => {
					
					return;
				}
			}
			this.actionSheet.data.buttons.splice(0, 0, cancel_button);

    }

    await this.actionSheet.present();

  }

 
  private createActionSheet(): ActionSheet{
    return this.actionSheetCtrl.create({
      title: 'Options',
      buttons: [
        {
          text: 'Close room',
          handler: () => {
            this.back();
            return;
          }
        },
        {
          text: 'Dismiss',
          role: 'cancel'
        }
      ]
    });
  }

  private async confirmSellerAcceptBuyerOffer(){
    //buyer buying shares at the price specified

    let p = this.formatPrice(this.data.price);
    let price:number = 0;
    let fees:number = 0;

    if( p ){
      fees = parseFloat(p) * 0.025;
    if(fees > 50){
      fees = 50;
    }
    }

    let feesStr = fees.toFixed(2);

    const alert = this.alertController.create({
      title: 'Confirmation',
      subTitle: 'Selling shares',
      message: 'You are selling ' + this.data.amount + ' ' 
      + this.data.Name + ' shares at R' + this.formatPrice(this.data.price) 
      + ' a share for a total of R' + this.data.price + '. Total transaction fees: R' + feesStr + '<br/><br/>Press <span class="darkblue">Sell now</span> to confirm.',

      buttons: [
        {
          text: 'Close',
          handler: data => {
            return true;
          }
        },
        {
          text: 'Sell now!',
          handler: () => {
            let data = {}
            this.viewCtrl.dismiss({ "action": "acceptbid" });
            
            return true;
          }
        }
      ]
    });

    await alert.present();
  
  }

  async confirmCounterOffer() {

    if(!this.counterOfferAmount || this.counterOfferAmount < 0){
      this.user.setToast("Your counter offer amount is invalid.");
      return false;
    }

    const amount = new Intl.NumberFormat('en-us', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(this.counterOfferAmount);


    const alert = this.alertController.create({
      title: 'Confirm',
      subTitle: 'Counter offer',
      message: 'You are about to submit a counter offer of R'+amount+'.',
      buttons: [
        {
          text: 'Close',
          handler: data => {
           return true;
          }
        },
        {
          text: 'Continue',
          handler: data => {
            this.setCounterOffer();
            return true;
          }
        }
      ]
    });

    await alert.present();
  }

  private async showCounterForm(){

    const amount = new Intl.NumberFormat('en-us', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(this.data.price);

    const alert = this.alertController.create({
      title: 'Create counter offer',
      subTitle: '',
      message: 'Enter the new price per share in the line below and then select <span class="darkblue">Next</span> to continue.',
      inputs: [
        {
          name: 'Price per share',
          placeholder: this.data.price //asking price as opposed to last price
        },
      ],
      buttons: [
        {
          text: 'Close',
          handler: data => {
            return true;
          }
        },
        {
          text: 'Next',
          handler: data => {
            console.log(data);
            let offerPrice = data["Price per share"];
            if(!offerPrice){
              this.user.setToast("Counter offer price cannot be empty");
              return;
            }
            offerPrice = this.formatPrice(offerPrice);
            
            this.viewCtrl.dismiss({'action': 'counteroffer', 'price': data["Price per share"], 'amount': this.data.amount });

          }
        }
      ]
    });

    await alert.present();

  }
/*
  async confirmCounterOffer() {

    if(!this.counterOfferAmount || this.counterOfferAmount < 0){
      this.user.setToast("Your counter offer amount is invalid.");
      return false;
    }

    const amount = new Intl.NumberFormat('en-us', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(this.counterOfferAmount);


    const alert = this.alertController.create({
      title: 'Confirm',
      subTitle: 'Counter offer',
      message: 'You are about to submit a counter offer of R'+amount+'.',
      buttons: [
        {
          text: 'Close',
          handler: data => {
           return true;
          }
        },
        {
          text: 'Continue',
          handler: data => {
            this.setCounterOffer();
            return true;
          }
        }
      ]
    });

    await alert.present();
  }
  */

  async confirmCancelOffer() {
  
    const alert = this.alertController.create({
      title: 'Cancel deal',
      message: 'You are about to withdraw from this negotiation. Select <span class="darkblue"><b>Withdraw</span></b> to confirm.',
      buttons: [
        {
          text: 'Close',
          handler: data => {
           return true;
          }
        },
        {
          text: 'Withdraw',
          handler: data => {
            this.cancelOffer();
            return true;
          }
        }
      ]
    });

    await alert.present();
  }

  private back(fab?){
    if(fab) fab.close();
    this.navCtrl.pop();
  }

  private acceptOffer(){
    console.log("accepting offer");
    let data = { 'action': 'acceptbid','price': 0, 'amount': 0 };
    this.viewCtrl.dismiss(data);
  }

  private rejectOffer(){
    console.log("rejecting offer");
    let data = { 'action': 'reject', 'price': 0, 'amount': 0 };
    this.viewCtrl.dismiss(data);
  }

  private cancelOffer(){

    console.log("cancelling offer");
    let data = {'action': 'cancelbid', 'price': null, 'amount':null };
    this.viewCtrl.dismiss(data);
  }

  private setCounterOffer(){
    
    console.log("counteroffer: "+this.counterOfferAmount);

    this.showCounterForm();

    console.log("setting counter offer");
    let data = { 
      'action': 'counter',
      'price': this.counterOfferAmount,
      'amount': this.data.amount
   };

    this.viewCtrl.dismiss(data);
  }

  //confirm messages

  private confirmAction(action:string){
    switch(action){
      case "cancel":

    }
  }


  

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtcNegotiationPopupPage');
  }

}
