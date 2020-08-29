import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, AlertController, ActionSheetController, ActionSheet, NavController, NavParams, ToastController, Loading } from 'ionic-angular';

//PAGE COMMON IMPORTS
import { NewModalPage } from '../new-modal/new-modal';
import { UserProvider } from '../../providers/user/user';
import { ModalController } from 'ionic-angular';
import { AuthPage } from '../auth/auth';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { ImageViewerController } from 'ionic-img-viewer';

type FiatObject = {"FundId":string, "SPVNAME": string,"Type": string,"MemberId": string,"Currency": string,"Withdraw": string,"Deposit": string,"Spend": string,"Income": string,"Available": string,"escrow_in": string,"escrow_out": string,"CurrencySymbol": string,"CurrencySymbolPos": string,"CurrencyName": string,"LocalCurrency": string,"LocalCurrencySymbol": string,"LocalCurrencySymbolPos": string,"Extra": string,"RecStatus": string,"locale_id": string,"currency_code": string };
type AssetObject = {"FundId": string,"SPVNAME": string,"Type": string,"MemberId": string,"Currency": string,"Withdraw": string,"Deposit": string,"Spend": string,"Income": string,"Available": string,"escrow_in": string,"escrow_out": string,"CurrencySymbol": string,"CurrencySymbolPos": string,"CurrencyName": string,"LocalCurrency": string,"LocalCurrencySymbol": string,"LocalCurrencySymbolPos": string,"Extra": string,"RecStatus": string,"locale_id": string, "currency_code": string,"Lock": boolean,"LockEnd": string,"LegalId": string,"market": string,"share_value": string,"LegalMemberId": string,"Stats":{ "totalOnOffer": string,"totalBids": string,"offerMin":string,"offerMax":string,"timestamp": string }};
type ProductImages = Array<{"src": string, "name": string, "description": string}>;
type OfferVitals = {"LegalId": string,  "StartDate": string,  "EndDate": string,  "TokensIssued": string,  "TokensAvailable": string,  "TokenBasePrice": string,  "SalesCommission": string,  "TokenSalesPrice": string,  "TokensSold": string,  "TotalDays": string,  "DaysLeft": string,  "HoursLeft": string,  "MinsLeft": string,  "SecondsLeft": string,  "TotalBuyers": string,  "InEscrow": string,  "requestTimeStamp": string}

@IonicPage({
	name: 'investment-detail-2'
})

@Component({
	selector: 'page-investment-detail-2',
	templateUrl: 'investment-detail-2.html'
})
export class InvestmentDetailPage2 {

	companyName: any;

	param: number;
	images: any;
	descrption: any;
	profileName: any;
	show: boolean = false;
	data1: any;

	propertyItem: any;
	propertyName: any;
	properties: Array<any>;
	yield: any;
	data: any;
	timezero: any;
	show1: boolean = true;
	show2: boolean = false;
	check: boolean;
	videoPlayer: YoutubeVideoPlayer;
	sharesToggle: boolean;
	product_images: ProductImages;
	_imageViewerCtrl: ImageViewerController;

	
	private fiatObjects: Array<FiatObject>;
	private assetObjects: Array<AssetObject>;
	private vitals: OfferVitals;

	private fiatAmount: number;
	private sharesAmount: number;
	private amount: number;
	private sharePrice: number;

	private showBuyPopup: boolean;

	private percentComplete: number;
	private strokeColour: string;

	private hoursToGo: number;
	private daysToGo: number;
	private ttg: number;

	private buyStep: number;

	private legalId: number;

	

	//buy-wizard

	

	private termsAccepted: {
		"terms1": boolean,
		"terms2": boolean,
		"terms3": boolean,
		"terms4": boolean
	}


	private transactionObj: {
		"totalShares": number,
		"totalValue": number,
		"fees": number,
		"vehicle": string,
		"terms": boolean,
		"confirm": boolean
	};


	private paymentStep: number = 1;


	@ViewChild("shares") shares: ElementRef;
	@ViewChild("fiat") fiat: ElementRef;


