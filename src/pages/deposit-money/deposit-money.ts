import { Component } from '@angular/core';
import { Clipboard } from '@ionic-native/clipboard';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { AuthPage } from '../../pages/auth/auth';

type EFTDepositObject = { "BankAccountName": string, "BankAccountNumber": string, "BankAccountType": string, "BankBranchCode": string, "BankName": string, "BankStreetAddress": string, "BankSwiftCode": string };
type CardDepositObject= { "success": boolean, "code": number, "message": string, "data": { "iApiTransactionId": string } };
type CryptoObject = Array<{ "name": string, "symbol": string }>

type DepositDetails = {"reference": string,"currency": string,"CountryId": string,"amount": string,"fundId": string}

type EFTResponse = { "reference": string, "amount": string, "fundId": string };
type CardResponse = {"iApiTransactionId": string, "amount": string,"fundId": string,"reference": string};
type CryptoResponse = {};


type DepositOptions = {"EFT"?: EFTDepositObject, "Crypto"?: CryptoObject, "CreditCard"?: CardDepositObject, "reference": string, "currency": string, "CountryId": string, "amount": string, "fundId": string };
type DepositObject = { "paymentMethod": string, "depositDetails": { "amount": number, "currency": string, "base": string } };

@IonicPage({
  name: 'page-deposit-money',
  segment: 'deposit-money'
})

@Component({
  selector: 'page-deposit-money',
  templateUrl: 'deposit-money.html'
})

export class DepositMoneyPage {

  /* Working Vars */
  private currentPage: string = "setup";
  private firstLoad: boolean = true;
  private depositDetails: DepositDetails;
  private depositOptions: DepositOptions;
  private depositObject: DepositObject;
  private cryptoOptions: CryptoObject;

  private eftResponse: EFTResponse = null;
  private cardResponse: CardResponse = null;
  private cryptoResponse: CryptoResponse = null;

  private paymentMethods: Array<string> = ["eft", "card", "crypto"];
  private cryptoIcons = [{ "name": "Fraxeum" }, { "name": "Bitcoin" }, { "name": "Bitcoin SV" }, { "name": "Bitcoin Cash" }, { "name": "Ethereum" }, { "name": "Neo" }, { "name": "Monero" }, { "name": "Litecoin" }, { "name": "Ethereum Classic" }] ;

  private test: string = "1";
  private selectedCryptoIndex: number = 0;
  private depositPageHeader: string = "";
  private clipboard: Clipboard;

  /* Raheel se kak 
  general: any;
  showUp: boolean = false;
  cryptocurrency: any;
  relationship: any;
  bank: any;
  amount: number;
  reference: any;
  walletBalance: any;
  showpara: boolean = false;
  hide: boolean = true;
  currencyName: any;
  body: any;
  iPaymentId: any;
  PayNow_link: any;
  iApiTransactionId: any;
  EFT: any;
  CreditCard: any;
  Crypto: any;
  fees: number;
  total: number;
  pay_link: string;
  currencysymbol: any; */
  

  constructor(public navCtrl: NavController, public navparams: NavParams, public user: UserProvider, clipboard: Clipboard) {

    this.clipboard = clipboard;
    this.primeDepositOptionsData();


  }



  private copyToClipboard(fieldname:string, str:string){
    this.clipboard.copy(str);
    this.user.setToast(fieldname + "copied to device clipboard");
    return;
  }

  private getIconPath(iconName: string) {
    return "/assets/icon" + iconName + ".png";
  }



  private updatePaymentMethod(paymentMethodId: number) {
    if (paymentMethodId == null) return;

    switch (paymentMethodId) {
      case 0:
        this.depositObject.paymentMethod = this.paymentMethods[0];
        this.depositObject.depositDetails.currency = "ZAR";
        this.depositObject.depositDetails.base = "ZAR";
        break;
      case 1:
        this.depositObject.paymentMethod = this.paymentMethods[1];
        this.depositObject.depositDetails.currency = "ZAR";
        this.depositObject.depositDetails.base = "ZAR";
        break;
      case 2:
        this.depositObject.paymentMethod = this.paymentMethods[2];
        this.depositObject.depositDetails.base = "FRX";
        this.depositObject.depositDetails.currency = "FRX";
        this.selectedCryptoIndex = 0;
        break;
    }
    return;
  }

