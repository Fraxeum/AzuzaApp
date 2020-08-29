
import { ToastController, LoadingController, Loading, ModalController, Modal } from 'ionic-angular';
import { Injectable, Inject } from '@angular/core';
import { Storage } from '@ionic/storage';

import { ServerProvider } from '../../providers/server/server';
import { HttpHeaders } from '@angular/common/http';

import { NewModalPage } from '../../pages/new-modal/new-modal';
import { SessionProvider } from "../../providers/session/session";

export class Login {
  username: string;
  password: string;
}

@Injectable()
export class UserProvider {

  private BaseUrl = "https://app.azuzawealth.com/?iCd=";
  private network = 0;
  private storage: any;
  private token: string = null;
  private server: ServerProvider;
  private loadingControl: LoadingController;
  private commsStatusMsg: string;

  private userdata: any;
  private popupPage: ModalController;

  private spinnerPopup: Loading;


  type1: any[];
  type2: any;
  type3: any;


  constructor( storage: Storage, private toastCtrl: ToastController,
    serverService: ServerProvider, loadingCtrl: LoadingController, private modalPage: ModalController, 
    @Inject(SessionProvider) public session: SessionProvider) {

    this.storage = storage;
    this.server = serverService;
    this.loadingControl = loadingCtrl;


    this.userdata = false;
    this.popupPage = modalPage;

    

    //console.log("SESSION TOKEN FROM USER: "+ this.token);
  }

  

  getInstructionsPage(html: string): Modal {
    return this.popupPage.create(NewModalPage, { "html": html });
  }

  showSessionData(){
    console.log("this.session.token = " + this.session.getToken());
    console.log(this.session.getToken());
    console.log("this.user.token = "+this.token);
    if(this.userdata){
      console.log("User's name: ");
      console.log(this.userdata.general.FirstName);
    }
  }

  showGlobalsData() {
    console.log(this.showSessionData())

  }

  //stores the <b>data</b> part of response data returned in temp storage
  setProfileData(data: any) {
    this.storeTempUserdata(data);
    return;
  }

  private setUserData(data) {
    //localStorage.setItem("MemberId", data.data.general.MemberId);
    //localStorage.setItem("currentUser", JSON.stringify(data.data));
    //localStorage.setItem("email", data.data.general.Email);
    //localStorage.setItem("2fa", JSON.stringify(data.data['2fa']));
    //localStorage.setItem("VerificationLevel", JSON.stringify(data.data['VerificationLevel']));
  }

  private showStoredData(): void {

    this.storage.forEach((value: any, key: string, index: number) => {
      console.log(index + ". " + key + " = " + value);

    });
  }

  //store profile data temporarily
  private storeTempUserdata(data: any) {
    if (data) {
      //trying to store JSON object directly
      try {
      /*  this.storage.set("currentUser", data).then(() => {
          this.session.setUserdata(data);
        });*/
        this.storage.set("currentUser", data);
        console.log("STORING USERDATA");

      } catch (err) {
        console.log("storeTempUserdata(data):" + err.message);
      }

    } else {
      console.log("storeTempUserdata(data)" + data);
    }
    return;
  }

  //store profile data temporarily
  public storeItem(name: string, value: any) {

    this.storage.set(name, value).then(() => {
      return true;
    });

  }

  //returns userdata
  public getUserData() {

    if (this.userdata) return this.userdata;

    return false;

  }

  //attempts to fetch and return data portion of userdata
  //returns promise - JSON data
  public getTempUserdata(): any {
    //try stored data
    let data = null;

    return this.storage.get('currentUser').then((result: any) => {
      if (!result) {
        return false;
      }
      else {

        return result;
      }
    });

  }

  public async removeTempUserData(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.storage.remove("currentUser");
      await this.storage.remove("session_token");
      resolve(true);
    });

  }

  //Gets the value of a string from stored userdata
  //returns JSON
  getStoredItem(itemName: string): Promise<any> {
    console.log("getting stored item: " + itemName);

    return new Promise((resolve, reject) => {

      this.storage.get(itemName).then((result: any) => {
        if (result) {

          if (this.isJson(result)) {
            resolve(result);
          }

        } else reject(false);

      }, (result: any) => {
        reject(false);
      });
    });

  }

  //simple method to return data safely from storagre
  //returns data or false if doesn't exist
  private getDataFromStorage(key: string) {

    return new Promise((resolve, reject) => {
      this.storage.get(key).then((data) => {
        return data;
      }, () => {
        return false;
      });

    });

  }

  //stores token in device storage
  private setToken(token: string) {
    console.log("DEPRECATED setToken()");
    this.storage.set("session_token", token);
    console.log("session_token set");
    return false;
  }

  /*
  public async loadSessionData() {

    await this.getToken().then((token:string)=>{
      if(token){
        this.token = token;
        this.session.setToken(token);
        
      } else {
        this.token = null;
        this.session.setToken(null);
      }
      

    },()=>{
      this.token = null;
      this.session.setToken(null);

    });

    await this.loadStoredData().then((result)=>{

      if(result == null || !result){
        console.log("no user data found");
        this.userdata = null;
        this.session.removeUserdata(null);

        return false;

      }

      console.log("user data found and set");
      this.userdata = result;
      this.session.setUserdata(result);
      
      return true;

    },()=>{
      console.log("promise rejected setting token and user data to null");
      
      this.session.setUserdata(null);
      
      return;
    });

    

    return true;
    
  }
  */

  getToken(key?: string): Promise<any> {

    return new Promise(async (resolve, reject) => {

      let token: string = await this.storage.get("session_token");

      console.log("FIRST GET TOKEN CALL: "+token);
      
      if(token == null){
        resolve(null);
      }

      if(token){
        resolve(token);
        return;
      } 
      
      reject(null);

    });

  }


  private loadStoredData(): Promise<any> {
    return new Promise(async (resolve, reject) => {

      this.storage.get("currentUser").then((data) => {
        
        if (data) {
          console.log("found data:" + JSON.stringify(data));
          console.log("this is token:" + data.token);

          if (this.isJson(data)) {
            //updates the userdata for the app
            
            resolve(data);

          }else {
            console.log("not json");
            JSON.parse(data);
            console.log("this is token2:" + data.token);

            resolve(false);
          }
        } else {

          console.log("no data found");

          resolve(null);
        }
      }, () => {
        console.log("loadStoredData promise rejected. Returning null");
        reject(null);
      });
    });
  }




  //check token validity
  checkToken(token: string) {
    console.log("TOKEN CHECK: "+ token);

    return new Promise((resolve, reject) => {
      this.server.doPostRequest("session", token, null).then(async (response) => {
        console.log("TOKEN CHECK RESPONSE: ");
        console.log(response);

        if (response) {
          await this.storage.set("session_token", token);
          resolve(response.success);

        } else {
          resolve(false);

        }

      }, (error) => {
        console.log("------------NETWORK ERROR--------------");
        reject(error);
      });

    });
  }

  
  //fetch support topic list