	constructor(public actionSheetCtrl: ActionSheetController, public alert: AlertController,
		public user: UserProvider, public navCtrl: NavController,
		public navParams: NavParams, public toastCtrl: ToastController,
		youtube: YoutubeVideoPlayer, public modalCtrl: ModalController,
		imageViewerCtrl: ImageViewerController) {

		this.primeObjects();

		this.setProductImages();

		this.legalId = 9; //THIS IS THE INVESTMENT OPPORTUNITY LEGAL ID

		this.percentComplete = 0;

		this.strokeColour = "#ffffff";

		this.termsAccepted = {
			"terms1": false,
			"terms2": false,
			"terms3": false,
			"terms4": false
		}

		this.transactionObj = {
			"totalShares": 0,
			"totalValue": 0.00,
			"fees": 0.00,
			"vehicle": "s12j",
			"terms": false,
			"confirm": false
		};

		this.getLatestVitals();

		this._imageViewerCtrl = imageViewerCtrl;

		this.videoPlayer = youtube;

		this.showBuyPopup = false;

		this.sharesToggle = true; //starts by accepting #Shares

		this.amount = 0;

		this.sharePrice; //need to fetch this share price

		this.fiatAmount = this.transactionObj.totalValue;

		this.sharesAmount = this.transactionObj.totalShares;

		this.hoursToGo = 0;

		this.daysToGo = 60;

		this.companyName = "Greenterprises";

		this.ttg = this.hoursToGo;

		if (this.percentComplete >= 100) {
			this.ttg = 0;
		}

		this.buyStep = 1;

	}

	acceptTerms(item: number) {
		switch (item) {
			case 1: {
				this.termsAccepted.terms1 = !this.termsAccepted.terms1;
				break;
			}
			case 2: {
				this.termsAccepted.terms2 = !this.termsAccepted.terms2;
				break;
			}
			case 3: {
				this.termsAccepted.terms3 = !this.termsAccepted.terms3;
				break;
			}
			case 4: {
				this.transactionObj.vehicle = "s12j";
				break;
			}
			case 5: {
				this.transactionObj.vehicle = "spv";
				break;
			}
			case 6: {
				this.termsAccepted.terms4 = !this.termsAccepted.terms4;
				break;
			}

		}

	}

	allTermsChecked(): boolean {
		if (this.termsAccepted.terms1 &&
			this.termsAccepted.terms2 &&
			this.termsAccepted.terms3 &&
			this.termsAccepted.terms4) {
			this.transactionObj.terms = true;
			return true;
		}
		return false;
	}

	nextStep(fab: any, dir: number) {
		if (fab) {
			fab.close();
		}

		if (this.buyStep === 1 && this.transactionObj.totalShares < 1) {
			this.user.setToast("Your investment amount is too low. You must buy at least one share.");
			return;
		}

		if (dir > 0) {
			if (this.buyStep + 1 > 3) {
				this.sendTransaction(); return;

			}
			++this.buyStep;
			return;
		} else {
			if (this.buyStep - 1 < 1) {
				this.buyStep = 1;
				return false;
			}
			--this.buyStep;
		}
	}

	updateTransactionMsg(message: string) {
		this.user.updateLoaderMessage(message);
	}

	sendTransaction() {
		this.showBuyPopup = false;
		this.user.createLoadingPopup("Buying shares...", true);
		this.doBuyProcess();
	}


	getStrokeColor(): string {
		console.log("this.vitals.DaysLeft: " + this.vitals.DaysLeft);

		if (!this.vitals.DaysLeft || !this.vitals.SecondsLeft || !this.vitals.TotalDays) {
			console.log("getDaysLeft evaluated false");
			return "#ffffff";

		}

		if (parseInt(this.vitals.DaysLeft) <= 0) {
			console.log("getDaysLeft evaluated <= 0");
			return "red";

		}

		let secsLeft: number = parseInt(this.vitals.SecondsLeft);

		secsLeft = 1000;
		let totalDays: number = parseInt(this.vitals.TotalDays);

		let timeLeftPercent: number = (secsLeft / (totalDays * 24 * 60 * 60)) * 100;

		if (timeLeftPercent < 10) {
			console.log("getDaysLeft evaluated < 10");
			return "#ff1100";
		}

		if (timeLeftPercent < 70) {
			console.log("getDaysLeft evaluated < 70");
			return "#9fff00";
		}

		//return #ff1199 by default
		console.log("getDaysLeft returned default");
		return "#ff1199";

	}

	getLatestVitals() {

		this.user.requestProductVitals(this.legalId).then(async (response) => {

			if (!response) {
				console.log("Success = false");
				return;
			}
			if (response && response.data) {
				if (response.data.state === 0) {
					this.exitToLoginPage(); return;
				}

				let vitals: OfferVitals = await response.data;

				this.setVitalVariables(vitals[0]);

				//set daysLeft to 0 if daysLeft returns negative number
				if (this.vitals && this.vitals.DaysLeft) {
					if (parseInt(this.vitals.DaysLeft) < 1) {

						this.vitals.DaysLeft = "0";

					}
				}

				this.setStrokeColour();

			}
			
		}).then(() => {

			//refreshes this user's detailed account balances

			this.user.getAccountBalances().then(async (data) => {

				if (data.data) {
					if(data.data.Fiat){
						this.fiatObjects = await data.data.Fiat;
					} 
					if(data.data.Asset){
						this.assetObjects = await data.data.Asset;
					}
					return;
				}  else {
					console.log("ERROR FETCHING BALANCES");
					console.log(data);
					this.user.setToast("Unable to update balances and asset totals.");

				}
			});
		})
	}

