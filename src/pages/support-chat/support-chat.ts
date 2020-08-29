//IONIC imports
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, ActionSheet, Modal } from 'ionic-angular';


//PAGE SPECIFIC IMPORTS
import { IonInfiniteScroll } from '@ionic/angular';

//PAGE COMMON IMPORTS
import { NewModalPage } from '../new-modal/new-modal';
import { UserProvider } from '../../providers/user/user';
import { ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthPage } from '../auth/auth';

import { SessionProvider } from "../../providers/session/session";


@IonicPage()
@Component({
  selector: 'page-support-chat',
  templateUrl: 'support-chat.html',
})
export class SupportChatPage {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  private firstEntry: boolean = true;

  private actionSheet: ActionSheet;

  private intervalId: number;

  private EOList: boolean = false;

  private explorer_url: string = "https://fraxeum.com/explorer?txid=";


  /* Transaction list specific variables */
  private noContentMessage: string = "Summoning agents...";
  
  private chatListData: [{"supportId":string,"Header":string,"CompanyId":string,"TopicId":string,"SenderId":string,"MemberId":string,"AssignMem":string,"AssignCom":string,"Status":string,"Email":string,"RecStatus":string,"TimeStamp":string,"LastEditBy":string,"ModifyDate":string,"Settings":string,"rate":string,"Extra":string,"UserName":string,"msg":[{"msg":string,"datetime":string,"SenderId":string,"email":string,"state":string,"canReply":string,"MessageId":string}]}];
  private chatListTopics: [{"Name": string,"value": string}];


  constructor(public navCtrl: NavController, public navParams: NavParams, public user: UserProvider,
    public modalCtrl: ModalController, public alertController: AlertController, public session: SessionProvider,
    public actionSheetCtrl: ActionSheetController, ) {

    this.resetPagination();
    this.primeDataObjects();
  }


  private showChatList(){
    if(this.chatListData && this.chatListData.length > 0 && this.chatListData[0].Status.length > 0){
      return true;
    }
    return false;
  }


