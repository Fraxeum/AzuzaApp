import { Component, EventEmitter, Output } from '@angular/core';
import { UserProvider } from '../../providers/user/user';
import { SessionProvider } from "../../providers/session/session";


@Component({
	selector: 'shared-trade-wizard',
	templateUrl: 'shared-trade-wizard.html'
})

export class SharedTradeWizardComponent {

	@Output() pop = new EventEmitter();
	private legalID: number;

	private assetObject: {
		"id": string, "price": string, "amount": string, "total": string, "left": string, "sold": string, "userid": string, "status": string,
		"pair": string, "TimeStamp": string, "uid": string, "Name": string, "LegalId": string, "lastprice": string, "currency": string, "asset": string,
		"currencySymbol": string, "CompanyName": string, "CompanyWebsite": string, "state": string, "Prospectus": string
	};

	//trade-wizard

	public showBuyPopup: boolean;
	private sharesToggle: boolean;
	private buyStep: number;
	private sharesAmount: number;
	private fiatAmount: number;
	private sharePrice: number;
	private lastPrice: string;
	private maxBuySteps: number;
	private assetName: string;
	private saleShares: number;

	private userdata = null;

	private wallet_balances: {
		"currency_symbol": string,
		"available_balance": number
	};

	private termsAccepted: {
		"terms1": boolean,
		"terms2": boolean,
		"terms3": boolean
	}


	private transactionObj: {
		"price": number,
		"totalShares": number,
		"totalValue": number,
		"fees": number,
		"vehicle": string,
		"terms": boolean,
		"confirm": boolean
	};



	private paymentStep: number = 0;

/*
	@ViewChild("shares") shares: ElementRef;
	@ViewChild("fiat") fiat: ElementRef;
*/

	constructor(private user: UserProvider, private session: SessionProvider) {
		console.log("constructor called");
		this.prime();

		let storedObject = localStorage.getItem("asset");
		console.log("STORED OBJECT");
		console.log(storedObject);
		console.log("This is stored object: "+storedObject);
		
		if(storedObject){
			this.assetObject = JSON.parse(storedObject);
			this.setShareVars(this.assetObject.price, this.assetObject.lastprice, this.assetObject.left);
			this.calcAmount();
		}
		

		this.buyStep = 1;
	}

	public isNaN: Function = Number.isNaN;

	public formatNum(num: number): number {
		if (num && typeof num === 'string') {
			return parseInt(num);
		} else return num;
	}


	public setLegalID(id: number) {
		this.legalID = id;
	}

	public setShareVars(price: string, lastprice: string, saleShares: string) {
		this.sharePrice = 0;
		this.lastPrice = "0";
		
		if(price.length > 0){
			this.sharePrice = parseInt(price);
		}

		if(lastprice.length > 0){
			this.lastPrice = lastprice;
		} else this.lastPrice = "N/A";

		if(saleShares.length > 0){
			this.saleShares = parseInt(saleShares);
			console.log("Shares for sale" + this.saleShares);
		} else this.saleShares = 0;
		
	}

	public show(){
		console.log("child show toggled");
		this.toggleBuyPopupVisibility();
	}

	public toggleShow() {
		console.log("Called Show");
		this.pop.emit();
	  //this.showBuyPopup = !this.showBuyPopup;
		//this.toggleBuyPopupVisibility();
	}

	private prime() {

		this.assetObject = {
			"id": null, "price": null, "amount": null, "total": null, "left": null, "sold": null, "userid": null, "status": null,
			"pair": null, "TimeStamp": null, "uid": null, "Name": null, "LegalId": null, "lastprice": null, "currency": null, "asset": null,
			"currencySymbol": null, "CompanyName": null, "CompanyWebsite": null, "state": null, "Prospectus": null
		};

		this.wallet_balances = {
			"currency_symbol": "R",
			"available_balance": 0.00
		};

		this.termsAccepted = {
			"terms1": false,
			"terms2": false,
			"terms3": false
		}

		this.transactionObj = {
			"price": 0,
			"totalShares": 0,
			"totalValue": 0.00,
			"fees": 0.00,
			"vehicle": "otc-offer",
			"terms": false,
			"confirm": false
		};

		this.sharesAmount = 0;
		this.fiatAmount = 0;

		this.sharePrice = 0;
		this.lastPrice = "N/A";
		this.saleShares = 0;

		this.showBuyPopup = false;
		this.sharesToggle = true;
		
		this.buyStep = 1;
		this.assetName = "";
		this.maxBuySteps = 3;

		return;

	}
/*

	public setAssetObject(assetObj: any){
		console.log("Called Set Asset Object - Deprecated");
	}

*/
	//might be duplicate of above <---- CHECK DELETE LATER IF SAME
	public toggleBuyPopupVisibility(): void {
		console.log("called toggleBuyPopupVis");
		this.showBuyPopup = !this.showBuyPopup;
		console.log("this is buyPopup value: "+this.showBuyPopup);
		return;
	}