	setStrokeColour() {
		if (!this.vitals.DaysLeft || !this.vitals.TotalDays) {
			return false;
		}

		let daysLeft: number = parseInt(this.vitals.DaysLeft);

		let totalDays: number = parseInt(this.vitals.TotalDays);

		if (totalDays === 0) {
			this.percentComplete = 0;
			return;
		}

		this.percentComplete = ((totalDays - daysLeft) / totalDays) * 100;

		this.strokeColour = this.getStrokeColor();

	}

	private primeObjects(){
		this.fiatObjects = [{"FundId":"", "SPVNAME": "","Type": "","MemberId": "","Currency": "ZAR","Withdraw": "","Deposit": "","Spend": "","Income": "","Available": "0.00","escrow_in": "","escrow_out": "","CurrencySymbol": "","CurrencySymbolPos": "","CurrencyName": "","LocalCurrency": "","LocalCurrencySymbol": "","LocalCurrencySymbolPos": "","Extra": "","RecStatus": "","locale_id": "","currency_code": "" }];
		this.assetObjects = [{"FundId": "","SPVNAME": "","Type": "","MemberId": "","Currency": "","Withdraw": "","Deposit": "","Spend": "","Income": "","Available": "","escrow_in": "","escrow_out": "","CurrencySymbol": "","CurrencySymbolPos": "","CurrencyName": "","LocalCurrency": "","LocalCurrencySymbol": "","LocalCurrencySymbolPos": "","Extra": "","RecStatus": "","locale_id": "", "currency_code": "","Lock": true,"LockEnd": "","LegalId": "","market": "","share_value": "","LegalMemberId": "","Stats":{ "totalOnOffer": "","totalBids": "","offerMin":"","offerMax":"","timestamp": "" }}];
		this.vitals = {"LegalId": this.legalId + "",  "StartDate": "",  "EndDate": "",  "TokensIssued": "",  "TokensAvailable": "",  "TokenBasePrice": "",  "SalesCommission": "",  "TokenSalesPrice": "",  "TokensSold": "",  "TotalDays": "",  "DaysLeft": "",  "HoursLeft": "",  "MinsLeft": "",  "SecondsLeft": "",  "TotalBuyers": "",  "InEscrow": "",  "requestTimeStamp": ""};
		return;
	}

	


	setVitalVariables(data: any) {
		if (!data) {
			return false;
		}

		this.vitals = data;
		this.sharePrice = +this.vitals.TokenSalesPrice;

		if (this.vitals.DaysLeft) {
			this.daysToGo = parseInt(this.vitals.DaysLeft);
			console.log("days to go: " + this.daysToGo);
		}

	}




	prevStep(fab: any) {
		if (fab) {
			fab.close();
		}

		if (this.buyStep === 1) {
			this.navCtrl.pop();

		} else {
			this.buyStep--;
		}
		return;
	}


	getSubtitle(type: string): string {
		if (type === 'time') {
			if (this.percentComplete >= 100) {
				return "";
			}
			return this.hoursToGo ? "hours" : "days";
		} else {
			if (this.percentComplete >= 100) {
				return "SOLD OUT"
			} else if (this.percentComplete >= 50) {
				return "Selling fast!"
			} else if (this.percentComplete > 0) {
				return "Brand new"
			} else {
				return ""
			}
		}
	}

	showBalanceExceeded() {
		let message: string = "Amount entered exceeds funds available";
		this.user.setToast(message);

	}

	showSetMax() {
		if (this.fiatObjects[0].Available
			&& +this.fiatObjects[0].Available > 0
			&& +this.fiatObjects[0].Available > this.sharePrice) {
			return true;
		}
		return false;
	}