  private setCryptoCurrency(symbol: string, index: number) {
    if (!symbol) return;
    console.log(this.depositObject.depositDetails.currency);
    this.depositObject.depositDetails.currency = symbol;
    this.depositObject.depositDetails.base = symbol;
    this.selectedCryptoIndex = index;
    return;
  }

  private toggleCryptoCurrency() {
    if (this.depositObject.paymentMethod != 'crypto') return;

    if (this.depositObject.depositDetails.base != 'ZAR') {
      this.depositObject.depositDetails.base = "ZAR";
    } else this.depositObject.depositDetails.base = this.depositObject.depositDetails.currency;

    return;
  }

  private primeDepositOptionsData() {
    this.depositDetails = {"reference": "","currency": "","CountryId": "","amount": "","fundId": ""};
    this.depositOptions = { "EFT": { "BankAccountName": "", "BankAccountNumber": "", "BankAccountType": "", "BankBranchCode": "", "BankName": "", "BankStreetAddress": "", "BankSwiftCode": "" }, "Crypto": [{ "name": "", "symbol": "" }], "CreditCard": { "success": true, "code": 0, "message": "", "data": { "iApiTransactionId": "" } }, "reference": "", "currency": "", "CountryId": "", "amount": "", "fundId": "" };
    this.depositObject = { "paymentMethod": this.paymentMethods[0], "depositDetails": { "amount": null, "currency": "ZAR", "base": "ZAR" } };
    this.cryptoOptions = [{ "name": "", "symbol": "" }];

  }

  private goHome(){
    this.navCtrl.setRoot('page-home');
  }

  public exitToLoginPage(message?: string) {
    if (!message) { message = "Your session has expired. Please log in again."; }
    this.user.setToast(message);
    this.navCtrl.setRoot(AuthPage);
  }

  private getPaymentMethodType() {
    switch (this.depositObject.paymentMethod) {
      case 'card': return this.paymentMethods[1];
      case 'crypto': return this.paymentMethods[2];
      default: return this.paymentMethods[0];
    }
  }

  private emailBankingDetails(){
    this.user.setToast("The deposit details have been emailed to you!");
  }


  private loadBankingData(): Promise<any> {

    let amount: number = this.depositObject.depositDetails.amount;
    let currency = this.depositObject.depositDetails.currency;

    if (this.firstLoad) {
      this.user.createLoadingPopup("Connecting to AZUZA", true);
    }

    return new Promise((resolve, reject) => {

      this.user.loadBankingOptions(amount, currency).then(async (response) => {

        this.user.dismissLoadingPopup();

        let data = await response;

        if (!data || (!data.success && data.code == "1000") || !(data.data)) {
          this.exitToLoginPage();
          return false;
        }

        this.depositDetails.amount = data.data.amount;
        this.depositDetails.reference = data.data.reference;
        this.depositDetails.currency = data.data.currency;
      
      
       if(data.data.EFT && this.depositObject.paymentMethod === this.paymentMethods[0]){
        this.eftResponse = <EFTResponse>data.data.EFT;
        this.currentPage = "EFT_Final";
        this.depositPageHeader = "Deposit Summary";
        return;
       }

       if(data.data.CreditCard && this.depositObject.paymentMethod === this.paymentMethods[1]){
        //show card payment page
        this.cardResponse = <CardResponse>data.data.CreditCard;
        this.currentPage = "card_step";
        this.depositPageHeader = "Payment summary";
        return;
       }

       if(data.data.Crypto && this.depositObject.paymentMethod === this.paymentMethods[2]){
        this.cardResponse  = <CardResponse>data.data.CreditCard;
        //show crypto payment page
        this.currentPage = "crypto_step";
        this.depositPageHeader = "Crypto Payment Details";
        return;
       }



      });
    })

  }

  private goBack(){
    this.currentPage = "setup";
    this.primeDepositOptionsData();
  }

  private nextStep(){

    this.loadBankingData();

    return;
  }


}
