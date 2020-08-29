import { Component, ChangeDetectorRef, Inject } from '@angular/core';
import { ActionSheetController, IonicPage, Events, LoadingController, AlertController, NavController, MenuController, ToastController, PopoverController } from 'ionic-angular';

//PAGE COMMON IMPORTS
import { NewModalPage } from '../new-modal/new-modal';

import { UserProvider } from '../../providers/user/user';
import { ModalController } from 'ionic-angular';

import { SharedBuywizardComponent } from '../../components/components.module';
import { OtcMarketMainPage } from "../otc-market-main/otc-market-main";
import { AuthPage } from '../../pages/auth/auth';
import { SessionProvider } from '../../providers/session/session';

import { Storage } from '@ionic/storage';


@IonicPage({
	name: 'page-home',
	segment: 'home',
	priority: 'high'
})

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})

export class HomePage {

	deals: Array<any>;

	searchKey: string = "";
	check: boolean;
	length: any;
	lang: any;
	loader: any;

	userName: string;

	userdata = null;

	private currentOTCItemUID: string;


	public shares: any[];
	public money: any[];

	private ccclass: string;
	private isInitialLoad: boolean = true;

 	private showBuyPopup = false;

	private buyWizard: SharedBuywizardComponent;

	private showShares: boolean = true;
	private actionSheetTransition;
	private done_loading: boolean = false;


	constructor(public nav: NavController, 
		public loadingCtrl: LoadingController, public toastCtrl: ToastController, public alertController: AlertController,
		public userService: UserProvider, public events: Events, public menuCtrl: MenuController,
		public popoverCtrl: PopoverController, public session: SessionProvider, public modalCtrl: ModalController, 
		private changeRef: ChangeDetectorRef, public buyWiz: SharedBuywizardComponent, public actionSheetCtrl: ActionSheetController, 
		@Inject(SessionProvider) public storage: Storage) {

		this.buyWizard = buyWiz;

		this.menuCtrl.swipeEnable(true, 'authenticated');

		this.menuCtrl.enable(true);
		this.session = session;

	}

	private shareViewCarousel(index?: number, name?: string) {

		if (name) {

			switch (name) {
				case 'market':
					this.shares[index].showDetail = false;
					this.shares[index].showMarket = true;
					this.shares[index].showShares = false;
					break;
				case 'details':
					this.shares[index].showDetail = true;
					this.shares[index].showMarket = false;
					this.shares[index].showShares = false;
					break;
			}
			return;
		}

		//show detail
		if (!this.shares[index].showMarket && !this.shares[index].showDetail) {
			this.shares[index].showMarket = false;
			this.shares[index].showDetail = true;
			this.shares[index].showShares = false;
			return;
		}
		//show market
		if (this.shares[index].showDetail) {
			this.shares[index].showDetail = false;
			this.shares[index].showMarket = true;
			this.shares[index].showShares = false;
			return;
		}
		//hide both
		this.shares[index].showDetail = false;
		this.shares[index].showMarket = false;
		this.shares[index].showShares = true;
		return;

	}

	private showActionSheet(name: string, index: number) {

		switch (name) {

			case "sharesActions": {
				this.shareActions(index);
				break;
			}
			case "moneyActions": {
				this.moneyActions(index);
				break;
			}

		}
	}