async sendSupportMessage(supportId:number, heading:string, message:string, supporttopic:number): Promise<any> {

  let params: {"supportid":number, "header":string, "msg":string, "supporttopic":number } = { "supportid":supportId, "header":heading, "msg":message, "supporttopic":supporttopic};

  let token: string = await this.storage.get("session_token");

  if (!token) {
    console.log("ERROR (getAccountBalances): Token not found");
    return false;
  }

  return await new Promise((resolve, reject) => {

    this.server.doPostRequest("addsupport", token, params).then((response) => {

      if (response) {
        //successful return data
        resolve(response);

        return;

      } 
      
      resolve(null);

    }, (err) => {

      reject(false);
    });

  });

}

//fetch support message list
async getSupportMessages(): Promise<any> {

  let params: { } = { };

  let token: string = await this.storage.get("session_token");

  if (!token) {
    console.log("ERROR (getAccountBalances): Token not found");
    return false;
  }

  return await new Promise((resolve, reject) => {

    this.server.doPostRequest("listsupport", token, params).then((response) => {

      if (response) {
        //successful return data
        resolve(response);

        return;

      } 
      
      resolve(null);

    }, (err) => {

      reject(false);
    });

  });

}


//fetch support topic list
async loadBankingOptions(amount:number, currency:string): Promise<any> {

  let params: { "amount":number, "currency":string } = { "amount": amount, "currency":currency };

  let token: string = await this.storage.get("session_token");

  if (!token) {
    console.log("ERROR (loadBankingOptions): Token not found");
    return false;
  }

  return await new Promise((resolve, reject) => {

    this.server.doPostRequest("userdeposit", token, params).then((response) => {

      if (response) {
        //successful return data
        resolve(response);

        return;

      } 
      
      resolve(null);

    }, (err) => {

      reject(false);
    });

  });

}

//fetch support topic list
async getSupportTopics(): Promise<any> {

  let params: { "field":string } = { "field": "supporttopic" };

  let token: string = await this.storage.get("session_token");

  if (!token) {
    console.log("ERROR (getAccountBalances): Token not found");
    return false;
  }

  return await new Promise((resolve, reject) => {

    this.server.doPostRequest("listvalues", token, params).then((response) => {

      if (response) {
        //successful return data
        resolve(response);

        return;

      } 
      
      resolve(null);

    }, (err) => {

      reject(false);
    });

  });

}


//Returns My OTC Response data - Seller getting info from potential buyers
async getAccountBalances(): Promise<any> {

  let params: { "type":string } = { "type": "balance" };

  let token: string = await this.storage.get("session_token");

  await this.getToken("currentUser").then((userData) => {

    this.userdata = userData;
  });

  if (!token) {
    console.log("ERROR (getAccountBalances): Token not found");
    return false;
  }

  return await new Promise((resolve, reject) => {

    this.server.doPostRequest("finance", token, params).then((response) => {

      if (response) {
        //successful return data
        resolve(response);

        return;

      } 
      
      resolve(null);

    }, (err) => {

      reject(false);
    });

  });

}


