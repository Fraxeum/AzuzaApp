//IONIC imports
import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, ActionSheet, Modal, Icon } from 'ionic-angular';

//PAGE SPECIFIC IMPORTS
import { IonInfiniteScroll } from '@ionic/angular';
import { Chart } from 'chart.js';

//PAGE COMMON IMPORTS
import { NewModalPage } from '../new-modal/new-modal';
import { UserProvider } from '../../providers/user/user';
import { ModalController } from 'ionic-angular';
import { AuthPage } from '../../pages/auth/auth';

//import { SharedTradeWizardComponent } from '../../components/components.module';
import { OtcNegotiationPopupPage } from '../otc-negotiation-popup/otc-negotiation-popup'
import { HomePage } from '../../pages/home/home';

import { SessionProvider } from "../../providers/session/session";

type marketListItem = { "Asset": string, "CompanyName": string, "Name": string, "Count": string };
type responseDataObject = { "open": string, "closed": string, "total": string };

type offersObject = { "id": string, "price": string, "amount": string, "total": string, "fee": string, "userid": string, "status": string, "pair": string, "TimeStamp": string, "uid": string, "ModifyDate": string, "lastselleroffer": string, "lastbuyeroffer": string, "Counter": [counterObject] };
type counterObject = { "Price": string, "BS": string, "TimeStamp": string, "uid": string };
type sellorderObject = { "id": string, "price": string, "amount": string, "total": string, "left": string, "sold": string, "userid": string, "status": string, "pair": string, "TimeStamp": string, "uid": string, "Name": string, "LegalId": string, "lastprice": string, "currency": string, "asset": string, "currencySymbol": string, "CompanyName": string, "CompanyWebsite": string, "state": string, "ResponseCount": responseDataObject, "Prospectus": string, "bestbuyeroffer": string, "offers": [offersObject], "responseDataLoaded"?: boolean, "showResponses"?: boolean, "showDetail"?: boolean, "showForm"?: boolean, "hide"?: boolean };

type purchaseOfferObject = { "id": string, "price": string, "amount": string, "total": string, "left": string, "userid": string, "status": string, "pair": string, "TimeStamp": string, "uid": string, "currency": string, "asset": string, "currencySymbol": string, "Selluid": string, "state": string, "Counter": [counterObject] }

type TradeData = Array<{"TimeStamp":string,"Volume":string, "Value":string}>;
    
@IonicPage({
  name: 'page-otc-market-main',
  segment: 'otc-market-main',
  priority: 'high'
})
@Component({
  selector: 'page-otc-market-main',
  templateUrl: 'otc-market-main.html'
})


export class OtcMarketMainPage {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild('lineCanvas') lineCanvas: ElementRef<any>;

  private lineChart: Chart;

  private currentPage: string = 'marketlist'; //marketlist, market, ...
  private activeTab: string = 'activeTab';
  private inactiveTab: string = 'inactiveTab';
  private selectedTab: number = 0;
  private legalId: number;
  private initial: 'InitialPage';
  private firstEntry: boolean = true;

  private myMemberID: string;
  private showMyTrades: boolean;

  private include: string = "all";

  private intervalId: number;
  private showLoader: boolean = true;

  private currentAsset: string;
  private currentSPVName: string;
  private currentIndex: number;
  private currentOTCItemUID: string;
  private currentOfferUID: string;

  private actionSheet: ActionSheet;
  private otcNegotiationPage: Modal;
  private showOffersFromBuyers: boolean;
  private userdata = null;

  private tradeData: TradeData;
  private numOffersReceived: number = 0;

  //initial SPV list
  private marketListData: Array<marketListItem>;

  //my open purchase offers list
  private myOffersToPurchaseList: Array<purchaseOfferObject>;

  //my open sell orders list
  private allMySellOrdersList: Array<sellorderObject>;

  //working arrays
  private allSellOrderData: Array<sellorderObject>;
  private origSellOrderData: Array<sellorderObject>;
  private offersFromBuyersData: Array<offersObject>;


  constructor(public navCtrl: NavController, public navParams: NavParams, public user: UserProvider, public modalCtrl: ModalController,
    public alertController: AlertController, public session: SessionProvider, public actionSheetCtrl: ActionSheetController, 
    private changeDetector : ChangeDetectorRef) {


    //this.tradeWizard = tradeWiz;
    this.resetPagination();
    this.primeDataObjects();
    this.showMyTrades = this.initShowMyTrades();
  }



  //finds the first instance of buyer/seller ('B' or 'S') and returns that price. (The array received is ordered last received price first)
  private getLastAskingPrice(buyerSeller: string, counterArray: Array<counterObject>, defaultPrice: number): number {
    if (!counterArray) return defaultPrice;

    let price = 0;

    if (counterArray && counterArray.length > 0) {
      for (let i = 0; i < counterArray.length; i++) {
        if (counterArray[i].BS === buyerSeller) {
          console.log("found " + buyerSeller + "'s price = " + counterArray[i].Price);
          price = +counterArray[i].Price;
          i = counterArray.length;
        }
      }
    }

    return price;
  }

  private wallet_balances: {
    "currency_symbol": string,
    "available_balance": number
  };