  //seller withdrawing own sales order
  async confirmCancelMyOffer(uid: string, index: number, asset: string) {

    const alert = this.alertController.create({
      title: 'Confirmation',
      subTitle: 'Cancel you offer',
      message: 'You are about to cancel your offer and withdraw from this negotiation. Select "Confirm" to complete this action.',
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
            //this.doOTCAction({ "action": "cancelbid", "price": 0, "amount": 0 });
            return true;
          }
        }
      ]
    });

    await alert.present();
  }



  private getSellPrice(index: number): number {
    let sellprice: number = null;
    /*string = this.allSellOrderData[index].price;

    if (this.allSellOrderData[index].offers && this.allSellOrderData[index].offers[0].lastselleroffer) {
      sellprice = this.allSellOrderData[index].offers[0].lastselleroffer;
    }*/

    if (isNaN(+sellprice)) {
      return 0;
    }

    let num: number = Number(sellprice);

    return Number(sellprice);
  }



  private pagination: {
    "transactionlist": {
      "page": number,
      "limit": number
    }
  };


  private toggleInfiniteScroll() {
    if (this.infiniteScroll) this.infiniteScroll.disabled = true;
  }

  private closeMarket(fab) {
    fab.close();
    this.navCtrl.setRoot(HomePage);
  }



  private primeDataObjects() {


    this.primeTransactionListData();
    //.. next
    //.. next
  }

  private primeTransactionListData() {

    this.chatListTopics = [{"Name": "","value": ""}];
    this.chatListData = [{"supportId":"","Header":"","CompanyId":"","TopicId":"","SenderId":"","MemberId":"","AssignMem":"","AssignCom":"","Status":"","Email":"","RecStatus":"","TimeStamp":"","LastEditBy":"","ModifyDate":"","Settings":"","rate":"","Extra":"","UserName":"","msg":[{"msg":"","datetime":"","SenderId":"","email":"","state":"","canReply":"","MessageId":""}]}];
    
  }





  resetPagination() {
    this.pagination = {
      "transactionlist": {
        "page": 0,
        "limit": 30
      }
    };
  }


  async loadData(infs: any): Promise<any> {
    console.log("this is event: " + event);
    console.log(event);

    this.infiniteScroll = infs;

    return new Promise((resolve, reject) => {

      this.loadSupportData("fwd", event).then(() => {
        if (this.EOList) {
          console.log("Infinite Scroll Disabled - EOList");
          this.toggleInfiniteScroll();
          resolve(true);

        } else {
          console.log("Infinite Scroll Complete");
          if (this.infiniteScroll) this.infiniteScroll.complete();
          resolve(true);
        }


      }, () => {
        console.log("Infinite Scroll Disabled - Error");
        this.toggleInfiniteScroll();
        resolve(true);
      });

    });


    /*
    setTimeout(() => {
      console.log('Done');
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.EOList) {
        this.toggleInfiniteScroll();
      } else {
        infiniteScroll.complete();
      }
    }, 500);*/
  }


  private convertDate(dateStr) {
    return Date.parse(dateStr);
  }

  private async pollData() {
    this.loadSupportData().then(() => { }, () => { });
    return;
  }


  private async loadSupportData(dir?: string, event?: any): Promise<any> {
    if (dir) { console.log("EVENT: " + dir) };

    if (dir && (dir === "bwd")) {
      this.pagination.transactionlist.page--;
    } else this.pagination.transactionlist.page++;

    return new Promise((resolve, reject) => {
      this.fetchListData().then((data) => {

        if (!data) {
          reject(false);
          return;
        }

        if (true || data.length < 1) {
          this.noContentMessage = "You have no messages. Tap the pen button below to start a new chat.";
          this.EOList = true;
          resolve(true);
          return;
        }

        console.log(this.chatListData.length);

        if (this.chatListData.length > 1 && data.length > 0) {
          resolve(true);

        } else {

          this.chatListData = data;
          console.log("First set");
          resolve(true);

        }

      });
    });


  }

  private exploreBlockchain(txID: string) {
    this.launchExternalWebsite(this.explorer_url + txID);
    return;
  }

  private launchExternalWebsite(url: string) {

    if (url) {
      window.open(url, '_system', 'location=yes');
    }

    return;
  }

  private async fetchListData(): Promise<any> {


    return this.user.getTransactionList("finance", this.pagination.transactionlist.limit, this.pagination.transactionlist.page, "0", false).then(async (data) => {

      this.user.dismissLoadingPopup();

      console.log("INCOMING");
      console.log(data);

      return new Promise((resolve, reject) => {
        if (!data || (!data.success && data.code == "1000")) {
          this.exitToLoginPage();
          resolve(false);
        }

        if (data.msg == "You have reached the end of the list.") {
          this.user.setToast("No more transactions to load");
          this.EOList = true;
          resolve(false);
        }

        if (data.data) {
          this.EOList = false;
          resolve(data.data);
        }

      });



    }, (data) => {
      console.log("getTransactionList rejected promise");

    });

  }

  private createTitle(debit_credit: string, currency: string, spvname: string, orginal_title: string, type: string): string {
    let title: string = null;

    if (currency === 'ZAR') {
      if (debit_credit === 'D') {
        title = "Paid for " + spvname + " shares";
      } else {
        title = "Earned from " + spvname + " sale";
      }
    }


    if (currency != 'ZAR') {
      if (debit_credit === 'D') {
        title = "Sold " + spvname + " shares";
      } else {
        title = "Bought " + spvname + " shares";
      }
    }

    if (type != "I" && orginal_title === "Fees" ) {
      title = "Fees: " + spvname + " trade";
    } else { title.charAt(0).toUpperCase() };

    return title;
  }


  public exitToLoginPage(message?: string) {
    if (!message) { message = "Your session has expired. Please log in again."; }
    this.user.setToast(message);
    this.navCtrl.setRoot(AuthPage);
  }




  private closeTransctionList(fab) {
    fab.close();
    this.navCtrl.setRoot(HomePage);
  }



  ionViewDidLoad() {
    //let thisRef = this;

    this.user.createLoadingPopup("Loading support messages...");

    this.loadSupportData().then(() => { }, () => { });


    /*
        this.intervalId = setInterval(() => {
          this.pollData();
        }, 30000); //refreshes every ten seconds
    */

  }

  ionViewWillLeave() {
    try {
      clearInterval(this.intervalId);
    } catch (error) {
      console.log("Interval Clear Error - Chat Support Page");
      console.log(error);
    }

  }


}