	calcAmount(): any {

		if (this.sharesAmount < 0 && this.fiatAmount < 0) {
			return;
		}

		if (this.sharesToggle) {
			if (isNaN(this.sharesAmount)) return;

			if (this.sharesAmount === 0) { return; }
			this.transactionObj.totalShares = this.sharesAmount;
			this.transactionObj.totalValue = this.sharesAmount * this.sharePrice;
			this.fiatAmount = this.transactionObj.totalValue;
			if (this.fiatAmount > +this.fiatObjects[0].Available) {

				console.log("calcamount(1)");
				console.log("Fiat amount: " + this.fiatAmount);
				console.log("Wallet bal : " + this.fiatObjects[0].Available);

				this.showBalanceExceeded();
			}

		} else {
			if (isNaN(this.fiatAmount)) return;

			if (this.fiatAmount === 0) { return; }

			this.transactionObj.totalValue = this.fiatAmount;
			this.transactionObj.totalShares = this.fiatAmount / this.sharePrice;
			this.sharesAmount = Math.floor(this.transactionObj.totalShares);

			if (this.fiatAmount > +this.fiatObjects[0].Available) {
				console.log("calcamount(2)");
				console.log("Fiat amount: " + this.fiatAmount);
				console.log("Wallet bal : " + this.fiatObjects[0].Available);
				this.showBalanceExceeded();
			}

		}
		return;
	}

	public exitToLoginPage(message?: string) {
		if (!message) { message = "Your session has expired. Please log in again."; }
		this.user.setToast(message);
		this.navCtrl.setRoot(AuthPage);
	  }


	setFiatWalletBalance() {
		if (this.sharesToggle) { //shares input - calculate shares for available balance
			if (+this.fiatObjects[0].Available <= 0 || this.sharePrice <= 0) {
				this.sharesAmount = 0;
				return;
			}
			let numShares = +this.fiatObjects[0].Available / this.sharePrice;
			this.sharesAmount = Math.floor(numShares);

		} else {
			if (!this.fiatObjects[0].Available || +this.fiatObjects[0].Available <= 0) {
				this.fiatAmount = 0;
				return;
			}

			let numShares = +this.fiatObjects[0].Available / this.sharePrice;
			this.sharesAmount = Math.floor(numShares);

			this.fiatAmount = this.sharesAmount * this.sharePrice;

		}

	}

	toggleBuyPopupVisibility(): void {
		this.showBuyPopup = !this.showBuyPopup;

	}


	toggleShareToggle(): void {
		this.calcAmount();
		this.sharesToggle = !this.sharesToggle;

	}

	setVehicle(value: string) {
		this.transactionObj.vehicle = value;
	}

	playVideo(id: number): void {
		switch (id) {
			case 2: { this.videoPlayer.openVideo('rP4f7gEK9OQ'); break; }
			case 3: { this.videoPlayer.openVideo('Wk59lrXhNfI'); break; }
			case 4: { this.videoPlayer.openVideo('Wk59lrXhNfI'); break; }
			case 5: { this.videoPlayer.openVideo('Wk59lrXhNfI'); break; }
		}

	}

	doBuyProcess() {
		this.user.updateLoaderMessage("Reserving your shares");

		if (!this.transactionObj.totalShares) {
			return false;
		}

		let numShares: number = 0;

		if (typeof this.transactionObj.totalShares != "number") {
			try {
				numShares = parseInt(this.transactionObj.totalShares);
			} catch (err) {
				return false;
			}
		}

		let params = {
			"type": "buy",
			"legalid": this.legalId,
			"amount": numShares,
			"termsaccepted": this.transactionObj.terms ? 1 : 0
		}
		console.log("PARAMS:" + JSON.stringify(params));

		this.user.doBuyShares(params).then(success => {
			this.user.updateLoaderMessage("Share sale complete!");

			setTimeout(() => {
				this.user.dismissLoadingPopup();
				this.user.setToast("Yay! Your shares have been reserved in your escrow wallet.");

				setTimeout(() => {
					this.navCtrl.popToRoot();

				}, 100);

			}, 3150);

		}, failed => {
			setTimeout(() => {
				this.user.dismissLoadingPopup();
				this.user.setToast("Oh no, something went wrong. Please try again. If the problem continues please contact support for assistance.");

			}, 1500);

		});

	}


	private setProductImages(){
		this.product_images = [
			{
				'src': 'assets/img/client-2/product/1.png',
				'name': 'Product 1',
				'description': 'Lettuce'
			},
			{
				'src': 'assets/img/client-2/product/2.png',
				'name': 'Product 2',
				'description': 'Comparative size'
			},
			{
				'src': 'assets/img/client-2/product/3.png',
				'name': 'Product 3',
				'description': 'Aquaponic field'
			},
			{
				'src': 'assets/img/client-2/product/4.png',
				'name': 'Product 4',
				'description': 'Infant plant'
			},
			{
				'src': 'assets/img/client-2/product/5.png',
				'name': 'Product 5',
				'description': 'Red lettuce'
			},
			{
				'src': 'assets/img/client-2/product/6.png',
				'name': 'Product 6',
				'description': 'Biofilter'
			}
		];
	}




	ngOnInit() {

	}


	doRefresh(refresher) {

		//this.showAlldata();

		setTimeout(() => {

			refresher.complete();
		}, 2000);
	}



}