  //seller withdrawing own sales order
  async createOTCOfferBuyOffer(uid: string, index: number) {

    this.currentOTCItemUID = uid;
    this.currentIndex = index;
    this.currentAsset = this.allSellOrderData[index].pair;
    // uid = uid ? uid : this.currentOTCItemUID;
    // index = index ? index : this.currentIndex;

    console.log("this is selected item index: " + index);

    const alert = this.alertController.create({
      title: 'Purchase offer',
      message: 'Enter the price per share and the number of shares that you would like to buy below then select <i>Next</i> to continue.',
      inputs: [
        {
          name: 'Price per share (R)',
          placeholder: "Price ex: " + this.allSellOrderData[index].price, //asking price as opposed to last price,
          type: "number"
        },
        {
          name: 'Number of shares',
          placeholder: "Total shares ex: " + this.allSellOrderData[index].left //the total number of shares currently left
        }
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

            let p: any = data["Price per share (R)"];

            let a: any = data["Number of shares"];

            let validation: { response: boolean, message: string } = this.validateOfferPrice(index, p);
            if (!validation.response) {
              this.user.setToast(validation.message);
              return;
            }

            validation = this.validateOfferAmount(index, a);
            if (!validation.response) {
              this.user.setToast(validation.message);
              return;
            }

            this.doOTCAction({ "action": "newoffertopurchase", "price": p, "amount": a, data });
            return true;
          }
        }
      ]
    });

    await alert.present();
  }

  private validateOfferPrice(index: number, offerPrice: string): { response: boolean, message: string } {
    let ask = +this.allSellOrderData[index].price;
    let offer = +offerPrice;

    if (ask < offer) {
      return { response: false, message: "Make an offer that is lower or equal to the asking price." }
    }

    return { response: true, message: null }
  }

  private validateOfferAmount(index: number, offerAmount: string): { response: boolean, message: string } {
    let ask = +this.allSellOrderData[index].amount;
    let offer = +offerAmount;

    if (ask < offer) {
      return { response: false, message: "The most you can buy is " + ask + " shares." }
    }

    return { response: true, message: null }
  }

  private convertDate(dateStr) {
    return Date.parse(dateStr);
  }


  //buyer buying shares at the price specified
  async createOTCBuyDirectOffer(uid: string, index: number) {

    this.currentOTCItemUID = uid;

    this.currentIndex = index;

    //let sellprice: number = this.getSellPrice(index);
    let sellprice: number = this.getSellPrice(this.allSellOrderData[index].price);

    const alert = this.alertController.create({
      title: 'Buy shares',
      message: 'You are buying ' + this.allSellOrderData[index].Name + ' at R' + sellprice.toFixed(2) + ' a share. Enter the number of shares you want and press <i>Next</i> to continue.',
      inputs: [
        {
          name: 'Number of shares',
          placeholder: "Max available: " + this.allSellOrderData[index].left //the total number of shares currently left
        }
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
            this.doOTCAction({ "action": "buysellersask", "price": sellprice, "amount": data["Number of shares"], data });
            return true;
          }
        }
      ]
    });

    await alert.present();
  }



  //seller withdrawing own sales order
  async confirmCancelMySalesOrder(uid: string, index: number) {

    this.currentOTCItemUID = uid;

    const alert = this.alertController.create({
      title: 'Cancel sales order',
      message: 'You are about to cancel your sales order and withdraw it from the market. Select <i>Next</i> to continue.',
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
            this.doOTCAction({ "action": "cancelsellorder", "price": 0, "amount": 0 });
            return true;
          }
        }
      ]
    });

    await alert.present();
  }


  //seller withdrawing own sales order
  async confirmCancelMyOffer(uid: string, index: number, asset: string) {

    this.currentOTCItemUID = uid;
    this.currentAsset = asset;

    const alert = this.alertController.create({
      title: 'Cancel offer',
      message: 'You are about to cancel your offer and withdraw from this negotiation. Select <i>Next</i> to complete this action.',
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
            this.doOTCAction({ "action": "cancelbid", "price": 0, "amount": 0 });
            return true;
          }
        }
      ]
    });

    await alert.present();
  }

  private getBuyerLastOffer(index) {
    return this.allSellOrderData[this.currentIndex].offers[index].lastbuyeroffer;
  }


  private async confirmSellerAcceptBuyerOffer(index, uid) {
    //buyer buying shares at the price specified

    this.currentOfferUID = uid;

    console.log("Current Index (sharesList) = " + this.currentIndex);

    console.log("Current Index (offersList) = " + index);

    console.log("Current Asset = " + this.currentAsset)

    console.log("sell price: " + this.allSellOrderData[this.currentIndex].offers[index].price);
    console.log("sell amount: " + this.allSellOrderData[this.currentIndex].offers[index].amount);
    console.log("sell total: " + this.allSellOrderData[this.currentIndex].offers[index].total);

    let sellprice: number = parseFloat(this.getBuyerLastOffer(index));

    let fees = parseFloat(this.allSellOrderData[this.currentIndex].offers[index].total) * 0.025;
    if (fees > 50) {
      fees = 50;
    }

    let feesStr = fees.toFixed(2);

    //ADD TOTAL

    //let sellprice: number = +(( this.getSellPrice(index) == null ) ?  (parseFloat(this.allSellOrderData[index].price).toFixed(2)) : (this.getSellPrice(index).toFixed(2)));

    const alert = this.alertController.create({
      title: 'Selling shares',
      message: 'You are selling ' + this.allSellOrderData[this.currentIndex].offers[index].amount + ' '
        + this.allSellOrderData[this.currentIndex].Name + ' shares at R' + sellprice.toFixed(2)
        + ' a share for a total of R' + this.allSellOrderData[this.currentIndex].offers[index].total + '. Total transaction fees: R' + feesStr + 'Select <i>Next</i> to continue.',

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
            let data = {
              "price": +this.allSellOrderData[this.currentIndex].offers[index].price,
              "amount": +this.allSellOrderData[this.currentIndex].offers[index].amount,
              "Asset": this.currentAsset
            }
            this.doOTCAction({ "action": "acceptbid", "price": 0, "amount": 0, data });
            return true;
          }
        }
      ]
    });

    await alert.present();

  }


  private async showBuyOffersActionSheet(uid: string, userid: string, index: number, price: string, amount: string) {

    if (this.showOffersFromBuyers) {
      this.currentOTCItemUID = this.allSellOrderData[this.currentIndex].offers[index].uid;
      console.log("this.currentIndex: " + this.currentIndex);
      console.log("this.currentOTCItemUID: " + this.currentOTCItemUID);
    }

    this.actionSheet = this.actionSheetCtrl.create({
      title: 'Options',
      buttons: [
        {
          text: 'Accept offer',
          handler: () => {
            this.confirmSellerAcceptBuyerOffer(index, uid);
          }
        },
        {
          text: 'Negotiate',
          handler: () => {
            this.openBuyerOfferItem(index, uid);
          }
        },
        {
          text: 'Reject offer',
          handler: () => {
            this.openBuyerOfferItem(index, uid);
          }
        },
        {
          text: 'View company',
          handler: () => {
            let url = this.allSellOrderData[index].CompanyWebsite;
            this.launchExternalWebsite(url);
            console.log('view company clicked');
          }
        },
        {
          text: 'Cancel sale',
          handler: () => {
            this.confirmCancelMySalesOrder(uid, index);
            return;
          }
        },
        {
          text: 'Dismiss',
          role: 'cancel'
        }
      ]
    });

    setTimeout(() => {
      this.actionSheet.present();
    }, 500);

  }


  private showActionSheet(uid: string, userid: string, index: number, asset?: string) {

    console.log("HOWZIT");

    console.log("showActionSheet:");
    console.log("uid=" + uid);
    console.log("userid=" + userid);
    console.log("index=" + index);

    this.currentIndex = index;
    this.currentAsset = asset ? asset : "";
    this.currentOTCItemUID = uid;

    let version = 4;

    if (this.myMemberID != this.allSellOrderData[index].userid) {
      version = 1;
    }

    console.log("this.allSellOrderData[index].offers");
    console.log(this.allSellOrderData[index].offers);

    if (this.allSellOrderData[index].offers && this.allSellOrderData[index].offers.length > 0) {
      version = version === 4 ? 3 : 2;
    }

    console.log("this is OTC Main version: " + version);

    switch (version) {

      case 1: {
        this.presentNewBuyerActionSheet(uid, index);
        break;
      }

      case 2: {
        this.presentBuyerActionSheet(uid, index, asset);
        break;
      }

      case 3: {
        this.presentSellerActionSheet(uid, index);
        break;
      }

      case 4: {
        this.presentNewSellerActionSheet(uid, index);

        break;
      }
    }
  }


  //returns null if price is not a number
  private getSellPrice(price: string): number {
    if (isNaN(+price)) {
      return null;
    }

    let sellprice: number = parseFloat(price);

    return Number(sellprice);
  }


  private async listActionSheet(index: number, asset) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Options',
      buttons: [
        {
          text: 'View share adverts',
          handler: () => {
            this.loadSPVSellOrders(asset, this.include)
          }
        },
        {
          text: 'View company',
          handler: () => {
            let url = this.allSellOrderData[index].CompanyWebsite;
            this.launchExternalWebsite(url);
            console.log('view company clicked');
          }
        },
        {
          text: 'Dismiss',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    await actionSheet.present();
  }

  private getOriginalPrice() {
    return this.allSellOrderData[this.currentIndex].price;
  }


  private async presentNewBuyerActionSheet(uid: string, index: number) {

    if (this.actionSheet) { await this.actionSheet.dismiss(); }

    this.actionSheet = this.actionSheetCtrl.create({
      title: 'Options',
      buttons: [
        {
          text: 'Buy (R ' + parseFloat(this.getOriginalPrice()).toFixed(2) + "/share)",
          role: 'destructive',
          handler: () => {
            try {
              this.actionSheet.dismiss();
            } catch (error) { }

            this.createOTCBuyDirectOffer(uid, index);

            return false;
          }
        },
        {
          text: 'Make offer',
          handler: () => {
            try {
              this.actionSheet.dismiss();
            } catch (error) { }

            this.createOTCOfferBuyOffer(uid, index);
          }
        },
        {
          text: 'View company',
          handler: () => {
            let url = this.allSellOrderData[index].CompanyWebsite;
            this.launchExternalWebsite(url);
            console.log('view company clicked');
          }
        },
        {
          text: 'Dismiss',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    await this.actionSheet.present();
  }

  private getSellerLastPrice(index) {
    let price = this.allSellOrderData[index].price;
    if (this.allSellOrderData[index].offers && this.allSellOrderData[index].offers.length > 0) {
      if (this.allSellOrderData[index].offers[0].lastselleroffer) {
        return this.allSellOrderData[index].offers[0].lastselleroffer;
      }
    }
    return price;
  }

  private async presentBuyerActionSheet(uid: string, index: number, asset: string) {
    console.log("In presentBuyerActionSheet");

    let offerUid = "";

    let sellPrice: number = parseFloat(this.getSellerLastPrice(index));

    let hasMadeOffer: boolean = (this.allSellOrderData[index].offers && this.allSellOrderData[index].offers[0]) ? true : false;

    if (hasMadeOffer) {
      console.log("hasMadeOffer = true");
      offerUid = this.allSellOrderData[index].offers[0].uid;
      console.log("------> offerUID" + offerUid);
      console.log("------> currentOfferUID" + this.currentOfferUID);
      //this.currentOfferUID = offerUid;
      //sellPrice = this.getSellPrice(index);
      //return;
    }

    this.currentAsset = this.allSellOrderData[index].pair;

    this.actionSheet = this.actionSheetCtrl.create({
      title: 'Options',
      buttons: [
        {
          text: 'Buy (R ' + sellPrice.toFixed(2) + ")",
          role: 'destructive',
          handler: () => {
            this.actionSheet.dismiss().then(() => {
              this.createOTCBuyDirectOffer(uid, index);
            });
          }
        }, {
          text: 'Cancel offer',
          handler: () => {
            this.confirmCancelMyOffer(offerUid, index, asset);

          }
        },
        {
          text: 'View company',
          handler: () => {
            let url = this.allSellOrderData[index].CompanyWebsite;
            this.launchExternalWebsite(url);
            console.log('view company clicked');
          }
        },
        {
          text: 'Dismiss',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });


    if (hasMadeOffer) {
      let button = {
        text: 'Negotiate',
        handler: () => {
          let userid = this.allSellOrderData[index].userid;
          let offerid = parseInt(this.allSellOrderData[index].uid);
          let responses = this.allSellOrderData[index].ResponseCount.open;
          let numResponses = 0;
          if (responses && !isNaN(numResponses)) {
            numResponses = parseInt(responses);
          }
          //this.getTradeOffers(index, userid, offerid, numResponses);
          this.openSellerOfferItem(index, offerid);
        }
      }
      console.log("adding negotiate button");
      this.actionSheet.data.buttons.splice(1, 0, button);
    }

    await this.actionSheet.present();
  }

  private async presentSellerActionSheet(uid: string, index: number) {

    let hasMadeOffer: boolean = (this.allSellOrderData[index].offers && this.allSellOrderData[index].offers[0]) ? true : false;

    this.actionSheet = this.actionSheetCtrl.create({
      title: 'Options',
      buttons: [
        {
          text: 'View company',
          handler: () => {
            let url = this.allSellOrderData[index].CompanyWebsite;
            this.launchExternalWebsite(url);
            console.log('view company clicked');
          }
        },
        {
          text: 'Cancel sale',
          handler: () => {
            this.confirmCancelMySalesOrder(uid, index);
            return;
          }
        },
        {
          text: 'Dismiss',
          role: 'cancel'
        }
      ]
    });

    if (hasMadeOffer) {
      let button = {
        text: 'Show offers received',
        handler: () => {
          this.offersFromBuyersData = this.allSellOrderData[index].offers;
          this.showOffersFromBuyers = true;
        }
      }
      console.log("adding negotiate button");
      this.actionSheet.data.buttons.splice(0, 0, button);
    }

    await this.actionSheet.present();
  }

  private async presentNewSellerActionSheet(uid, index) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Options',
      buttons: [
        {
          text: 'Withdraw',
          handler: () => {
            this.confirmCancelMySalesOrder(uid, index);
            return;
          }
        },
        {
          text: 'Dismiss',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    await actionSheet.present();
  }



  private initShowMyTrades(): boolean {
    let show = localStorage.getItem('showMyTrades');
    if (typeof show === 'undefined' || show == null) {
      return false; //if not set then hide own trades
    }

    return show === "1" ? true : false;
  }

  toggleShowOffersList(index: number) {
    //NO LONGER IN USE I THINK
    if (index === null) {
      this.allSellOrderData[index].responseDataLoaded = false;
      this.allSellOrderData[index].showResponses = false;
      return;
    }




  }

  private async toggleMyTradeVisibility() {
    /* let asset = this.currentAsset ? this.currentAsset : "";
 
     this.showMyTrades = !this.showMyTrades;
 
     localStorage.setItem('showMyTrades', this.showMyTrades ? "1" : "0");
 
     await this.loadSPVSellOrders(asset);*/
  }

  private hideOfferFromBuyers(fab?) {
    if (fab) fab.close();

    this.updateData();
    this.showOffersFromBuyers = false;
    this.resetOffersFromBuyersData();

  }

  private async getTradeOffers(index: number, userid: string, offerid: string, numResponses: number) {

    this.currentIndex = index;
    this.currentAsset = this.allSellOrderData[index].pair;
    this.currentOTCItemUID = offerid;

    if (numResponses < 1) {
      return false;
    }

    /*TODO: PROBABLY NOT USED ANYMORE
    if (this.allSellOrderData[index].showResponses) {
      //reset - show/hide
      //this.toggleShowOffersList(index);
      console.log("CALLED DEPRICATED CODE -- 01");
      return;
    }*/

    if (this.myMemberID === userid) { //i'm the seller -> show me a list of offers from buyers

      this.offersFromBuyersData = this.allSellOrderData[index].offers;

      this.showOffersFromBuyers = true;

    } else {                        //i'm the buyer -> show me the sell offer from a specific seller
      //this user is buyer - one buyer/one seller
      //console.log("calling getMyOffersToSeller() ");

      //TODO: Check for null (nog logged in)

      /*let response: any = await this.getMyOffersToPurchase(offerid); //sets data to this object this.offersFromBuyersData


      if (response == null || !response) {
        this.exitToLoginPage();
        return false;
      }
      */


      // this.offersToSellerData = this.allSellOrderData[index].offers
      console.log("OFFERS TO SELLERS");
      //console.log(JSON.stringify(response));

      // this.toggleShowOffersList(index);
      this.openSellerOfferItem(index, parseInt(offerid));


    }
  }

  /*
  //returns a list of offers received from various buyers on a specific trade
  private async getMyOffersFromBuyers(index: number, asset: string) {
    this.currentAsset = asset;
    this.currentIndex = index;
 
    console.log("calling loadMyTradeOfferData(asset=" + asset + ", 'listallmysellorders') ");

    this.user.createLoadingPopup("Fetching offers...", true);

    let response = await this.loadMyTradeOfferData(offerid, "listallmysellorders");

    this.user.dismissLoadingPopup();

    if (response == null) {
      console.log("EXIT: response null");
      this.exitToLoginPage();
      return null;
    }

    if (response && response.code === '1000') {
      console.log("EXIT: response code 1000");
      this.exitToLoginPage();
      return null;
    }

    if (!response) {
      this.user.setToast("We were unable to load this trade's data. Please try again later.");
      return;
    }

    return response;
  }
  */

  /*returns a list of negotiation messages
  private async getMyOffersToPurchase(offerId: string) {

    this.user.createLoadingPopup("Fetching offers...", true);

    let response = await this.loadMyOffersToBuyData(offerId, "listmyofferstopurchase");

    this.user.dismissLoadingPopup();

    if (response == null) {
      console.log("EXIT: response null");
      this.exitToLoginPage();
      return null;
    }

    if (response && response.code === '1000') {
      console.log("EXIT: response code 1000");
      this.exitToLoginPage();
      return null;
    }



    return response;

  }*/

  private pagination: {
    "listsellorders": {
      "step": number,
      "limit": number
    },
    "listallmysellorders": {
      "step": number,
      "limit": number
    },
    "listmyofferstopurchase": {
      "step": number,
      "limit": number
    }
  };

  private async addUIFields(data: any) {

    let dataset = data;

    if (dataset) {
      //add market item to JSON
      dataset.forEach((item: any) => {
        item.showForm = false;
        item.showDetail = false;
        item.showResponses = false;
        item.responseDataLoaded = false;
        item.hide = false;
      });

    }
    return await dataset;
  }

  private toggleInfiniteScroll() {
    //this.infiniteScroll.disabled = true;
  }

  private openTab(tabname: string) {
    this.currentPage = tabname;
    return;
  }

  private launchExternalWebsite(url: string) {

    if (url) {
      window.open(url, '_system', 'location=yes');
    }

    return;
  }

  private primeDataObjects() {


    this.primeAllSellOrdersData();
    //.. next
    //.. next
  }

  private primeAllSellOrdersData() {

    this.showOffersFromBuyers = null;

    this.marketListData = [{ "Asset": "", "CompanyName": "Loading...", "Name": "Loading...", "Count": "" }];

    this.allSellOrderData = [{
      "id": "0", "price": "0.00", "amount": "0", "total": "0.00", "left": "0", "sold": "0", "userid": "0", "status": "O",
      "pair": "", "TimeStamp": "2020-01-01 00:00:01", "uid": "0", "Name": "", "LegalId": "0", "lastprice": "0.00", "currency": "ZAR", "asset": "",
      "currencySymbol": "", "CompanyName": "", "CompanyWebsite": "", "state": "", "Prospectus": null, "ResponseCount": { "open": "0", "closed": "0", "total": "0" },
      "bestbuyeroffer": "",
      "offers": [{
        "id": "", "price": "", "amount": "", "total": "", "fee": "", "userid": "", "status": "", "pair": "", "TimeStamp": "", "uid": "", "ModifyDate": "", "lastselleroffer": "", "lastbuyeroffer": "",
        "Counter": [{ "Price": "", "BS": "", "TimeStamp": "", "uid": "" }]
      }], "responseDataLoaded": false, "showResponses": false, "showDetail": false, "showForm": false, "hide": false
    }];

    this.tradeData = [{"TimeStamp":"2020-04-21 16:26:39","Volume":"0", "Value":"0"},
    {"TimeStamp":"2020-04-21 16:26:39","Volume":"0", "Value":"0"},
    {"TimeStamp":"2020-04-22 16:26:39","Volume":"0", "Value":"0"},
    {"TimeStamp":"2020-04-23 16:26:39","Volume":"0", "Value":"0"},
    {"TimeStamp":"2020-04-24 16:26:39","Volume":"100", "Value":"16400"},
    {"TimeStamp":"2020-04-25 16:26:39","Volume":"45", "Value":"8110"},
    {"TimeStamp":"2020-04-26 16:26:39","Volume":"0", "Value":"0"},
    {"TimeStamp":"2020-04-27 16:26:39","Volume":"0", "Value":"0"},
    {"TimeStamp":"2020-04-28 16:26:39","Volume":"0", "Value":"0"},
    {"TimeStamp":"2020-04-29 16:26:39","Volume":"550", "Value":"44170"},
    {"TimeStamp":"2020-04-30 16:26:39","Volume":"0", "Value":"0"},
    {"TimeStamp":"2020-05-01 16:26:39","Volume":"0", "Value":"0"},
    {"TimeStamp":"2020-05-02 16:26:39","Volume":"0", "Value":"0"},
    {"TimeStamp":"2020-05-03 16:26:39","Volume":"0", "Value":"0"},
    {"TimeStamp":"2020-05-04 16:26:39","Volume":"0", "Value":"0"},
    {"TimeStamp":"2020-05-05 16:26:39","Volume":"900", "Value":"101776"},
    {"TimeStamp":"2020-05-06 16:26:39","Volume":"1000", "Value":"131000"},
    {"TimeStamp":"2020-05-07 16:26:39","Volume":"0", "Value":"0"},
    {"TimeStamp":"2020-05-08 16:26:39","Volume":"0", "Value":"0"},
    {"TimeStamp":"2020-05-09 16:26:39","Volume":"700", "Value":"88544"},
    {"TimeStamp":"2020-05-10 16:26:39","Volume":"0", "Value":"0"},
    {"TimeStamp":"2020-05-11 16:26:39","Volume":"0", "Value":"0"},
    {"TimeStamp":"2020-05-12 16:26:39","Volume":"0", "Value":"0"},
    {"TimeStamp":"2020-05-13 16:26:39","Volume":"0", "Value":"0"},
    {"TimeStamp":"2020-05-14 16:26:39","Volume":"100", "Value":"16400"},
    {"TimeStamp":"2020-05-15 16:26:39","Volume":"350", "Value":"29050"},
    {"TimeStamp":"2020-05-16 16:26:39","Volume":"0", "Value":"0"},
    {"TimeStamp":"2020-05-17 16:26:39","Volume":"600", "Value":"59500"},
    {"TimeStamp":"2020-05-18 16:26:39","Volume":"0", "Value":"0"},
    {"TimeStamp":"2020-05-19 16:26:39","Volume":"0", "Value":"0"}
  ];

    /*this.assetObject = {
      "id": null, "price": null, "amount": null, "total": null, "left": null, "sold": null, "userid": null, "status": null,
      "pair": null, "TimeStamp": null, "uid": null, "Name": null, "LegalId": null, "lastprice": null, "currency": null, "asset": null,
      "currencySymbol": null, "CompanyName": null, "CompanyWebsite": null, "state": null, "Prospectus": null, "ResponseCount": { "open": "0", "close": "0", "total": "0" },
    };*/


    this.resetOffersFromBuyersData();

  }

  private makeLabelArray(){
    let labels = new Array();
    let date = null;
    
    this.tradeData.forEach(element => {
      if(+element.Value > 0 || +element.Value > 0){
        date = new Date(element.TimeStamp);
        labels.push(date.getDate() + "/" + date.getMonth());
      }
    });
    console.log(labels);
    return labels;
  }

  private makeVolumeArray(){
    let labels = new Array();
    this.tradeData.forEach(element => {
      if(+element.Volume > 0)
      labels.push(+element.Volume * 10);
    });
    console.log(labels);
    return labels;
  }

  private makeValueArray(){
    let labels = new Array();
    this.tradeData.forEach(element => {
      if(+element.Value > 0)
      labels.push(element.Value);
    });
    console.log(labels);
    return labels;
  }

  private resetOffersFromBuyersData() {
    this.offersFromBuyersData = [{ "id": "", "price": "", "amount": "", "total": "", "fee": "", "userid": "", "status": "", "pair": "", "TimeStamp": "", "uid": "", "ModifyDate": "", "lastselleroffer": "", "lastbuyeroffer": "", "Counter": [{ "Price": "", "BS": "", "TimeStamp": "", "uid": "" }] }]
    return;
  }



  async fetchSummaryData(showLoader?: boolean) {

    if (this.firstEntry) {
      this.firstEntry = false;
      this.user.createLoadingPopup("Connecting to Market Place...", true);
    }
    return;
  }


  //Called from HTML
  private fetchAllData(asset: string, showLoader?: boolean) {
    this.loadAllSellOrdersData(asset);

  }


  resetPagination() {
    this.pagination = {
      "listsellorders": {
        "step": -1,
        "limit": 15
      },
      "listallmysellorders": {
        "step": -1,
        "limit": 15
      },
      "listmyofferstopurchase": {
        "step": -1,
        "limit": 15
      }
    };
  }


  private loadData(asset: string, event: any) {

    this.loadAllSellOrdersData(asset, "fwd", event).then(async (data) => {
      setTimeout(() => {
        console.log('Done');
        // App logic to determine if all data is loaded
        // and disable the infinite scroll
        if (!data) {
          this.toggleInfiniteScroll();
        } else {
          event.target.complete();
        }
      }, 500);
    });

  }

  private async pollData() {
    let data = await this.updateData();
    return;
  }

  private async loadAllSellOrdersData(asset: string, dir?: string, event?: any) {
    if (dir) { console.log("EVENT: " + dir) };

    if (dir && (dir === "bwd")) {
      this.pagination.listsellorders.step--;
    } else this.pagination.listsellorders.step++;

    if (this.pagination.listsellorders.step < 0) {
      this.pagination.listsellorders.step = 0;
    }

    this.currentAsset = asset;

    let data = this.loadMarketData(asset, "allsellorders");

    return data;
  }

  //returns a list of all my open sell orders with bids
  private async fetchMySellOrders(): Promise<any> {

    return new Promise((resolve, reject) => {

      this.loadMarketList("listallmysellorders").then(async (data) => {

        if (data == null || !data) {
          this.exitToLoginPage();
          resolve(null);
        }

        if (data && !data.success && data.message) {
          this.user.setToast(data.message);
          resolve(false);

        }

        //TODO: ADD END OF DATA LIST CHECK 

        if (data.data) {
          this.allMySellOrdersList = data.data;
          this.countOffersReceived();
          resolve(true);
        }

      });

    });
  }

  //returns a list of all my open offers to purchase with responses
  private async fetchMyOffersToPurchase(): Promise<any> {

    return new Promise((resolve, reject) => {

      this.loadMarketList("listmyofferstopurchase").then(async (data) => {

        if (data == null || !data) {
          this.exitToLoginPage();
          resolve(null);
        }

        if (data && !data.success && data.message) {
          this.user.setToast(data.message);
          resolve(false);

        }

        //TODO: ADD END OF DATA LIST CHECK 

        if (data.data) {
          this.myOffersToPurchaseList = data.data;
          resolve(true);
        }

      });

    });
  }

  private countOffersReceived(){
    this.allMySellOrdersList.forEach((element)=>{
      if(element.offers && element.offers.length > 0){
        this.numOffersReceived += element.offers.length;
      }
    })
    console.log("NumOffersReceived = "+this.numOffersReceived);
  }

  //Fetches SPV List for first page
  private async fetchSPVList(): Promise<any> {

    return new Promise((resolve, reject) => {

      this.loadMarketList("listallsellorderssummary").then(async (data) => {

        if (data == null || !data) {
          this.exitToLoginPage();
          resolve(null);
        }

        if (data && !data.success && data.message) {
          this.user.setToast(data.message);
          resolve(false);

        }

        //TODO: ADD END OF DATA LIST CHECK 

        if (data.data) {
          this.marketListData = data.data;
          resolve(true);
        }

      });

    });

  }

  private createChart(data?: any) {

    
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "line",
      data: {
        labels: this.makeLabelArray(),
        datasets: [
          {
            label: "Volume (10X)",
            data: this.makeVolumeArray(),
            order: 0,
            backgroundColor: [
              "#2C3651",
              /*"rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"*/
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              /*"rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"*/
            ],
            type: "bar",
          },
          {
            label: "Value",
            data: this.makeValueArray(),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              /*"rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"*/
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
              /*"rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"*/
            ],
            borderWidth: 1,
            lineTension: 0,
            order: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false
              }
            }
          ]
        }
      }
    });
  }

  private async loadMarketData(asset: string, type: string) {

    if (type === 'allsellorders') {
      return await this.loadSPVSellOrders(asset, "all").then(() => {
        this.changeDetector.detectChanges();
        setTimeout(()=>{
          this.createChart();
        }, 100);
        
      });
    }

    if (type === 'ownsellorders') {
      return await this.loadSPVSellOrders(asset, "own");
    }

    if (type === 'othersellorders') {
      return await this.loadSPVSellOrders(asset, "others");
    }

    if (type === 'myoffersreceived') {
      return await this.loadMyOffersReceived(asset, 0, 15, null);
    }


  }

  //set @asset:string to null for all offers received over all assets
  private async loadMyOffersReceived(asset: string, step: number, limit: number, include: string) {

    if (step < 0) {
      step = 0;
    }

    this.user.getSellOrderData("listallmysellorders", asset, step, limit, include).then(async (response) => {
      console.log("list all my sellorders response")
      console.log(response);

      try {
        this.user.dismissLoadingPopup();
      } catch (error) {
        console.log(error.message);
      }

      if (!response) {
        console.log("failed to retrieve market data");
        return;
      }

      if (response && !response.success && response.code === '1000') {
        this.exitToLoginPage();
        return;
      }

      if (response) {

        //set member ID
        this.session.getUserdata().then((data) => {
          if (data && data.general) {
            this.myMemberID = data.general.MemberId;
          }
        });


        return response;

      }
      return false;

    }, (result: any) => {
      
      this.user.dismissLoadingPopup();
      this.user.setToast("A network error occurred. Please try again or contact AZUZA support if the problem persists.");
      return;
    });

  }



  private async loadSPVSellOrders(asset: string, include: string): Promise<any> {

    this.user.createLoadingPopup("Loading market data...", true);

    this.currentAsset = asset;

    let data: any = await this.loadSellOrderData("listallsellorders", asset, this.pagination.listsellorders.step, this.pagination.listsellorders.limit, include);

    return new Promise((resolve, reject) => {

      if (data && data.data) {

        this.currentSPVName = data.data[0].Name;

        this.addUIFields(data.data).then(async (response) => {

          this.allSellOrderData = this.origSellOrderData = response;
          //keeping a duplicate because we add JSON elements to the allSellOrderData array making it impossible to share items with TradeWiz


          this.currentPage = "market";

          this.user.dismissLoadingPopup();

          resolve(data.data);
        });//adds UI show/hide fields to each item


      } else if (data && !data.success && data.message) {

        let msg: string = data.message;

        this.navCtrl.setRoot("auth");
        let message = "You were inactive for too long. Please log in again.";
        this.user.setToast(message);

        resolve(null);

      } else {

        let message = "You have reached the end of the share classifieds list.";
        this.user.setToast(message);

        resolve(false);

      }

    });

  }

  private async updateBalances() {
    console.log("Updating balances...");
    let data: any = await this.user.getAccountBalances().then(async (data) => {

      if (data && data.data) {
        console.log("storing data");
        await this.session.updateBalances(data.data).then(async (response) => {
          return await response;
        });

      } else if (data && !data.success && data.message) {

        let msg: string = data.message;

        //break to login page
        console.log("Session expired, login");
        this.navCtrl.setRoot("auth");
        let message = "You were inactive for too long. Please log in again.";
        this.user.setToast(message);
        return false;

      } else {
        if (data) {
          let message = "You have reached the end of the share classifieds list.";
          this.user.setToast(message);
          return false;
        }
      }
    });


  }

  private async updateData() {
    console.log("Updating Arrays...");
    let data: any = await this.loadSellOrderData("listallsellorders", this.currentAsset, this.pagination.listsellorders.step, this.pagination.listsellorders.limit, this.include);

    if (data && data.data) {

      this.updateDataArrays(data.data);

      return;

    } else if (data && !data.success && data.message) {

      let msg: string = data.message;

      //break to login page
      console.log("Session expired, login");
      this.navCtrl.setRoot("auth");
      let message = "You were inactive for too long. Please log in again.";
      this.user.setToast(message);
      return;

    } else {
      if (data) {
        let message = "You have reached the end of the share classifieds list.";
        this.user.setToast(message);
        return false;
      }
    }
  }


  private async updateDataArrays(data: Array<string>) {

    console.log("UPDATING DATA ARRAYS:");

    if (!data || !Array.isArray(data)) {
      console.log("ABORT: Not an array");
      console.log(data);
      return;
    }


    let index = 0;

    data.forEach(async (newData_item, index) => {

      let item = JSON.parse(JSON.stringify(newData_item));

      for (let i = 0; i < this.allSellOrderData.length; i++) {


        if (this.allSellOrderData[i].uid === item.uid) {

          item.showForm = this.allSellOrderData[index].showForm;
          item.showDetail = this.allSellOrderData[index].showDetail;
          item.showResponses = this.allSellOrderData[index].showResponses;
          item.responseDataLoaded = this.allSellOrderData[index].responseDataLoaded;
          item.hide = false;

          this.allSellOrderData[index] = item;

          i = this.allSellOrderData.length;

        }
      }

    });




  }

  //loads my trade offer data - specific to one trade
  async loadAllMySalesOrders(index: number, asset: string) {

    let data = await this.user.getAllMySalesOrdersData(asset).then((response) => {

      if (response == null) {
        return null;
      }

      if (response && response.code === '1000') {

        this.exitToLoginPage();
        return false;
      }

      return response.data;



    }, (result: any) => {

      this.user.setToast("A network error occurred. Please try again or contact AZUZA support if the problem persists.");
      return;
    });


    return data;
  }

  //loads my trade offer data - specific to one trade
  async loadMyTradeOfferData(offerid: string, type: string) {

    //console.log("getMyTradeOfferData(=" + type + ", offerid=" + offerid + ")");
    let data = await this.user.getMyTradeOfferData(type, offerid).then((response) => {

      if (response == null) {
        return null;
      }

      if (response && response.code === '1000') {

        return null;
      }

      return response.data;



    }, (result: any) => {

      this.user.setToast("A network error occurred. Please try again or contact AZUZA support if the problem persists.");
      return;
    });


    return data;
  }



  //loads my trade offer data - specific to one trade
  async loadMyOffersToBuyData(offerid: string, type: string) {


    let data = await this.user.getMyOffersToBuyData(type, offerid).then((response) => {


      if (response == null || !response) {
        console.log("failed to retrieve market data");
        return null;
      }

      return response.data;

    }, (result: any) => {

      this.user.setToast("A network error occurred. Please try again or contact AZUZA support if the problem persists.");
      return null;
    });

    return data;
  }

  //opens a specific buyer offer for negotiation. buyOfferId is the buyer offer item id on a particular share sales offer
  private async openBuyerOfferItem(index: number, buyOfferId: string) {

    console.log("buyOfferId=" + buyOfferId + " and " + "shareOfferId=" + index);
    console.log(this.allSellOrderData);
    console.log(this.offersFromBuyersData);

    //NOTE: index here is the buyOfferList index

    //this.currentIndex = index;
    this.currentOTCItemUID = this.offersFromBuyersData[index].uid;
    console.log("Offer to accept UID: " + this.currentOTCItemUID);
    this.currentAsset = this.offersFromBuyersData[index].pair;

    console.log("UID 1 ======> " + this.currentOTCItemUID);

    let lastbid = this.offersFromBuyersData[index].price;

    if (this.offersFromBuyersData[index].Counter && this.offersFromBuyersData[index].Counter[0].Price) {
      lastbid = this.offersFromBuyersData[index].Counter[0].Price;
    }

    let data = {
      "Name": this.allSellOrderData[this.currentIndex].Name,
      "price": lastbid,
      "amount": this.offersFromBuyersData[index].amount,
      "lastbidder": this.offersFromBuyersData[index].Counter[0].BS,
      "left": this.allSellOrderData[this.currentIndex].left,
      "originalprice": this.allSellOrderData[this.currentIndex].price,
      "totalforsale": this.allSellOrderData[this.currentIndex].amount,
      "lastprice": this.allSellOrderData[this.currentIndex].lastprice,
      "history": this.offersFromBuyersData,
      "Counter": this.offersFromBuyersData[index].Counter,
      "whoami": "S"
    }


    console.log("Sell Offer Item (using uid: " + this.currentOTCItemUID + ")");

    console.log(data);


    this.setOTCNegotiationPage(data);

    return;

  }


  //opens a specific seller item for negotiation. buyOfferId is the buyer offer item id on a particular share sales offer
  private async openSellerOfferItem(index: number, sellOfferId: number) {


    this.currentOTCItemUID = this.allSellOrderData[index].offers[0].uid;
    this.currentIndex = index;
    this.currentOfferUID = "" + sellOfferId;

    console.log("sellOfferId (item UID)=" + sellOfferId);
    console.log(this.allSellOrderData);
    console.log(this.allSellOrderData[index].offers);

    let lastbid = this.allSellOrderData[index].offers[0].price;

    if (this.allSellOrderData[index].offers[0].Counter && this.allSellOrderData[index].offers[0].Counter[0].Price) {
      lastbid = this.allSellOrderData[index].offers[0].Counter[0].Price;
    }

    let lastitem = this.allSellOrderData[index].offers.length - 1;

    let data = {
      "Name": this.allSellOrderData[index].Name,
      "price": lastbid,
      "amount": this.allSellOrderData[index].offers[0].amount,
      "lastbidder": this.allSellOrderData[index].offers[0].Counter[0].BS,
      "left": this.allSellOrderData[index].left,
      "originalprice": this.allSellOrderData[index].price,
      "totalforsale": this.allSellOrderData[index].amount,
      "lastprice": this.allSellOrderData[index].lastprice,
      "history": this.allSellOrderData[index].offers,
      "Counter": this.allSellOrderData[index].offers[0].Counter,
      "whoami": "B"
    }

    this.setOTCNegotiationPage(data);

    return;
  }



  private async setOTCNegotiationPage(data) {

    this.otcNegotiationPage = this.modalCtrl.create(OtcNegotiationPopupPage, { data: data });

    this.otcNegotiationPage.onDidDismiss(async (data) => {

      if (data == null || !data) {
        return;
      }
      console.log("Dismissed OTC Negotiation Page");
      console.log(data);

      if (data) {

        this.doOTCAction(data);
        return;
      }

      return;
    });

    await this.otcNegotiationPage.present();
  }



  private async doOTCAction(data: { "action": string, "price": number, "amount": number, data?: any }) {
    if (!data || !data.action) return;

    let message = null;

    //accept, reject, cancel an offer to purchase

    switch (data.action) {

      case "acceptbid":
        message = "Selling shares...";

        this.completeOTCAction("acceptbid", message, this.currentOTCItemUID, data).then((response) => {
          if (response) {
            this.user.setToast("The share sale has been completed. Your money has been transferred to your wallet.");
            this.hideOfferFromBuyers();
          } else {
            this.user.setToast("There was a problem completing the sale. No share were sold.");
          }

        }).then(() => {
          this.updateData();
        }).then(() => {
          this.updateBalances();
        });

        break;

      case "buysellersask":
        message = "Buying shares...";
        let tdata: { "amount": number } = { "amount": 0 }
        tdata.amount = this.manageInput(data.data["Number of shares"], true);

        if (tdata.amount < 0) {
          tdata.amount === -1 ? this.user.setToast("You must provide an number of shares you would like to buy") : this.user.setToast("The number of share must be a positive, whole number.");
          return;
        }


        if (parseInt(this.allSellOrderData[this.currentIndex].left) < tdata.amount) {
          this.user.setToast("There are only " + this.allSellOrderData[this.currentIndex].left + " shares left to buy.");
          return;
        }

        this.completeOTCAction("buysellersask", message, this.currentOTCItemUID, data).then((response) => {
          if (response) {
            this.user.setToast("Your shares have been bought and transferred to your wallet");
          } else {
            this.user.setToast("The share purchase failed. Your money has been returned to your wallet.");
          }

        }, () => { }).then(() => {
          this.updateData();
        }).then(() => {
          this.updateBalances();
        });


        break;
      case "reject":
        message = "Rejecting bid...";
        this.completeOTCAction("cancelbid", message, this.currentOTCItemUID, data).then((response) => {
          if (response) {
            this.user.setToast("Offer rejected successfully");
          } else {
            this.user.setToast("This bid could not be rejected. Please try again or contact support.");
          }

        }, () => { }).then(() => {
          this.updateData();
        }).then(() => {
          this.updateBalances();
        });;

        break;

      case "cancelbid":
        message = "Cancelling bid...";
        await this.completeOTCAction("cancelbid", message, this.currentOTCItemUID, data).then((response) => {
          if (response) {
            this.user.setToast("Offer cancelled successfully");
          } else {
            this.user.setToast("This bid could not be cancelled. Please try again or contact support.");
          }

        }, () => { }).then(() => {
          this.updateData();
        }).then(() => {
          this.updateBalances();
        });
        console.log("Update data pending...");

        break;

      case "cancelsellorder":
        message = "Cancelling sell order...";

        this.completeOTCAction("cancelsellorder", message, this.currentOTCItemUID, data).then((response) => {
          if (response) {
            this.removeCancelledItem();
            this.user.setToast("Sell order cancelled successfully");
          } else {
            this.user.setToast("This sell order could not be cancelled. Please try again or contact support.");
          }

        }, () => { }).then(() => {
          this.updateData();
        }).then(() => {
          this.updateBalances();
        });
        break;

      case "newoffertopurchase":
        message = "Sending offer...";

        if (!data.data) return;

        console.log("This is data.data: ");
        console.log(data.data);

        let trxdata: { "price": number, "amount": number, "Asset": string } = { "price": 0, "amount": 0, "Asset": this.currentAsset }

        trxdata.price = this.manageInput(data.data["Price per share (R)"], false);
        
        if (trxdata.price < 0) {
          trxdata.price === -1 ? this.user.setToast("You must provide an offer price") : this.user.setToast("Your offer must be a positive number");
          return;
        }

        trxdata.amount = this.manageInput(data.data["Number of shares"], true);
        if (trxdata.amount < 0) {
          trxdata.amount === -1 ? this.user.setToast("You must provide an number of shares you would like to buy") : this.user.setToast("The number of share must be a positive, whole number.");
          return;
        }

        await this.completeOTCAction("newoffertopurchase", message, this.currentOTCItemUID, trxdata).then((response) => {
          if (response) {
            this.user.setToast("Offer to purchase created");
          } else {
            this.user.setToast("We were unable to create this offer to purchase");
          }

        }, () => { }).then(() => {
          this.updateData();
        }).then(() => {
          this.updateBalances();
        });


        break;

      case "counteroffer":
        console.log("currentIndex: " + this.currentIndex);
        console.log("current offersFromBuyersData: ");
        console.log(this.offersFromBuyersData);

        message = "Sending counter offer...";
        this.completeOTCAction("counteroffer", message, this.currentOTCItemUID, data).then((response) => {
          if (response) {

            this.user.setToast("Counter offer created");
          } else {
            this.user.setToast("Counter offer could not be set. Please try again or contact support.");
          }

        }, () => { }).then(async () => {
          console.log("Updating data");
          await this.updateData();
        }).then(() => {
          console.log("Done updating data");
          this.offersFromBuyersData = this.allSellOrderData[this.currentIndex].offers;
          console.log("current offersFromBuyersData: ");
          console.log(this.offersFromBuyersData);
        }).then(() => {
          this.updateBalances();
        });

        break;
    }

    return;

  }

  private manageInput(value: any, doFractionCheck): number {
    console.log("value in: " + value);

    if (!value) {
      console.log("Manage Input: Value doesn't exist - abort: ");
      console.log(value);
      return -1;
    }

    if (isNaN(Number(value))) {
      console.log("Not a number");
      console.log(value);
      return -2;
    }

    if (Number(value) < 0) {
      console.log("Negative number");
      console.log(value);
      return -3;
    }

    if (doFractionCheck) {
      if (!Number.isSafeInteger(Number(value))) {
        console.log("Not an integer");
        console.log(value);
        return -4;
      }
    }

    return Number(value);

  }

  private removeCancelledItem() {

    for (let i = 0; i < this.allSellOrderData.length; i++) {
      console.log("this.allSellOrderData[" + i + "]");
      console.log(this.allSellOrderData[i].uid);

      if (this.allSellOrderData[i].uid === this.currentOTCItemUID) {
        this.allSellOrderData[i].hide = true;
        i = this.allSellOrderData.length;

      }
    }

    return;
  }


  private async completeOTCAction(action: string, message: string, uid: string, udata?: { "price": number, "amount"?: number, "Asset"?: string }): Promise<any> {

    if (!udata) udata = { "price": 0, "amount": 0, "Asset": "" };

    console.log("udata: ");

    console.log(JSON.stringify(udata));

    let popup = this.user.createLoadingPopup(message, true);

    popup.present();

    return new Promise((resolve, reject) => {

      this.user.doOTCRequest(action, uid, udata).then((response) => {

        try {
          popup.dismiss();
        } catch (error) {
          console.log("Couldn't dismiss popup");
          console.log(error);
        }

        if (!response) {
          console.log("failed to retrieve market data");
          resolve(null);
        }

        if (response && !response.success && response.code === '1000') {
          this.exitToLoginPage();
          resolve(false);
        }
        console.log("returning to caller function");

        resolve(true);

      }, (response: any) => {

        try {
          popup.dismiss();
        } catch (error) {
          console.log("Couldn't dismiss popup");
          console.log(error);
        }

        if (response.msg) {
          this.user.setToast(response.message);
          resolve(false);
        }
        this.user.setToast("Transaction failed. Please try again later.");

        resolve(false);

      });

    });

  }

  private loadMarketList(type: string): Promise<any> {

    return new Promise(async (resolve, reject) => {

      await this.user.getMarketList(type).then((response) => {

        if (response == null) {
          console.log("Not logged in. Reauthenticate.");
          resolve(null);
          return;
        }

        resolve(response);

      }, (result: any) => {
        resolve(false);
        return;
      });
    });
  }



  private async loadSellOrderData(type: string, asset: string, step: number, limit: number, include: string) {

    if (step < 0) {
      step = 0;
    }

    let data = await this.user.getSellOrderData(type, asset, step, limit, include).then((response) => {

      try {
        this.user.dismissLoadingPopup();
      } catch (error) {
        console.log(error.message);
      }

      if (!response) {
        console.log("failed to retrieve market data");
        return;
      }

      if (response && !response.success && response.code === '1000') {
        this.exitToLoginPage();
        return;
      }

      if (response) {

        //set member ID
        this.session.getUserdata().then((data) => {
          if (data && data.general) {
            this.myMemberID = data.general.MemberId;
          }
        });


        return response;

      }
      return false;

    }, (result: any) => {
      this.user.dismissLoadingPopup();
      this.user.setToast("A network error occurred. Please try again or contact AZUZA support if the problem persists.");
      return;
    });
    return data;
  }

  //calls getWalletBalances to set wallet balances
  private setWalletBalances(): void {
    let wallet_balances: {} = null;

    this.getWalletBalances().then(wallet_data => {
      if (!wallet_data) {
        return;
      }

    }, error => {
      return;
    });
    return;
  }

  //returns wallet balance from global userdata
  private async getWalletBalances(): Promise<any> {

    this.userdata = await this.session.getUserdata();

    return new Promise((resolve, reject) => {
      if (this.userdata) {

        this.wallet_balances = {
          "currency_symbol": this.userdata.Balance.Fiat[0].CurrencySymbol,
          "available_balance": this.userdata.Balance.Fiat[0].Available
        };

        resolve(true);
      } else {

        this.wallet_balances = {
          "currency_symbol": "R",
          "available_balance": 0
        };

        reject(null);
      }
    });
  }

  private handleRowClick(uid: string, userid: string, index: number) {

    console.log("**handleRowClick**");
    console.log("uid: " + uid);
    console.log("userid: " + userid);

    let respCount = 0;

    try {
      respCount = this.allSellOrderData[index].ResponseCount.open ? parseInt(this.allSellOrderData[index].ResponseCount.open) : 0;
    } catch (err) {

    }


    if (userid != this.myMemberID) { //buyer:seller //seller:buyer

      respCount > 0 ? this.getTradeOffers(index, userid, uid, respCount) : this.createOTCOfferBuyOffer(uid, index);
      return;

    }

    if (userid === this.myMemberID) { //current user as buyer or seller

      respCount > 0 ? this.getTradeOffers(index, userid, uid, respCount) : this.confirmCancelMySalesOrder(uid, index);
      return;

    }


    return;
  }

  
  private openSharesList(fab) {
    if(fab) fab.close();
    
    this.primeDataObjects();
    this.fetchSummaryData().then(()=>{
      this.currentPage = 'marketlist';
    });
  }
  


  public listBuyOffersReceived(uid: string, userid: string, index: number) {

  }

  public formatNum(num: number): number {

    if (!num) {
      return 0;
    }

    if (typeof num == 'number') {
      return num;
    }

    if (typeof num == 'string') {
      return parseInt(num);
    }
    else return 0;
  }

  public exitToLoginPage(message?: string) {
    if (!message) { message = "Your session has expired. Please log in again."; }
    this.user.setToast(message);
    this.navCtrl.setRoot(AuthPage);
  }

  private dismissLoader() {
    this.user.dismissLoadingPopup();
  }

  private refresh() {
    this.pollData();
  }

  private closeMarket(fab) {
    fab.close();
    this.navCtrl.setRoot(HomePage);
  }

  getSellerOfferItemClass(index: number) {

    //new offer - no negotiations yet: white star
    if (!this.offersFromBuyersData[index].Counter) {
      return 'text-white';
    }

    //existing offer - seller to respond: red star
    if (this.offersFromBuyersData[index].Counter.length > 0 && this.offersFromBuyersData[index].Counter[0].BS == 'S') {
      return 'danger';
    }

    //existing offer - buyer to respond
    return 'yellow';

  }

  //initialises all market data, loading data for all tabs
  private async initMarket() {
    this.user.createLoadingPopup("Loading market...", true);
    this.primeAllSellOrdersData();
    await this.fetchSPVList();
    await this.fetchMySellOrders();
    await this.fetchMyOffersToPurchase();

    /*.then(() => {
      this.fetchSPVList();
    });*/
    this.user.dismissLoadingPopup();

    return;
  }

  private checkOfferElementExists(index: number): boolean {
    let exists: boolean = false;

    if (this.allSellOrderData[index].hasOwnProperty("offers")) {
      if (this.allSellOrderData[index].offers[0] && Object.keys(this.allSellOrderData[index].offers[0]).length > 0) {
        //console.log(Object.keys(this.allSellOrderData[index].offers[0]).length);
        //console.log(this.allSellOrderData[index]);
        //console.log("true");
        return true;
      }
      return false;
    }

    console.log("false");
    return false;

  }



  ionViewDidLoad() {
    //let thisRef = this;
    this.initMarket();

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
      console.log("Interval Clear Error - OTC Market Main");
      console.log(error);
    }

  }

  private callConsoleLog(index: number) {
    console.log("Index: " + index);
  }

}