	//calls getWalletBalances to set wallet balances
	private setWalletBalances(): void {

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

		return await new Promise((resolve, reject) => {
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

	public setAvailableBalance(balance: number) {
		console.log("Called set Available balances with " + balance);
		this.wallet_balances = {
			"currency_symbol": "R",
			"available_balance": balance
		};
	}

	private calcAmount(): any {

		/*
		if (!this.sharesAmount || (this.sharesAmount < 0 && this.fiatAmount < 0)) {
			return;
		}
		*/

		

        console.log("Number of shares: "+this.sharesAmount);
		console.log("Fiat amount: "+this.fiatAmount);
		console.log("Wallet balance: "+this.wallet_balances.available_balance);


		if (this.buyStep === 1) {


			if (isNaN(this.sharesAmount)) return;

			//if (this.sharesAmount === 0) { return; }

			this.transactionObj.totalShares = this.sharesAmount;
			this.transactionObj.totalValue = this.sharesAmount * this.sharePrice;
			this.fiatAmount = this.transactionObj.totalValue;

			console.log("transactionObj.totalShares" + this.transactionObj.totalShares);
			console.log("saleShares" + this.saleShares);

			if(this.transactionObj.totalShares > this.saleShares){
				this.transactionObj.totalShares = this.saleShares;
				this.sharesAmount = this.transactionObj.totalShares;
			}

			if (this.fiatAmount > this.wallet_balances.available_balance) {
				console.log("calcamount(1)");
				console.log("Fiat amount: " + this.fiatAmount);
				console.log("Wallet bal : " + this.wallet_balances.available_balance);

				this.showBalanceExceeded();
			}

		} else {
			if (isNaN(this.fiatAmount)) return;

			if (this.fiatAmount === 0) { return; }

			this.transactionObj.totalValue = this.fiatAmount;
			this.transactionObj.totalShares = this.fiatAmount / this.sharePrice;
			this.sharesAmount = Math.floor(this.transactionObj.totalShares);

			if (this.fiatAmount > this.wallet_balances.available_balance) {
				console.log("calcamount(2)");
				console.log("Fiat amount: " + this.fiatAmount);
				console.log("Wallet bal : " + this.wallet_balances.available_balance);
				this.showBalanceExceeded();
			}

		}
		return;
	}

	private showBalanceExceeded() {
		let message: string = "Amount entered exceeds funds available";
		this.user.setToast(message);

	}

	private acceptTerms(item: number) {
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
			default:
				return;

		}

	}

	private allTermsChecked(): boolean {
		if (this.termsAccepted.terms1 &&
			this.termsAccepted.terms2 &&
			this.termsAccepted.terms3) {
			this.transactionObj.terms = true;
			return this.transactionObj.terms;
		}
		return false;
	}

	private nextStep(fab: any, dir: number) {

		if (fab) {
			fab.close();
		}


		if (this.buyStep === 1 && this.sharesAmount < 1) {
			this.user.setToast("You must offer to buy at least one share.");
			return;
		} 

		if (this.buyStep === 1 ) {
			this.transactionObj.totalShares = this.sharesAmount;
		}

		if (this.buyStep === 2 ) {
			this.transactionObj.price = this.sharePrice;
		}

		console.log(this.buyStep);
		if (dir > 0) {
			if (this.buyStep + 1 > 3) {
				console.log("transaction object:");
				console.log(this.transactionObj);
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

	private prevStep(fab: any) {
		if (fab) {
			fab.close();
		}

		if (this.buyStep === 1) {
			//this.navCtrl.pop();

		} else {
			this.buyStep--;
		}
		return;
	}

	private sendTransaction() {
		this.showBuyPopup = false;
		this.doOfferProcess();
	}

	private doOfferProcess() {

		if (!this.transactionObj.totalShares || !this.transactionObj.price) {
			console.log("Error in transactionObj");
			console.log(this.transactionObj);
			return false;
		}

		let numShares: number = 0;

		let price: number = 0;

		/*
		//causes issue converting floating point numbers
		if (typeof this.transactionObj.totalShares != "number") {
			try {
				numShares = parseFloat(this.transactionObj.totalShares);
			} catch (err) {
				return false;
			}
		}
		*/
/*
		if (typeof this.transactionObj.price != "number") {
			try {
				price = parseInt(this.transactionObj.price);
			} catch (err) {
				return false;
			}
		}*/

		let params = {
			"Asset": this.assetObject.asset,
			"OffersUId" : this.assetObject.uid,
			"Amount": this.transactionObj.totalShares,
			"Price": this.transactionObj.price, 
			"termsaccepted": this.transactionObj.terms ? "1" : "0"
		}
		console.log("PARAMS:" + JSON.stringify(params));

		this.user.doMakeOTCOffer(params).then(success => {
			this.user.updateLoaderMessage("Offer delivered!");

			setTimeout(() => {
				this.user.dismissLoadingPopup();
				this.user.setToast("Your share offer has been sent to the seller. The seller has the opportunity to accept, reject or make a counter offer.");

				setTimeout(() => {
					//	this.navCtrl.popToRoot();
					this.toggleBuyPopupVisibility();
					this.prime();

				}, 100);

			}, 3150);

		}, failed => {
			setTimeout(() => {
				this.user.dismissLoadingPopup();
				this.user.setToast("Oh no, something went wrong. Please try again. If the problem continues please contact support for assistance.");

			}, 1500);

		});

	}

	setFiatWalletBalance() {
		console.log("Wallet balance: "+this.wallet_balances.available_balance);
		console.log("Share price: "+this.sharePrice);
		if (this.sharesToggle) { //shares input - calculate shares for available balance
			if (this.wallet_balances.available_balance <= 0 || this.sharePrice <= 0) {
				this.sharesAmount = 0;
				return;
			}
			let numShares = this.wallet_balances.available_balance / this.sharePrice;
			this.sharesAmount = Math.floor(numShares);

		} else {
			if (!this.wallet_balances.available_balance || this.wallet_balances.available_balance <= 0) {
				this.fiatAmount = 0;
				return;
			}

			let numShares = this.wallet_balances.available_balance / this.sharePrice;
			this.sharesAmount = Math.floor(numShares);

			this.fiatAmount = this.sharesAmount * this.sharePrice;

		}

	}

	ngOnInit(){
		this.setWalletBalances();

	}

	


}
