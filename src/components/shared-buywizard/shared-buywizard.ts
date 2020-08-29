import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserProvider } from '../../providers/user/user';
import { SessionProvider } from "../../providers/session/session";


/**
 * Generated class for the SharedBuywizardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'shared-buywizard',
  templateUrl: 'shared-buywizard.html'
})

export class SharedBuywizardComponent {

  private legalID: number;

  //buy-wizard

  private showBuyPopup: boolean;
  private sharesToggle: boolean;
  private buyStep: number;
  private sharesAmount: number;
  private fiatAmount: number; 
  private sharePrice: number;
  private maxBuySteps: number;
  private assetName: string;

  private userdata = null;

  private wallet_balances: {
    "currency_symbol": string,
    "available_balance": number
  };

  private termsAccepted: {
    "terms1": boolean,
    "terms2": boolean,
    "terms3": boolean,
    "terms4": boolean
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


  private paymentStep: number = 1;


  @ViewChild("shares") shares: ElementRef;
  @ViewChild("fiat") fiat: ElementRef;

  constructor(private user: UserProvider, private session: SessionProvider) {
	
    this.reset();
	this.setWalletBalances();
	this.setFiatWalletBalance();
	this.maxBuySteps = 3; // 3 for primary market, 4 for secondary market (add step for offer-price)
  }

  public formatNum(num: number): number{

	  if(num && typeof num === 'string'){
		return parseInt(num);
	  } else return num;
  }


  public setLegalID(id: number){
    this.legalID = id;
  }

  public setSharePrice(price: number){
	this.sharePrice = price;
  }

  public setMarketType(market: string){
	  if(market === 'S'){
		  //add extra step to buy wizard
		  this.buyStep = 0;
		  this.maxBuySteps = 4;
	  } else {
		  this.maxBuySteps = 3; //default
		  this.buyStep = 1;
	  }
  }

  private reset() {

	this.wallet_balances = {
		"currency_symbol": "R",
		"available_balance": 0.00
	};

    this.termsAccepted = {
      "terms1": false,
      "terms2": false,
      "terms3": false,
      "terms4": false
    }

    this.transactionObj = {
	  "price": 0,
      "totalShares": 0,
      "totalValue": 0.00,
      "fees": 0.00,
      "vehicle": "s12j",
      "terms": false,
      "confirm": false
	};

	this.sharesAmount = 0;
	this.fiatAmount = 0;
	
	this.wallet_balances = {
		"currency_symbol": "R",
		"available_balance": 0.00
	};

    this.showBuyPopup = false;
    this.sharesToggle = true;
	this.buyStep = 1;
	this.assetName = "";
	
	this.calcAmount();

  }

  //toggles between show/hide wizard
  public toggleBuyWizard(legalId: number, sharePrice: number, market: string, assetName: string) {

	this.assetName = assetName;

	this.setMarketType(market);
	 
	legalId ? this.setLegalID(legalId) : false;
			
	sharePrice ? this.setSharePrice(sharePrice) : 0;
	  
	this.showBuyPopup = legalId ? !this.showBuyPopup : this.showBuyPopup;
  
  }

 //might be duplicate of above <---- CHECK DELETE LATER IF SAME
  private toggleBuyPopupVisibility(legalId?: number): void {
	  console.log("toggle toggled");
	  return;

	    if(legalId){
			this.setLegalID(legalId);
		}

		this.showBuyPopup = !this.showBuyPopup;
		
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

  public setAvailableBalance(balance: number){
	  console.log("Called set Available balances with "+balance);
	this.wallet_balances = {
		"currency_symbol": "R",
		"available_balance": balance
	};
  }
  
  private calcAmount(): any {

		if (this.sharesAmount < 0 && this.fiatAmount < 0) {
			return;
		}

		if (this.sharesToggle) {

			if ( isNaN(this.sharesAmount) ) return;

			//if (this.sharesAmount === 0) { return; }

			this.transactionObj.totalShares = this.sharesAmount;
			this.transactionObj.totalValue = this.sharesAmount * this.sharePrice;
			this.fiatAmount = this.transactionObj.totalValue;
			if (this.fiatAmount > this.wallet_balances.available_balance) {

				console.log("calcamount(1)");
				console.log("Fiat amount: "+this.fiatAmount);
				console.log("Wallet bal : "+this.wallet_balances.available_balance);

				this.showBalanceExceeded();
			}

		} else {
			if ( isNaN( this.fiatAmount ) ) return;

			if ( this.fiatAmount === 0 ) { return; }

			this.transactionObj.totalValue = this.fiatAmount;
			this.transactionObj.totalShares = this.fiatAmount / this.sharePrice;
			this.sharesAmount = Math.floor(this.transactionObj.totalShares);

			if (this.fiatAmount > this.wallet_balances.available_balance) {
				console.log("calcamount(2)");
				console.log("Fiat amount: "+this.fiatAmount);
				console.log("Wallet bal : "+this.wallet_balances.available_balance);
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
      default: 
      return;

		}

  }
  
  private allTermsChecked(): boolean {
		if (this.termsAccepted.terms1 &&
			this.termsAccepted.terms2 &&
			this.termsAccepted.terms3 &&
			this.termsAccepted.terms4) {
			this.transactionObj.terms = true;
			return true;
		}
		return false;
  }
  
  private nextStep(fab: any, dir: number) {
		if (fab) {
			fab.close();
		}

		if(this.buyStep === 1 && this.transactionObj.totalShares < 1){
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
		this.user.createLoadingPopup("Completing your shares order...",true);
		this.doBuyProcess();
  }
  
  private toggleShareToggle(): void {
		this.calcAmount();
		this.sharesToggle = !this.sharesToggle;

	}

	private setVehicle(value: string) {
		this.transactionObj.vehicle = value;
  }
  
  private doBuyProcess() {
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
			"legalid": this.legalID,
			"amount": numShares,
			"vehicle": this.transactionObj.vehicle,
			"termsaccepted": this.transactionObj.terms ? 1 : 0
		}
		console.log("PARAMS:" + JSON.stringify(params));

		this.user.doBuyShares(params).then(success => {
			this.user.updateLoaderMessage("Share sale complete!");

			setTimeout(() => {
				this.user.dismissLoadingPopup();
				this.user.setToast("Yay! Your shares have been bought and in your escrow wallet.");

				setTimeout(() => {
				//	this.navCtrl.popToRoot();

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


}
