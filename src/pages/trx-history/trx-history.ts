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
import { resolveReflectiveProviders } from '@angular/core/src/di/reflective_provider';

//type TransactionItem = { "FundDetId": string, "FundId": string, "IE": string, "DC": string, "Debit": string, "Credit": string, "Currency": string, "Total": string, "MainCurrency": string, "MainAmount": string, "Fees": string, "title": string, "FundStatus": string, "Status": string, "txID": string, "TransDate": string, "Code": string, "TypeId": string, "Type": string, "RecStatus": string, "TimeStamp": string, "LastEditBy": string, "ModifyDate": string, "Extra": string, "Fundtitle": string };
type EventDescription = { "token": string, "currency": string, "SPV": string };
type TransactionEventList = { "withdraw"?: Array<TransactionItem>, "transfer"?: Array<TransactionItem>, "Escrow Release"?: Array<TransactionItem>, "deposit"?: Array<TransactionItem>, "sell"?: Array<TransactionItem>, "buy"?: Array<TransactionItem>, "fees"?: Array<TransactionItem> };
type TransactionItem = { "Amount": string, "Code": string, "Credit": string, "Currency": string, "CurrencyId": string, "DC": string, "Debit": string, "Description": EventDescription, "Escrow": string, "Event": string, "Extra": string, "FromWallet": string, "FromWalletAddress": string, "Fundtitle": string, "IE": string, "Id": string, "LastEditBy": string, "ModifyDate": string, "Name": string, "RecStatus": string, "SG": string, "Status": string, "TimeStamp": string, "Type": string, "TypeId": string, "WalletAddress": string, "WalletId": string, "txID": string };
type HistoryItem = { "trxEvent": string, "trxHeader": string, "trxDescription": string, "trxValue": string, "trxIcon": string, "trxTimestamp": string, "trxId": string, "showDetail":boolean, "fromAddress"?:string, "fromLabel"?:string, "toAddress"?:string, "toLabel"?:string };
type FormattedTrxEventList = { "withdraw"?: Array<HistoryItem>, "transfer"?: Array<HistoryItem>, "Escrow Release"?: Array<HistoryItem>, "deposit"?: Array<HistoryItem>, "sell"?: Array<HistoryItem>, "buy"?: Array<HistoryItem>, "fees"?: Array<HistoryItem> };
type AccountData = {"WalletId":string,"Name":string,"NodeAddress":string,"EscrowAddress":string,"MS":string,"Status":string,"RecStatus":string};

@IonicPage()
@Component({
  selector: 'page-trx-history',
  templateUrl: 'trx-history.html',
})
export class TrxHistoryPage {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  private firstEntry: boolean = true;

  private actionSheet: ActionSheet;

  private intervalId: number;

  private EOList: boolean = false;

  private explorer_url: string = "https://explorer.fraxeum.com/Fraxeum%20Explorer/tx/";

  /* Transaction list specific variables */
  private noContentMessage: string = "Loading...";
  private noTransactionsMessage: string = "This account has no transaction history";

  private transactionList: TransactionEventList;
  private formattedEventList: FormattedTrxEventList;
  private eventKeys: Array<string>;

  private selectedWalletId: string;
  private currentSelectedIndex: number;
  private showAccountList: boolean = false;
  private showTransactionList: boolean = false;
  private accountList: Array<AccountData> = null;
  private showNoTransactionsMessage: boolean;

  private walletName = "My Wallet";

  constructor(public navCtrl: NavController, public navParams: NavParams, public user: UserProvider,
    public modalCtrl: ModalController, public alertController: AlertController, public session: SessionProvider,
    public actionSheetCtrl: ActionSheetController) {

    this.resetPagination();
    this.primeDataObjects(true);
  }

  private toggleView(){
    if(!this.showAccountList && !this.showTransactionList){
      this.showAccountList = true; 
      return;
    }

    this.showAccountList = !this.showTransactionList;
  }