	private async moneyActions(index: number) {

		console.log("This is index");
		console.log(index);


		let actionSheet = this.actionSheetCtrl.create({
			title: 'Options',
			buttons: [
				{
					text: 'Deposit money',
					handler: () => {
						this.nav.push('page-deposit-money');
						return;
					}
				},
				{
					text: 'Withdraw money',
					handler: () => {
						this.shareViewCarousel(index, "details");
						return;
					}
				},
				{
					text: 'View transactions',
					handler: () => {
						this.shareViewCarousel(index, "market");
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


	private async shareActions(index: number) {

		console.log("This is index");
		console.log(index);


		let actionSheet = this.actionSheetCtrl.create({
			title: 'Options',
			buttons: [
				{
					text: 'Open Market Place',
					handler: () => {
						this.openOTCMarket();
						return;
					}
				},
				{
					text: 'View share details',
					handler: () => {
						this.shareViewCarousel(index, "details");
						return;
					}
				},
				{
					text: 'View market summary',
					handler: () => {
						this.shareViewCarousel(index, "market");
						return;
					}
				},
				{
					text: 'Open company website',
					handler: () => {
						let url = this.shares[index].CompanyWebsite;
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
		
		if (!this.shares[index].Lock && this.shares[index].Available > 0) {
			
			let sell_button = {
				text: 'Sell shares',
				handler: () => {
					this.createOTCSalesOrder(index);
					return;
				}
			}
			actionSheet.data.buttons.splice(0, 0, sell_button);

		}

		if (this.shares[index].Lock && this.shares[index].Available > 1) {
			let button = {
				text: 'Share Locked',
				role: 'cancel',
				icon: 'lock',
				handler: () => {
					// TODO: TRADE PROHIBITED POPUP
				}
			}
			actionSheet.data.buttons.splice(0, 0, button);
		}

		console.log(actionSheet);

		await actionSheet.present();
	}

	private async createOTCSalesOrder(index: number) {


		console.log("this is selected item index: " + index);

		const alert = this.alertController.create({
			title: 'Sell shares',
			message: 'Enter a price per share and the number of shares you want to sell then select <i>Next</i> to continue.',
			inputs: [
				{
					name: 'Price per share (R)',
					placeholder: "Price per share " + this.shares[index].share_value //asking price as opposed to last price
				},
				{
					name: 'Number of shares',
					placeholder: "Num shares (Max: " + parseInt(this.shares[index].Available) +")" //the total number of shares currently left
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

						let price = this.manageInput(data["Price per share (R)"], false);
						if (price < 0) {
							price === -1 ? this.userService.setToast("You must provide a selling price") : this.userService.setToast("The selling price must be a positive natural number.");
							return;
						}

						let amount = this.manageInput(data["Number of shares"], true);
						if (amount < 0) {
							amount === -1 ? this.userService.setToast("You must provide an number of shares you would like to buy") : this.userService.setToast("The number of share must be a positive, whole number.");
							return;
						}

						this.doOTCAction({ "action": "newsellorder", "price": price, "amount": amount, "Asset": this.shares[index].Currency, data });
						return true;
					}
				}
			]
		});

		await alert.present();
		return true;


	}

	private manageInput(value: any, doFractionCheck) {
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

	private checkNumber(number: string, canBeFloat?: boolean): boolean {

		if (isNaN(+number)) {
			return false;
		}

		if (!canBeFloat && +number % 1 != 0) {
			console.log("float test");
			return false;
		}

		return true;
	}

	private async doOTCAction(data: { "action": string, "price": number, "amount": number, "Asset"?: string, data?: any }) {

		let message: string = "";

		switch (data.action) {
			case "newsellorder":
				let udata: { "price": number, "amount": number, "Asset": string } = { "price": data.price, "amount": data.amount, "Asset": data.Asset };
				message = "";
				let currentuid = "";

				this.completeOTCAction(data.action, message, currentuid, data).then(async (result) => {
					if (result == null) {
						this.exitToLoginPage();
					}

					if (!result) {
						this.userService.setToast("We unable to create this sales order. Please try again or contact AZUZA support for assistance.");
						return;
					}

					await this.updatePortfolioCard();

				}, () => {
					this.userService.setToast("We could not connect to the AZUZA servers. Please try again or contact AZUZA support for assistance.");
					return;
				});

				break;
		}
	}

	private async completeOTCAction(action: string, message: string, uid: string, udata?: { "price": number, "amount"?: number, "Asset"?: string }): Promise<any> {


		let popup = this.userService.createLoadingPopup(message, true);

		popup.present();

		return new Promise(async (resolve, reject) => {

			return await this.userService.doOTCRequest(action, uid, udata).then((response) => {


				try {
					popup.dismiss();
				} catch (error) {
					console.log("Couldn't dismiss popup");
					console.log(error);
				}

				if (response == null) {
					resolve(null);
					return;
				}

				if (!response) {
					resolve(false);
					return;
				}

				resolve(response);


			}, (response: any) => {
				popup.dismiss();
				reject(null);

				return;
			});

		});


	}

	private exitToLoginPage(message?: string) {
		if (!message) { message = "Your session has expired. Please log in again."; }
		this.userService.setToast(message);
		this.nav.setRoot(AuthPage);
	}

	toggleShowMarket(index: number) {
		if (this.shares[index].showDetail) this.shares[index].showDetail = false;
		this.shares[index].showMarket = !this.shares[index].showMarket;

	}

	toggleShowDetail(index: number) {
		if (this.shares[index].showMarket) this.shares[index].showMarket = false;
		this.shares[index].showDetail = !this.shares[index].showDetail;
	}

	openOTCMarket() {
		this.nav.setRoot(OtcMarketMainPage);
		return;
	}


	
	ngOnInit() {
		
		if (this.isInitialLoad) {
			//first view data is loaded from login
			console.log("INITIAL HOME VIEW LOAD");
			this.isInitialLoad = false;
			if(!this.shares && !this.money){
				this.createPortfolioCard();
			}
			

		} else {
			console.log("NORMAL HOME VIEW LOAD");
			//all other times view data to be updated
			this.userService.refreshWalletBalances().then((data: any) => {
				console.log("FRESH WALLET BALANCES: " + JSON.stringify(data));
				this.shares = this.setSharesBalances(data.Asset);
				this.money = this.setCashBalances(data.Fiat);

				//this.changeRef.detectChanges();
			}, () => {
				console.log("service potentially unavailable");
			});
		}
	}


	private async updatePortfolioCard() {

		await this.userService.refreshWalletBalances().then((data: any) => {
			console.log("FRESH WALLET BALANCES: " + JSON.stringify(data));
			this.shares = this.setSharesBalances(data.Asset);
			this.money = this.setCashBalances(data.Fiat);

			//this.changeRef.detectChanges();
		}, () => {
			console.log("service potentially unavailable");
		});

	}

	private convertDate(dateStr){
		return Date.parse(dateStr);
	}

	private async createPortfolioCard(): Promise<any> {

		console.log("Updating data....");

		this.userdata = await this.session.getUserdata();

		console.log("LOADED user data: ");
		console.log(this.userdata);

		return new Promise((resolve, reject) => {
			if(this.userdata) {

				let assetBalance = this.userdata.Balance.Asset ? this.userdata.Balance.Asset : "0";
				let fiatBalance = this.userdata.Balance.Fiat ? this.userdata.Balance.Fiat : "0.00";

				this.shares = this.setSharesBalances(assetBalance);
				this.money = this.setCashBalances(fiatBalance);

			

				this.userName = this.makeSalutation();

				console.log("MONEY: " + JSON.stringify(this.money));
				console.log("SHARES: " + JSON.stringify(this.shares));
				resolve(true);
			} else {
				this.userName = null;
				resolve(false);
			}
		});

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


	private getCountryName(countryCode: string): string {

		let str = "";

		switch (countryCode) {
			case "ZAR": {
				str = "South African Rand";
				break;
			}
			case "USD": {
				str = "US Dollar";
				break;
			}
		}

		return str;
	}

	private getCountryCurrencyClass(countryCode: string): string {

		let str = "flag-icon-background country-flag";

		switch (countryCode) {
			case "ZAR": {
				this.ccclass = str + " " + "flag-icon-za";
				break;
			}
			case "USD": {
				this.ccclass = str + " " + "flag-icon-us";
				break;
			}
		}

		return this.ccclass;
	}

	private setSharesBalances(data: any): any[] {

		let balances_data = data;

		if (balances_data) {
			//add market item to JSON
			data.forEach((item: any, index: number) => {
				item.showShares = true;
				item.showMarket = false;
				item.showDetail = false;
			});

		}

		if (!balances_data) {
			balances_data = null;
		}

		return balances_data;
	}





	private setCashBalances(data: any): any[] {

		let balances_data = data;

		if (!balances_data) {
			balances_data = null;
		}

		return balances_data;
	}

	private makeSalutation(): string {
		let un = this.userdata.general.FirstName;
		un = un ? un : "";

		let ln = this.userdata.general.LastName;
		ln = ln ? ln : "";

		let userName = un + " " + ln;

		if (userName.length === 0) {
			userName = "Wealth Builder";
		}
		return userName;
	}



	//	common function check data correct

	setUserInfo(): void {


		console.log("SET USER INFO " + JSON.stringify(this.userdata));


		this.createPortfolioCard().then((result: any) => {
			//this.createCategoriesCards();
		});
		

	}

	private launchExternalWebsite(url: string) {

		if (url) {
			window.open(url, '_system', 'location=yes');
		}

		return;
	}



	openSettingsPage() {
		this.nav.push('page-settings');
	}


	//DELETE LATER <---- DO WE USE THIS?
	presentNotifications(myEvent) {
		console.log(myEvent);
		let popover = this.popoverCtrl.create('page-notifications');
		popover.present({
			ev: myEvent
		});
	}



	//PAGE COMMON FUNCTIONS

	showHelp(fab: any) {
		fab.close();
		this.openModal();
	}

	//opens communication modal
	openModal() {
		var msg: string = "reset-password-page.help-text";

		let content:string = "<h2>Home Page</h2><p>This text needs to be created</p>";

		const helpModal = this.modalCtrl.create(NewModalPage, { html: content });
		helpModal.present();
	}

	//checks if string is JSON
	isJson(str: any) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	}

	//opens the selected current investment detail page
	showDetailPage(fab: any, page_id: number): void {

		if (!page_id) { return; }

		if (fab) {
			fab.close();
		}

		this.nav.push('investment-detail-' + page_id);
		return;

	}

	async ionViewWillEnter(){
		await this.createPortfolioCard();
	}

	ionViewDidLoad(){
		this.done_loading = true;
	}	

}