//Returns My OTC Response data - Seller getting info from potential buyers
async getAllMySalesOrdersData(asset: string): Promise<any> {

  let params: { "asset": string } = { "asset": asset };

  let token: string = await this.storage.get("session_token");

  await this.getToken("currentUser").then((userData) => {

    this.userdata = userData;
  });

  if (!token) {
    console.log("ERROR (getAllMySalesOrdersData): Token not found");
    return false;
  }

  console.log("6GET MARKET DATA - TOKEN6: " + JSON.stringify(token));

  return await new Promise((resolve, reject) => {

    this.server.doPostRequest("listallmysellorders", token, params).then((response) => {

      if (response) {
        //successful return data
        resolve(response);

        return;

      } 
      
      resolve(null);

    }, (err) => {

      reject(false);
    });

  });

}


  //Returns My OTC Response data - Seller getting info from potential buyers
  async getMyTradeOfferData(type: string, offerid: string): Promise<any> {

    let params: { "offerid": string } = { "offerid": offerid };

    let token: string = await this.storage.get("session_token");

    await this.getToken("currentUser").then((userData) => {

      this.userdata = userData;
    });

    if (!token) {
      console.log("ERROR: Cannot complete product vitals request. No token found.");
      return false;
    }

    console.log("1GET MARKET DATA - TOKEN1: " + JSON.stringify(token));

    return await new Promise((resolve, reject) => {

      this.server.doGetRequest(type, token, params).then((response) => {

        if (response && response.success) {
          //successful return data
          resolve(response);

        } else if (response && !response.success) {

          //successful but not logged in return data
          resolve(response);

        } else if (response && response.data && response.data.state === 0) {
          //authentication error
          resolve(response.data.state);

        } else {

          reject(false);

        }

      }, (err) => {

        reject(false);
      });

    });

  }




  //Returns My OTC Response data - buyer getting info between him/her and seller
  async getMyOffersToBuyData(type: string, offerid: string): Promise<any> {

    let params: { "Selleruid": string } = { "Selleruid": offerid };

    let token: string = await this.storage.get("session_token");

    await this.getToken("currentUser").then((userData) => {

      this.userdata = userData;
    });

    if (!token) {
      console.log("ERROR: Cannot complete product vitals request. No token found.");
      return false;
    }

    console.log("2GET MARKET DATA - TOKEN: " + JSON.stringify(token));

    return await new Promise((resolve, reject) => {

      this.server.doGetRequest(type, token, params).then((response) => {

        if (response && response.success) {
          //successful authentication
          resolve(response);

        } else if (response && response.data && response.data.state === 0) {
          //authentication error
          resolve(response.data.state);

        } else {

          reject(false);

        }

      }, (err) => {

        reject(false);
      });

    });

  }


  //Get Investment Data
  async getTransactionList(type: string, limit: number, page: number, walletid: string, isEscrow: boolean, _event?:string): Promise<any> {

    let token: string = await this.storage.get("session_token");

    let event = "";

    let escrow = isEscrow ? "1" : "0";

    if (!token) {
      console.log("ERROR: Cannot complete product vitals request. No token found.");
      return false;
    }

    if(_event){
      event = _event;
    }

    let params: { "page": number, "limit": number, "scope": string, "groupby":string, "walletid": string, "escrow": string, "event"?:string,   } = { "page": page, "limit": limit, "scope": "", "groupby":"Event", "walletid": walletid, "escrow": escrow, "event": event };

    type = type+"&type=transaction";

    console.log("3GET MARKET DATA - TOKEN3: " + JSON.stringify(token));

    return await new Promise(async (resolve, reject) => {

      await this.server.doPostRequest(type, token, params).then((response) => {

          console.log(response);

        //not logged in - reauth
        if (response === null || !response) {
        
          resolve(null);
          return;
        }


        if (response.success) {
          //successful authentication
          console.log("DEBUG2");
          console.log(response);
          resolve(response);
          return;

        }

        if (!response.success && response.message) {
          resolve(response);
          return;

        }

        reject(false);
        return;



      }, (err) => {

        reject(false);
        return;
      });

    });

  }


  //Get Account List Data - for transaction list
  async getAccountList(type: string): Promise<any> {

    let token: string = await this.storage.get("session_token");
    
    if (!token) {
      console.log("ERROR: Cannot complete product vitals request. No token found.");
      return false;
    }


    type = type+"&type=transaction";

    console.log("3GET MARKET DATA - TOKEN3: " + JSON.stringify(token));

    return await new Promise(async (resolve, reject) => {

      await this.server.doPostRequest(type, token).then((response) => {

          console.log(response);

        //not logged in - reauth
        if (response === null || !response) {
        
          resolve(null);
          return;
        }


        if (response.success) {
          //successful authentication
          console.log("DEBUG2");
          console.log(response);
          resolve(response);
          return;

        }

        if (!response.success && response.message) {
          resolve(response);
          return;

        }

        reject(false);
        return;

      }, (err) => {

        reject(false);
        return;
      });

    });

  }


  //Get Account List Data - for transaction list
  async createNewWallet(name: string): Promise<any> {

    let token: string = await this.storage.get("session_token");
    
    if (!token) {
      console.log("ERROR: Cannot complete product vitals request. No token found.");
      return false;
    }

    let params: {"name":string} = {"name":name};
   

    return await new Promise(async (resolve, reject) => {

      await this.server.doPostRequest("newwallet", token, params).then((response) => {

          console.log(response);

        //not logged in - reauth
        if (response === null || !response) {
        
          resolve(null);
          return;
        }


        if (response.success) {
          //successful authentication
          console.log("NEW WALLET");
          console.log(response);
          resolve(response);
          return;

        }

        if (!response.success && response.message) {
          resolve(response);
          return;

        }

        reject(false);
        return;

      }, (err) => {

        reject(false);
        return;
      });

    });

  }

  public async getLRList(type: string, JurisdictionId: number, SectorId: number, Type: number): Promise<any> { 

    let token: string = await this.storage.get("session_token");

    if (!token) {
      console.log("ERROR: Cannot complete product vitals request. No token found.");
      return false;
    }

    let params: { "JurisdictionId": number, "SectorId": number, "Type": number} = { "JurisdictionId": JurisdictionId, "SectorId": SectorId, "Type": Type};

    return await new Promise(async (resolve, reject) => {

      await this.server.doPostRequest(type, token, params).then((response) => {

          console.log(response);

        //not logged in - reauth
        if (response === null || !response) {
        
          resolve(null);
          return;
        }


        if (response.success) {
          resolve(response);
          return;

        }

        if (!response.success && response.message) {
          resolve(response);
          return;

        }

        reject(false);
        return;



      }, (err) => {

        reject(false);
        return;
      });

    });

  }


  public async getKYCList(type: string): Promise<any> {

    let token: string = await this.storage.get("session_token");

    if (!token) {
      console.log("ERROR: Cannot complete product vitals request. No token found.");
      return false;
    }

    let params = {};

    return await new Promise(async (resolve, reject) => {

      await this.server.doPostRequest(type, token, params).then((response) => {

          console.log(response);

        //not logged in - reauth
        if (response === null || !response) {
        
          resolve(null);
          return;
        }


        if (response.success) {
          resolve(response);
          return;

        }

        if (!response.success && response.message) {
          resolve(response);
          return;

        }

        reject(false);
        return;



      }, (err) => {

        reject(false);
        return;
      });

    });

  }


  //Get Share Advert Data
  async getMarketList(type: string): Promise<any> {

    let token: string = await this.storage.get("session_token");

    if (!token) {
      console.log("ERROR: Cannot complete product vitals request. No token found.");
      return false;
    }

    console.log("3GET MARKET DATA - TOKEN3: " + JSON.stringify(token));

    return await new Promise(async (resolve, reject) => {

      await this.server.doPostRequest(type, token).then((response) => {

        console.log("DEBUG1");
          console.log(response);

        //not logged in - reauth
        if (response === null || !response) {
          console.log("NULL RESPONSE AFTER doGetRequest - log in");
          resolve(null);
          return;
        }


        if (response) {
          //successful authentication
          console.log("DEBUG2");
          console.log(response);
          resolve(response);
          return;

        }

        reject(false);
        return;



      }, (err) => {

        reject(false);
        return;
      });

    });

  }



  //Get Investment Data
  async getSellOrderData(type: string, asset: string, step: number, limit: number, include: string): Promise<any> {

    let _asset = asset ? asset : ",";

    let params: { "page": number, "limit": number, "include": string, "asset": string } = { "page": step, "limit": limit, "include": include, "asset": _asset };

    let token: string = await this.storage.get("session_token");

    await this.getToken("currentUser").then((userData) => {

      this.userdata = userData;
    });

    if (!token) {
      console.log("ERROR: Cannot complete product vitals request. No token found.");
      return false;
    }

    console.log("4GET MARKET DATA - TOKEN4: " + JSON.stringify(token));

    return await new Promise((resolve, reject) => {

      this.server.doPostRequest(type, token, params).then((response) => {

        //not logged in - reauth
        if (response === null || !response) {
          console.log("NULL RESPONSE AFTER doGetRequest - log in");
          resolve(null);
          return;
        }


        if (response) {
          //successful authentication
          console.log("DEBUG");
          console.log(response);
          resolve(response);
          return;

        }

        resolve(false);


      }, (err) => {

        reject(false);
      });

    });

  }


  //Update User
  async updateUserdata(type: string, fieldname: string, value: string): Promise<any> {

    if(!type || !fieldname || !value) return;

    let params = { "type": type};
    params[fieldname]=value; //variable key like FirstName/Surname etc.

    let token: string = await this.storage.get("session_token");
/*
    await this.getToken("currentUser").then((userData) => {

      this.userdata = userData;
    });
    */

    if (!token) {
      console.log("ERROR: Cannot complete product vitals request. No token found.");
      return false;
    }


    return await new Promise((resolve, reject) => {

      this.server.doPostRequest("usersave", token, params).then((response) => {

        //not logged in - reauth
        if (response === null || !response) {
          console.log("NULL RESPONSE AFTER doGetRequest - log in");
          resolve(null);
          return;
        }


        if (response) {
          //successful authentication
          console.log("DEBUG");
          console.log(response);
          resolve(response);
          return;

        }

        resolve(false);


      }, (err) => {

        reject(false);
      });

    });

  }


  //Get Investment Data
  async doOTCRequest(action: string, OffersUId: string, udata: { "price"?: number, "amount"?: number, "Asset"?: string }): Promise<any> {
    console.log("Accessed user.doOTCRqequest");

    if(!udata.hasOwnProperty('Asset')) udata.Asset = ","; 
    
    if(!udata.hasOwnProperty('price')) udata.price = 0; 

    if(!udata.hasOwnProperty('amount')) udata.amount = 0; 

    console.log("udata Params:");
    console.log(JSON.stringify(udata));
    
    let params: { "OffersUId": string, "termsaccepted": number, "Price"?: number, "Amount"?: number, "Asset"?: string } = { "OffersUId": OffersUId, "Price": udata.price, "Amount": udata.amount, "termsaccepted": 1, "Asset": udata.Asset };

    console.log("doOTC Params:");
    console.log(params);

    let token: string = await this.storage.get("session_token");

    await this.getToken("currentUser").then((userData) => {

      this.userdata = userData;
    });

    if (!token) {
      console.log("ERROR: Cannot complete product vitals request. No token found.");
      return false;
    }

    console.log("5GET MARKET DATA - TOKEN5: " + JSON.stringify(token));

    return await new Promise((resolve, reject) => {

      this.server.doPostRequest(action, token, params).then((response) => {

        console.log("OTC RESPONSE");
        console.log(response);

        resolve(response);

      }, (err) => {

        reject(false);
      });

    });

  }


  //Get Investment Data
  async requestProductVitals(legalId: number): Promise<any> {

    let params: {} = { "vitals": 1, "legalid": legalId };

    let token: string = await this.storage.get("session_token");

    await this.getToken("currentUser").then((value) => {
      token = value;
    });

    if (!token) {
      console.log("ERROR: Cannot complete product vitals request. No token found.");
      return false;
    }

    console.log("GET INVESTMENT DATA - TOKEN: " + token);

    return await new Promise((resolve, reject) => {

      this.server.doPostRequest("legallist", token, params).then((response) => {

        if (response && response.success) {
          //successful authentication
          resolve(response);

        } else if (response && response.data && response.data.state === 0) {
          //authentication error
          resolve(response.data.state);

        } else {

          reject(false);

        }

      }, (err) => {

        reject(false);
      });

    });

  }



  // Login Api
  login(params: {}): Promise<any> {

    return new Promise((resolve, reject) => {

      this.server.doPostRequest("signin", null, params).then((response) => {

        if (response && response.success) {
          //successful authentication
          resolve(response);

        } else if (response && response.data && response.data.state === 0) {
          //authentication error
          resolve(response);

        } else {
          reject(false);

        }

      }, (err) => {

        reject(false);
      });

    });

  }

  // Register Api
  register(email: string, password: string, countryId: number, tags: string | boolean):Promise<any> {

    let params: {} = {
      "email": email,
      "username": email,
      "password": password,
      "CountryId": countryId,
      "seed": tags
    };

    return new Promise((resolve, reject) => {
      this.server.doPostRequest("signup", null, params).then((response)=>{
        resolve(response);
      }, (response)=>{
        reject(response);
      });
    });
  }

  updateLoaderMessage(message: string){
    this.spinnerPopup.setContent(message);
  }



  createLoadingPopup(message?: string, showText?: boolean) {

    let _showText = showText ? true : false;

    this.commsStatusMsg = message ? message : "Connecting to AZUZA...";

    this.spinnerPopup = this.loadingControl.create({
      spinner: 'bubbles',
      content: _showText ? this.commsStatusMsg : message,
      cssClass: "loadingPopup"
    });

    this.spinnerPopup.present();

    return this.spinnerPopup;

  }

  dismissLoadingPopup() {
    if (this.spinnerPopup) {

      try {

        this.spinnerPopup.dismiss().then(() => {
          return;
        }, () => {
          console.log("Caught view not found error");
        });

      } catch (err) {
        console.log("Caught view not found error");
      }

    }
  }

  //fetches wallet balances from server - returns data structure
  async refreshWalletBalances() {

    let params: {} = { "type": "balance" };

    let token: string = await this.storage.get("session_token");

    await this.getToken("currentUser").then((data: any) => {

      console.log("TOKEN VALUE: " + token);
    });

    if (!token) {
      console.log("ERROR: Connect get wallet balances. No token found.");
      return false;
    }

    return await new Promise((resolve, reject) => {

      this.server.doGetRequest("finance", token, params).then((response) => {

        if (response && response.success) {
          //successful authentication
          resolve(response.data);

        } else if (response && response.data && response.data.state === 0) {
          //authentication error
          resolve(response.data.state);

        } else {

          reject(false);

        }

      }, (err) => {

        reject(false);
      });

    });

  }



  //fetches fresh userdata from server
  async userInfo() {

    let token: string = await this.storage.get("session_token");

    await this.getToken("currentUser").then((data: any) => {

      console.log("TOKEN VALUE: " + token);
    });

    if (!token) {
      console.log("ERROR: Connect get userInfo. No token found.");
      return false;
    }

    return this.server.doGetRequest("userInfo", token);
  }


  // otc trade

  listotc() {
    var token = JSON.parse(localStorage.getItem('token'));
    var url = this.BaseUrl + "listotc" + "&token=" + token + "&iCn=" + this.network;
    return this.server.doGetRequest(url);
  }

  // Register Api
  resetPassword(email: string, tags: string | boolean):Promise<any> {

    let params: {} = {
      "email": email,
      "seed": tags
    }

    return new Promise((resolve, reject)=>{
      this.server.doPostRequest("userreset", null, params).then((response)=>{
        if (response && response.success) {
          //successful authentication
          resolve(response);

        } else if (response && response.success) {
          //authentication error
          resolve(response);

        } else {
          reject(response);

        }

      }, (err) => {

        reject(false);
      });

    });

  }


  // Buy Shares Api
  async doCancelSalesOrder(params?: {}): Promise<any> {

    //get token
    let token: string = await this.storage.get("session_token");

    await this.getToken("currentUser").then((data: any) => {

      console.log("TOKEN VALUE: " + token);
    });

    if (!token) {
      console.log("ERROR: Cannot complete purchase. No token found.");
      return false;
    }

    return new Promise((resolve, reject) => {

      console.log("DO BUY SHARES PARAMS: " + JSON.stringify(params));

      this.server.doPostRequest("userorder", token, params).then((response) => {

        if (response && response.success) {
          //successful authentication
          resolve(response);

        } else if (response && response.data && response.data.state === 0) {
          //authentication error
          resolve(response);

        } else {
          reject(false);

        }

      }, (err) => {

        reject(false);
      });

    });

  }

  // Buy Shares Api
  async doBuyShares(params?: {}): Promise<any> {

    //get token
    let token: string = await this.storage.get("session_token");

    await this.getToken("currentUser").then((data: any) => {

      console.log("TOKEN VALUE: " + token);
    });

    if (!token) {
      console.log("ERROR: Cannot complete purchase. No token found.");
      return false;
    }

    return new Promise((resolve, reject) => {

      console.log("DO BUY SHARES PARAMS: " + JSON.stringify(params));

      this.server.doPostRequest("userorder", token, params).then((response) => {

        if (response && response.success) {
          //successful authentication
          resolve(response);

        } else if (response && response.data && response.data.state === 0) {
          //authentication error
          resolve(response);

        } else {
          reject(false);

        }

      }, (err) => {

        reject(false);
      });

    });

  }


  // New Offer To Purchase Shares (OTC)
  async doMakeOTCOffer(params?: {}): Promise<any> {

    //get token
    let token: string = await this.storage.get("session_token");

    await this.getToken("currentUser").then((data: any) => {

      console.log("TOKEN VALUE: " + token);
    });

    if (!token) {
      console.log("ERROR: Cannot complete purchase. No token found.");
      return false;
    }

    return new Promise((resolve, reject) => {

      console.log("DO BUY SHARES PARAMS: " + JSON.stringify(params));

      this.server.doPostRequest("newoffertopurchase", token, params).then((response) => {

        if (response && response.success) {
          //successful authentication
          resolve(response);

        } else if (response && response.data && response.data.state === 0) {
          //authentication error
          resolve(response);

        } else {
          reject(false);

        }

      }, (err) => {

        reject(false);
      });

    });

  }


  /*User reset password check api

  userresetpassword(email, seed, password) {

    var url = this.BaseUrl + "userreset" + "&email=" + email + "&seed=" + seed.join("|") + "&iCn=" + this.network;
    const uploadData = new FormData();

    uploadData.append('password', password);



    // let httpOptions = {
    //   headers: new HttpHeaders({
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    //   })
    // };


    //return this.http1.post(url, uploadData);
  }
*/

  //User email check api

  checkemail(email) {

    var url = this.BaseUrl + "ping" + "&email=" + email + "&iCn=" + this.network;
    return this.server.doGetRequest(url);
  }

  //set2Fa api

  set2fa() {

    var token = JSON.parse(localStorage.getItem('token'));
    var url = this.BaseUrl + "usersecurity" + "&type=set2fa" + "&token=" + token + "&iCn=" + this.network;
    return this.server.doGetRequest(url);

  }

  // verify2fa api

  verify2fa(code) {

    console.log(code + 'code');
    var token = JSON.parse(localStorage.getItem('token'));
    var url = this.BaseUrl + "usersecurity" + "&type=verify2fa" + "&token=" + token + "&code=" + code + "&iCn=" + this.network;
    return this.server.doGetRequest(url);

  }

  //disable2fa api
  disable2fa(code: string) {

    console.log(code + 'code');
    var token = JSON.parse(localStorage.getItem('token'));
    var url = this.BaseUrl + "usersecurity" + "&token=" + token + "&type=cancel2fa" + "&code=" + code + "&iCn=" + this.network;
    return this.server.doGetRequest(url);

  }

  //changepassword api

  changepassword(password, newpassword) {
    /*
        console.log();
        let body = new URLSearchParams();
        body.set('password', password);
        body.set('newpassword', newpassword);
    
        let options = {
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        var token = JSON.parse(localStorage.getItem('token'));
        var url = this.BaseUrl + "usersecurity" + "&type=savepassword" + "&token=" + token + "&iCn=" + this.network;
        return this.server.doPostRequest(url, body.toString(), options);
    */
  }

  //userProfile api update general information 

  userProfileUpdateGeneral(firstname, lastname, countryId, username1) {
    /*
        let body = new URLSearchParams();
        body.set('FirstName', firstname);
        body.set('LastName', lastname);
        body.set('CountryId', countryId);
        body.set('username', username1);
        body.set('type', 'general');
    
        let options = {
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
    
        var token = JSON.parse(localStorage.getItem('token'));
        var url = this.BaseUrl + "usersave" + "&token=" + token + "&iCn=" + this.network;
    
        //return this.http1.post(url, body.toString(), options);
        */
  }

  //userProfile api update contact information 

  userProfileUpdatecontact(mobile, id) {
    /*
    console.log(id + 'id number');
    let body = new URLSearchParams();
    body.set('ContactVal', mobile);
    body.set('ContactId', id);
    body.set('type', 'contact');
    body.set('ContactType', 'Cell');

    console.log(mobile);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    var token = JSON.parse(localStorage.getItem('token'));
    var url = this.BaseUrl + "usersave" + "&token=" + token + "&iCn=" + this.network;

    //return this.http1.post(url, body.toString(), options);
    */
  }


  //UserDeposit ETF API 

  userDepositETF(amount) {

    console.log(amount + 'amount');
    var token = JSON.parse(localStorage.getItem('token'));
    var url = this.BaseUrl + "userdeposit" + "&type=" + 'EFT' + '&amount=' + amount + '&currency=' + 'ZAR' + '&token=' + token + "&iCn=" + this.network;
    // //return this.http.get(url);

  }


  //UserDeposit  API 

  userDeposit(amount) {

    console.log(amount + 'amount');
    var token = JSON.parse(localStorage.getItem('token'));
    var url = this.BaseUrl + "userdeposit" + '&amount=' + amount + '&token=' + token + "&iCn=" + this.network;
    ////return this.http.get(url);

  }

  //CryptoApi  API 

  CryptoApi(amount, currency) {

    console.log(amount + 'amount', currency + 'currency');
    var token = JSON.parse(localStorage.getItem('token'));
    var url = this.BaseUrl + "userdeposit" + "&type=" + 'Crypto' + '&amount=' + amount + '&currency=' + currency + '&token=' + token + "&iCn=" + this.network;
    ////return this.http.get(url);

  }

  //CryptoApi  API 

  showBalance() {

    var token = JSON.parse(localStorage.getItem('token'));
    var url = this.BaseUrl + "finance" + "&type=" + 'balance' + '&token=' + token + "&iCn=" + this.network;
    // //return this.http.get(url);

  }

  //Transction list  API 

  TransctionList() {

    var memberid = JSON.parse(localStorage.getItem('MemberId'));
    var token = JSON.parse(localStorage.getItem('token'));
    var url = this.BaseUrl + "finance" + "&type=" + 'transaction' + '&token=' + token + "&MemberId=" + memberid + "&iCn=" + this.network;
    //  //return this.http.get(url);

  }


  //Country list  API 

  CountryList() {

    var url = this.BaseUrl + "listvalues" + "&field=" + 'CountryId';
    // //return this.http.get(url);

  }

  //currency list  API 

  CurrencyList() {

    var url = this.BaseUrl + "listvalues" + "&field=" + 'currency' + "&iCn=" + this.network;
    // //return this.http.get(url);

  }

  //

  //jurisdictionlist   API 

  jurisdictionlist() {
    var value = localStorage.getItem('countryID');
    var token = JSON.parse(localStorage.getItem('token'));
    var url = this.BaseUrl + "jurisdictionlist" + "&token=" + token + '&CountryId=' + value + "&L_RType=3" + "&iCn=" + this.network;
    // //return this.http.get(url);

  }

  //Docs View  API 

  docView() {
    var memberid = JSON.parse(localStorage.getItem('MemberId'));
    var token = JSON.parse(localStorage.getItem('token'));
    var url = this.BaseUrl + "docview" + "&token=" + token + '&linkid=' + memberid + '&linkto=M' + "&group=fica" + "&iCn=" + this.network;
    // //return this.http.get(url);

  }

  //legallist  API 

  legallist() {
    var token = JSON.parse(localStorage.getItem('token'));
    var url = this.BaseUrl + "legallistmobile" + "&token=" + token + "&Status=" + 'A' + "&include=P" + "&iCn=" + this.network;


    // //return this.http.get(url);



  }


  //legallist1  API 

  legallist1(legalid) {
    var url = this.BaseUrl + "legallist" + "&legalid=" + legalid + "&include=P" + "&iCn=" + this.network;


    // //return this.http.get(url);



  }


  //spvmarketing  API 

  spvmarketing(legalid) {
    var token = JSON.parse(localStorage.getItem('token'));
    var url = this.BaseUrl + "spvmarketing" + "&legalid=" + legalid + "&token=" + token + "&iCn=" + this.network;


    // //return this.http.get(url);



  }

  //propertylist  API 

  propertylist() {
    var url = this.BaseUrl + "propertylist" + "&iCn=" + this.network;
    ////return this.http.get(url);

  }

  //userdeposit through CreditCard 

  userdepositCreditCard(amount) {
    var token = JSON.parse(localStorage.getItem('token'));
    var url = this.BaseUrl + "userdeposit" + "&type=" + "CreditCard" + "&amount=" + amount + "&token=" + token + "&iCn=" + this.network;
    // //return this.http.get(url);

  }


  //bank Details show  

  jurisdictionlistBank() {
    var country = JSON.parse(localStorage.getItem('countryID'));
    var url = this.BaseUrl + "jurisdictionlist" + "&CountryId=" + country.value + "&iCn=" + this.network;
    // //return this.http.get(url);

  }


  // finance api

  finance() {

    var token = JSON.parse(localStorage.getItem('token'));

    var url = this.BaseUrl + "finance" + "&type=balance" + "&token=" + token + "&iCn=" + this.network;
    // //return this.http.get(url);
  }


  // userorder buy  api

  Invest(id, amount) {

    var token = JSON.parse(localStorage.getItem('token'));

    var url = this.BaseUrl + "userorder" + "&type=buy" + "&token=" + token + "&legalid=" + id + "&amount=" + amount + "&iCn=" + this.network;
    ////return this.http.get(url);
  }



  // add support api

  addSupport(header, msg, supporttopic) {
    console.log(header, msg);
    let body = new URLSearchParams();
    body.set('header', header);
    body.set('msg', msg);
    body.set('supporttopic', supporttopic);

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    var token = JSON.parse(localStorage.getItem('token'));
    var url = this.BaseUrl + "addsupport" + "&token=" + token + "&iCn=" + this.network;

    ////return this.http1.post(url, body.toString(), options);
  }



  // add support api and send support id

  addSupportSendId(header, msg, supportId) {
    // console.log(header , msg);
    let body = new URLSearchParams();
    body.set('header', header);
    body.set('msg', msg);
    body.set('supportid', supportId);
    // body.set('supporttopic', supporttopic);
    // body.set('status', status);


    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    var token = JSON.parse(localStorage.getItem('token'));
    var url = this.BaseUrl + "addsupport" + "&token=" + token + "&iCn=" + this.network;

    ////return this.http1.post(url, body.toString(), options);
  }



  // supporttopic list api

  supporttopic() {

    var token = JSON.parse(localStorage.getItem('token'));

    var url = this.BaseUrl + "listvalues" + "&field=supporttopic" + "&iCn=" + this.network;
    ////return this.http.get(url);
  }


  // support list api

  supportlist() {

    var token = JSON.parse(localStorage.getItem('token'));

    var url = this.BaseUrl + "listsupport" + "&token=" + token + "&iCn=" + this.network;
    // //return this.http.get(url);
  }


  // stateUpdate  api

  stateUpdate(id) {

    var token = JSON.parse(localStorage.getItem('token'));

    var url = this.BaseUrl + "setreadreceipt" + "&token=" + token + '&supportId=' + id + "&iCn=" + this.network;
    ////return this.http.get(url);
  }



  // save bank info 

  saveBank(Country, BankName, AccountNumber, BranchCode) {
    console.log(Country);
    // console.log(header , msg);
    let body = new URLSearchParams();
    body.set('type', 'bank');
    body.set('Id', '0');
    body.set('Country', Country);
    body.set('BankName', BankName);
    body.set('AccountNumber', AccountNumber);
    body.set('BranchCode', BranchCode);
    // body.set('status', status);


    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    var token = JSON.parse(localStorage.getItem('token'));
    var url = this.BaseUrl + "usersave" + "&token=" + token + "&iCn=" + this.network;

    // //return this.http1.post(url, body.toString(), options);
  }


  // get nodes  api

  get_nodes() {

    var token = JSON.parse(localStorage.getItem('token'));

    var url = this.BaseUrl + "get_nodes" + "&token=" + token + "&iCn=" + this.network;
    //return this.http.get(url);
  }


  // get nodesinfo  api

  nodesinfo() {

    var token = JSON.parse(localStorage.getItem('token'));

    var url = this.BaseUrl + "nodesinfo" + "&token=" + token + "&iCn=" + this.network;
    //return this.http.get(url);
  }

  // register node 

  register_Node(civic_uid, ip, description) {
    console.log(civic_uid, ip, description)

    const body = new FormData();
    body.append('civic_uid', civic_uid);
    body.append('node_ip_address', ip);
    body.append('description', description);

    // body.set('status', status);ƒ


    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
      })
    };

    var token = JSON.parse(localStorage.getItem('token'));
    var url = this.BaseUrl + "register_node" + "&token=" + token + "&iCn=" + this.network;

    //return this.http1.post(url, body, httpOptions);
  }


  // confirm nodes  api

  confirm_node() {

    var token = JSON.parse(localStorage.getItem('token'));

    var url = this.BaseUrl + "confirm_node" + "&token=" + token + "&iCn=" + this.network;
    //return this.http.get(url);
  }




  //  OVERBOARD - Delete late

  checkDataEmpty(data) {
    // console.log(data, 'data test');
    if (data == null || data == undefined) {
      return true;
    } else {
      return false;
    }

  }



  //KYC list   API 

  KYCList() {
    var token = JSON.parse(localStorage.getItem('token'));
    var url = this.BaseUrl + "KYCList" + "&token=" + token + '&Status=' + 'N' + "&iCn=" + this.network;
    //return this.http.get(url);

  }



  //KYC delete   API 

  KYCDelete(id) {
    var token = JSON.parse(localStorage.getItem('token'));
    var url = this.BaseUrl + "KYCDelete" + "&token=" + token + '&MediaId=' + id + "&iCn=" + this.network;
    //return this.http.get(url);

  }

  // upload doc api

  public uploadDocs(file, name, type1, type2, type3):Promise<any> {
    // alert(address + "dddddd");

    // alert(file);
    return new Promise((resolve, reject) => {
      const uploadData = new FormData();
      uploadData.append(type1, file);
      uploadData.append(type2, name);
      uploadData.append('description[id]', 'KYC');
      uploadData.append('group', 'front');
    
    });
  }



  // upload doc api

  Uploadprofileimage(options, memberid) {


    return new Promise((resolve, reject) => {
      const uploadData = new FormData();

      uploadData.append('file[]', options);
      uploadData.append('description', 'Profile');
      uploadData.append('linkid', memberid);
      uploadData.append('linkto', 'M');
      uploadData.append('group', 'profile');


      let httpOptions = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
        })
      };

      var token = JSON.parse(localStorage.getItem('token'));
      var url = this.BaseUrl + "docupload" + "&token=" + token + "&iCn=" + this.network;

      /* this.http1.post(url, uploadData, httpOptions)
         .subscribe(res => {
           resolve(res);
         }, (err) => {
           reject(err);
         });*/
    });
  }


  listOwnSellOffers() {

    const uploadData = new FormData();

    uploadData.append('Asset', 'DBUS');

    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
      })
    };

    var token = JSON.parse(localStorage.getItem('token'));
    var url = this.BaseUrl + "listOwnSellOffers" + "&token=" + token + "&iCn=" + this.network;

    //return this.http1.post(url, uploadData, httpOptions);

  }


  //listOwnBids api

  listOwnBids() {
    // alert(address + "dddddd");

    const uploadData = new FormData();

    uploadData.append('Asset', 'DBUS');



    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
      })
    };

    var token = JSON.parse(localStorage.getItem('token'));
    var url = this.BaseUrl + "listOwnBids" + "&token=" + token + "&iCn=" + this.network;

    //return this.http1.post(url, uploadData, httpOptions);

  }






  // listOwnSelloffer api


  listAllSellOffers() {
    // alert(address + "dddddd");

    const uploadData = new FormData();

    uploadData.append('Asset', 'DBUS');



    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
      })
    };

    var token = JSON.parse(localStorage.getItem('token'));
    var url = this.BaseUrl + "listAllSellOffers" + "&token=" + token + "&iCn=" + this.network;

    //return this.http1.post(url, uploadData, httpOptions);

  }



  // cancelSellOffer api


  cancelSellOffer(offerid) {
    // alert(address + "dddddd");

    const uploadData = new FormData();

    uploadData.append('OffersUId', offerid);



    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
      })
    };

    var token = JSON.parse(localStorage.getItem('token'));
    var url = this.BaseUrl + "cancelSellOffer" + "&token=" + token + "&iCn=" + this.network;

    //return this.http1.post(url, uploadData, httpOptions);

  }


  // cancelBid api


  cancelBid(offerid) {
    // alert(address + "dddddd");

    const uploadData = new FormData();

    uploadData.append('OffersUId', offerid);



    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
      })
    };

    var token = JSON.parse(localStorage.getItem('token'));
    var url = this.BaseUrl + "cancelBid" + "&token=" + token + "&iCn=" + this.network;

    //return this.http1.post(url, uploadData, httpOptions);

  }


  // respondBid api


  respondBid(accept, offerid) {
    // alert(address + "dddddd");

    const uploadData = new FormData();

    uploadData.append('accept', accept);
    uploadData.append('OffersUId', offerid);



    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
      })
    };

    var token = JSON.parse(localStorage.getItem('token'));
    var url = this.BaseUrl + "respondBid" + "&token=" + token + "&iCn=" + this.network;

    //return this.http1.post(url, uploadData, httpOptions);

  }



  // makeBid (Order Buy) api


  makeBid(offerid, Asset, Amount, Price) {
    // alert(address + "dddddd");

    console.log(offerid, Asset, Amount, Price);
    const uploadData = new FormData();

    uploadData.append('OffersUId', offerid);
    uploadData.append('Asset', Asset);
    uploadData.append('Amount', Amount);
    uploadData.append('Price', Price);



    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
      })
    };

    var token = JSON.parse(localStorage.getItem('token'));
    var url = this.BaseUrl + "makeBid" + "&token=" + token + "&iCn=" + this.network;

    //return this.http1.post(url, uploadData, httpOptions);

  }


  // createSellOffer api


  createSellOffer(Asset, Amount, Price, MinPrice, MinQty) {
    // alert(address + "dddddd");


    const uploadData = new FormData();

    uploadData.append('Asset', Asset);
    uploadData.append('Amount', Amount);
    uploadData.append('Price', Price);
    uploadData.append('MinQty', MinQty);
    uploadData.append('MinPrice', MinPrice);



    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
      })
    };

    var token = JSON.parse(localStorage.getItem('token'));
    var url = this.BaseUrl + "createSellOffer" + "&token=" + token + "&iCn=" + this.network;

    //return this.http1.post(url, uploadData, httpOptions);

  }

  setToast(message: string, promptDismiss: boolean = false) {

    this.toastCtrl.create({
      message: message,
      duration: promptDismiss ? 30000 : 5000,
      position: 'top',
      showCloseButton: promptDismiss,
      closeButtonText: 'OK',
      cssClass: 'toastCss'
    }).present();

  }


  //Tests if a string is JSON (don't use on JSON, returns false)
  private isJson(item: any) {
    item = typeof item !== "string"
      ? JSON.stringify(item)
      : item;

    try {
      item = JSON.parse(item);
    } catch (e) {
      return false;
    }

    if (typeof item === "object" && item !== null) {
      return true;
    }

    return false;
  }


  //common method that analyses HTTP response.
  //Returns data portion of response if valid or false if not.
  private responseHandler(data: any) {

    if (!data._body) {
      console.log("Body returned null. Server error.");
      return false;
    }

    if (!this.isJson(data._body)) {
      console.log("Body cannot be parse, not JSON.");
      return false;
    }

    let response = JSON.parse(data._body);

    if (!response) {
      console.log("Failed to convert body");
      return false;
    }

    if (!response.success) {
      //throw network error toast
      console.log("network error: success = false");
      return;
    }

    let body: any = response.data;

    if (body) {

      console.log("Request successful!");
      return body;

    } else {

      console.log("Http request failed");
      return false;

    }

  }

}