    //seller withdrawing own sales order
  async addWallet(uid: string, index: number, asset: string) {


    const alert = this.alertController.create({
      title: 'New Wealth Wallet',
      message: 'Give your new Wealth Wallet a descriptive name. Select <i>Next</i> to continue.',
      inputs: [
        {
          name: 'Name',
          placeholder: "Max length 50"
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
            if(!data.Name || data.Name.length > 50){
              if(!data.Name) { this.user.setToast("Your wallet name cannot be blank."); return;}
              this.user.setToast("Your wallet name cannot be longer than 50 letters and or numbers.");
              return;
            }
            if(!data.Name.match(new RegExp('^[a-zA-Z0-9\\-\\_\\s]+$'))){
              this.user.setToast("Your wealth wallet name should consist of only letters, numbers, space, -, and _");
              return;
            }
            this.createWallet(data.Name);
            return true;
          }
        }
      ]
    });

    await alert.present();
  
  }

  private createWallet(name:string){
    return new Promise((resolve, reject)=>{
      this.user.createNewWallet(name).then((response)=>{
        this.primeDataObjects();
        this.user.createLoadingPopup();
        this.initAccountList();
      },(error)=>{
        console.log("ERROR: Create  Wallet");
        console.log(error);
      });
    });
    console.log("Hello wallet: "+name);
  }

  //seller withdrawing own sales order
  async showWalletOptions(index: number) {
    console.log("INDEX==>"+index);

    //this.selectedWalletId = this.accountList[index].WalletId;
    //this.currentSelectedIndex = index;

    let actionSheet = this.actionSheetCtrl.create({
			title: 'Options',
			buttons: [
				{
					text: 'Show transactions',
					handler: () => {
						this.loadTransactionData(null, false, index);
						return;
					}
				},
				{
					text: 'Show escrow details',
					handler: () => {
						this.loadTransactionData(null, true, index);
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

		console.log(actionSheet);

		await actionSheet.present();
  }



  private getSellPrice(index: number): number {
    let sellprice: number = null;

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

  private back(fab){
    if(fab) fab.close();
    this.primeDataObjects(false);

    console.log(this.accountList);
    
  }

  private primeDataObjects(resetAccountList?:boolean) {
    
    this.walletName = "My Wallet";
    
    this.eventKeys = null;
    this.showNoTransactionsMessage = false;
    this.showTransactionList = false;
    this.showAccountList = true;
    this.currentSelectedIndex = 0;
    this.selectedWalletId = null;
    this.accountList = resetAccountList ? null : this.accountList;
    this.transactionList = null;
    this.formattedEventList = null;
    this.formattedEventList = { "withdraw": new Array(), "transfer": new Array(), "Escrow Release": new Array(), "deposit": new Array(), "sell": new Array(), "buy": new Array(), "fees": new Array() };
  }


  private resetPagination() {
    this.pagination = {
      "transactionlist": {
        "page": 0,
        "limit": 30
      }
    };
  }


  private async loadData(infs: any): Promise<any> {
    console.log("this is event: " + event);
    console.log(event);

    this.infiniteScroll = infs;

    return new Promise((resolve, reject) => {

      this.loadTransactionData(this.selectedWalletId, false, -1).then(() => {
        

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

  }


  private convertDate(dateStr:string) {
    return Date.parse(dateStr);
  }

  /*
  private async pollData() {
    this.loadTransactionData().then(() => { }, () => { });
    return;
  }
*/
  private async loadAccountList(): Promise<any> {
    
    return new Promise((resolve, reject) => {

      this.fetchAccountList().then((data) => {

        if (!data) {
          reject(null);
          return;
        }
        console.log("Account List received: ");
        console.log(data);

        resolve(data.data);

        
      }, (error)=>{
        reject(null);

      });
    });
  }


  private makeWalletName(isEscrow:boolean){
    
    let name = (this.currentSelectedIndex === 0) ? "Main Wallet" : this.accountList[this.currentSelectedIndex].Name;

    name += isEscrow ? " (Escrow)" : "";

    return name;
  }
  
  private async loadTransactionData(walletid:string, isEscrow: boolean, index:number, dir?: string, event?: any): Promise<any> {

    this.eventKeys = null;

    this.currentSelectedIndex = (index > -1) ? index : 0;
    
    this.selectedWalletId = (walletid != null)  ? walletid : this.accountList[this.currentSelectedIndex].WalletId;
    
/*
    if (dir && (dir === "bwd")) {
      this.pagination.transactionlist.page--;
    } else this.pagination.transactionlist.page++;
*/
    return new Promise((resolve, reject) => {
      this.user.createLoadingPopup("Fetching account data...");
      this.transactionList = null;
      this.showAccountList = false;
      this.showTransactionList = true;

      this.fetchListData(this.selectedWalletId, isEscrow).then((data: TransactionEventList) => {
        this.walletName = this.makeWalletName(isEscrow);
        this.user.dismissLoadingPopup();

        if (!data) {
          reject(null);
          return;
        }

        if ((Object.keys(data)).length < 1) {
          this.EOList = true;
          this.showTransactionList = false;
          this.showNoTransactionsMessage = true;
          resolve(false);
          return;
        }

        this.formatTrxList(data);
        
        resolve(true);

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

  private async fetchAccountList(): Promise<any> {

    return new Promise((resolve, reject) => {

      this.user.getAccountList("finance").then(async (data) => {

        if (!data || (!data.success && data.code == "1000")) {
          this.exitToLoginPage();
          resolve(false);
        }


          resolve(data);
      

      }, (data) => {
        console.log("getAccountList rejected promise");

      });

    });

  }


  private async fetchListData(walletid: string, isEscrow: boolean): Promise<any> {

    return new Promise((resolve, reject) => {

      this.user.getTransactionList("finance", this.pagination.transactionlist.limit, this.pagination.transactionlist.page, walletid, isEscrow).then(async (data) => {

        this.user.dismissLoadingPopup();

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

      }, (data) => {
        console.log("getTransactionList rejected promise");

      });

    });

  }

  /*
  returns null if input data has no transaction records
  */
  private formatTrxList(data: TransactionEventList) {

    let eventArray: Array<TransactionItem> = null;
    let key: string = "";

    this.eventKeys = Object.keys(data);
    
    if(this.eventKeys.length === 0){
      this.showNoTransactionsMessage = true;
      return;
    }
    console.log("this.eventKeys:");
    console.log(this.eventKeys);

    this.eventKeys.forEach(element => {
      
      

      eventArray = data[element];
      console.log("eventArray:");
      console.log(eventArray);

      eventArray.forEach(async transactionItem => {
        let count = -1;
        count++;

        //skips transactions where there is no blockchain reference
       await this.createItem(transactionItem).then(async (item: HistoryItem) => {
            
        await this.formattedEventList[element].push(item);

            console.log("this.formattedEventList["+element+"] = ");
            console.log(this.formattedEventList[element]);
        }, (error)=>{
          console.log("Error: No Transaction Id provided for eventKeys["+element+"]["+count+"]");
        });

        

      });
    });

  }

  private toggleDetail(event:string, id: number){
    this.formattedEventList[event][id].showDetail = !this.formattedEventList[event][id].showDetail;
  }

  //returns null if no blockchain transaction ID is present
  private createItem(item: TransactionItem): Promise<HistoryItem> {

    return new Promise((resolve, reject) => {

      if (!item.txID || !(item.txID.length > 0)) { item.txID = this.selectedWalletId ? this.selectedWalletId : "baRo911vAeab761bmaTBrVVz"  }; //txID bug hack

      let eventType = item.Event;
      let formattedItem: HistoryItem = { "trxEvent": "", "trxHeader": "", "trxDescription": "", "trxValue": "", "trxIcon": "", "trxTimestamp": "", "trxId": "", "showDetail": false };

      formattedItem.trxEvent = item.Event;
      formattedItem.trxId = item.txID;
      formattedItem.trxTimestamp = item.TimeStamp;
      // "trxEvent":string, "trxHeader":string,"trxDescription":string,"trxValue":string, "trxIcon":string, "trxTimestamp":string, "trxId":string

      switch (eventType) {
        case "withdraw": {
          formattedItem.trxHeader = "Withdrawal";
          formattedItem.trxDescription = "Withdawn " + this.makeTrxValue(item.Currency, item.Amount) + " to bank account"
          formattedItem.trxValue = this.makeTrxValue(item.Currency, item.Amount, item.DC, true);
          formattedItem.trxIcon = "ios-arrow-round-back";
          break;
        }
        case "transfer": {
          formattedItem.trxHeader = "Transfer";
          formattedItem.trxDescription = "Transferred " + this.makeTrxValue(item.Currency, item.Amount) + " to " + item.WalletAddress;
          formattedItem.trxValue = this.makeTrxValue(item.Currency, item.Amount, item.DC);
          formattedItem.trxIcon = "ios-arrow-round-forward";
          formattedItem.fromAddress = item.FromWalletAddress;
          formattedItem.toAddress = item.WalletAddress;
          formattedItem.fromLabel = "From:";
          formattedItem.toLabel = "To" + ((item.Status === "E") ? " escrow" : "") + ":";
          break;
        }
        case "Escrow Release": {
          formattedItem.trxHeader = "Released";
          formattedItem.trxDescription = "Reserved asset released";
          formattedItem.trxValue = this.makeTrxValue(item.Currency, item.Amount, item.DC);
          formattedItem.trxIcon = "ios-checkbox-outline";
          formattedItem.fromAddress = item.FromWalletAddress;
          formattedItem.toAddress = item.WalletAddress;
          formattedItem.fromLabel = "From escrow:";
          formattedItem.toLabel = "To:";
          break;
        }
        case "deposit": {
          formattedItem.trxHeader = "Deposit";
          formattedItem.trxDescription = "Cash deposit received";
          formattedItem.trxValue = this.makeTrxValue(item.Currency, item.Amount, item.DC, true);
          formattedItem.trxIcon = "ios-arrow-round-down";
          break;
        }
        case "sell": {
          formattedItem.trxHeader = "Asset sale";
          formattedItem.trxDescription = item.Description.SPV + " shares" + ((item.Status === "E") ? " (escrow)" : "");
          formattedItem.trxValue = this.makeTrxValue(item.Currency, item.Amount, item.DC, true);
          formattedItem.trxIcon = "ios-pricetag";
          formattedItem.fromAddress = item.FromWalletAddress;
          formattedItem.toAddress = item.WalletAddress;
          formattedItem.fromLabel = "From:";
          formattedItem.toLabel = "To" + ((item.Status === "E") ? " escrow" : "") + ":";
          break;
        }
        case "buy": {
          formattedItem.trxHeader = "Asset purchase";
          formattedItem.trxDescription = item.Description.SPV + " shares";;
          formattedItem.trxValue = this.makeTrxValue(item.Currency, item.Amount, item.DC, true);
          formattedItem.trxIcon = "ios-remove-circle";
          formattedItem.fromAddress = item.FromWalletAddress;
          formattedItem.toAddress = item.WalletAddress;
          formattedItem.fromLabel = "From:";
          formattedItem.toLabel = "To" + ((item.Status === "E") ? " escrow" : "") + ":";
          break;
        }
        case "fees": {
          formattedItem.trxHeader = "Transaction fees";
          formattedItem.trxDescription = "Transaction: " + item.txID.slice(item.txID.length - 10);
          formattedItem.trxValue = this.makeTrxValue(item.Currency, item.Amount, item.DC);
          formattedItem.trxIcon = "md-funnel";
          formattedItem.fromLabel = "From:";
          formattedItem.fromAddress = item.FromWalletAddress;
          break;
        }
      }

      resolve(formattedItem);
    });


  }

  

  private shortenString(longStr:string):string{
    if(!longStr) return "";
    return longStr.substr(0,10)+"...";
  }

  private makeTrxValue(currency: string, amount: string, credebt?: string, toFixed?: boolean): string {
    let trxValue: string = "";
    let fixed = toFixed ? true : false;

    trxValue = (currency === "ZAR") ? "R " + ((fixed) ? (+amount).toFixed(2).toLocaleString() : amount) : ((fixed) ? (+amount).toFixed(2).toLocaleString() : amount) + " " + currency;
    console.log("Calcuted trxValue: " + trxValue);

    if (credebt) trxValue = (credebt === "D") ? "-" + trxValue : "+" + trxValue;
    return trxValue;
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

    if (type != "I" && orginal_title === "Fees") {
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

  private initAccountList(){
    this.loadAccountList().then((data:Array<AccountData>)=>{

      if(data && data.length === 1){
        this.loadTransactionData(data[0].WalletId, /*isEscrow*/ false, /*selectedIndex*/-1).then((response)=>{
          this.selectedWalletId = data[0].WalletId;
          this.showTransactionList = true;
          
          return;
        }, (error)=>{
          console.log("Error fetching transaction data");
        });
      }

      if(data.length > 1){
        this.showAccountList = true;
        this.user.dismissLoadingPopup();
        this.accountList = data;
        return;
      }

    }, (error)=>{
      console.log("Error: AccountList returned nothing");
    });
  }



  ionViewDidLoad() {
    //let thisRef = this;

    this.user.createLoadingPopup();
    this.initAccountList();
    

  }
}
