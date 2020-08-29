//IONIC imports
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, Modal, LoadingController, ActionSheetController, AlertController, ActionSheet } from 'ionic-angular';

//PAGE SPECIFIC IMPORTS
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

import { Storage } from '@ionic/storage';
import { FileUploader, FileItem } from 'ng2-file-upload';


//PAGE COMMON IMPORTS
import { NewModalPage } from '../new-modal/new-modal';
import { UserProvider } from '../../providers/user/user';
import { ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthPage } from '../auth/auth';

import { CountryListProvider } from '../../providers/country-list/country-list';
import { SaBankListProvider } from '../../providers/sa-bank-list/sa-bank-list';

import { SessionProvider } from "../../providers/session/session";

declare var cordova: any;



@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  @ViewChild('docsForm') docsForm: ElementRef;

  private currentPage: string = "personal";

  private BaseUrl = "https://app.azuzawealth.com/?iCn=0&iCd=kycsave";

  /*private pages: Array<{ page: string }> = [{ page: "personal" }, { page: "docs" }, { page: "banking" }, { page: "security" }];*/
  private pages: Array<{ page: string }> = [{ page: "personal" }, { page: "docs" }, { page: "banking" }];
  private cPage: number = 0;
  private countries: Array<{ name: string, id: number, selected: boolean }>;
  private user: { "MemberId": string, "FirstName": string, "LastName": string, "IdNo": string, "IdType": string, "Gender": string, "UserName": string, "Email": string, "RefBy": string, "DOB": string, "Status": string, "KYCLevel": string, "CountryId": string, "Role": string, "MemberType": string, "RoleName": string };
  private banking: { "type": string, "Id": "0", "Country": string, "BankName": string, "AccountNumber": string, "BranchCode": string }
  private docs: { "VerificationLevel": string, "KYCLevel": string };
  private security: { "fa2": string, "ipaddress": string };
  private referral: { "referral": string };
  private bankList: Array<{ "name": string, "brandname": string, "branchcode": string, "swiftcode": string, "selected": boolean }>;
  private kycList: Array<{ "MediaId": string, "linkid": string, "LinkTo": string, "FieldName": string, "FileURL": string, "oldname": string, "Description": string, "Group": string, "Type": string, "Status": string, "TimeStamp": string, "Name": string, "User": string }>;
  private sectorList: Array<{ "Id": string, "SectorId": string, "L_RID": string, "RecStatus": string, "Name": string, "Mandatory": string, "ValidTypes": Array<string>, "Type": string, "AdminApproved": string, "FileSize": string, "CurrencyId": string, "JurisdictionId": string, "uploaded"?: boolean }>;

  private currentBankName: string;
  private direction: number = -5;
  private actionSheet: ActionSheet;

  /* FILE UPLOAD */
  private uploader: FileUploader;
  private uploadResponse: string = "";
  private showDocsLists: boolean = false;

  private showDocsReceivedHeading: boolean = false;
  private showDocsRequiredHeading: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private countryList: CountryListProvider,
    public modalCtrl: ModalController, public session: SessionProvider, public userProv: UserProvider,
    public bankProvider: SaBankListProvider, public platform: Platform, public filePath: FilePath, private transfer: Transfer, private camera: Camera,
    public actionSheetCtrl: ActionSheetController, public storage: Storage) {

    if (navParams) {
      if (navParams.get("page")) {
        this.cPage = <number>navParams.get("page");
      }

      this.initUploader();

      console.log(this.cPage);
    }

    this.initVariables();
    this.populateVariables();

  }

  private checkMoreDocsRequired(): boolean{
    if(!this.sectorList || this.sectorList.length < 1) return false;
    
    for(let i=0; i<this.sectorList.length;i++){
      if(!this.sectorList[i].uploaded){
        return true;
      }
      
    }
    return false;
  }

  private resetInputControls(){
    if(!this.docsForm.nativeElement.elements || this.docsForm.nativeElement.elements.length < 1) return;

    for(let i = 0; i < this.docsForm.nativeElement.elements.length; i++){
      this.docsForm.nativeElement.elements[i].value = "";
    }
  }

  private showSingleItemActionSheet(item, idx: number) {
    

    this.actionSheet = this.actionSheetCtrl.create({
      title: 'Options',
      buttons: [
        {
          text: 'Upload',
          handler: async () => {
           
            this.uploader.onErrorItem = (item: any, response: any, status: any, headers: any) => {
              this.userProv.setToast(status);
            }

            this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
              this.userProv.dismissLoadingPopup();
              this.resetInputControls();
              //updates required document list 
              this.sectorList[idx].uploaded = true;
              //updates sectorlist heading
              this.showDocsRequiredHeading = this.checkMoreDocsRequired();
              console.log("More docs required actionsheet: "+this.showDocsRequiredHeading);
              //updates received document list
              this.getKYCList().then((data) => {
                if (data) {
                  this.kycList = data;
                }
              });
              
            };

            this.uploader.onBeforeUploadItem = (file: FileItem) => {
              this.userProv.createLoadingPopup("Uploading...");
            };

            //(one file in the queue at position 0)
            if(this.uploader.queue && this.uploader.queue.length > 0){
              this.uploader.uploadItem(this.uploader.queue[0]);
            }
            

          }
        },
        {
          text: 'Remove',
          handler: () => {
            this.resetInputControls();

            if (this.uploader.queue.length < 1) return;

            this.uploader.removeFromQueue(this.uploader.queue[0]);
            this.resetInputControls();
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            this.resetInputControls();

            if (this.uploader.queue.length < 1) return;

            this.uploader.cancelItem(this.uploader.queue[0]);
            this.uploader.removeFromQueue(this.uploader.queue[0]);
            
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
    }, 150);
  }

  private setInputId(id: string) {

    let str = "L_RID_" + id + "[]";

    if (str == this.uploader.options.itemAlias) return;

    this.uploader.options.itemAlias = str;

    console.log(str);
    return;
  }

  private makeLRIDString(lrid: string) {
    return;
  }

  public initUploader() {

    this.storage.get("session_token").then(async (token) => {

      this.uploader = new FileUploader({
        url: this.BaseUrl + "&cacheSlayer=" + Math.random(),
        allowedMimeType: ["image/png", "image/jpg", "image/jpeg", "image/gif", "image/webp", "application/pdf"],
        removeAfterUpload: true,
        isHTML5: true,
        additionalParameter: {
          'token': token
        },
        /* itemAlias: 'L_RID_41[]',*/
        parametersBeforeFiles: true,
        disableMultipart: false // 'DisableMultipart' must be 'true' for formatDataFunction to be called.

      });
      console.log("UPLOADER");
      console.log(this.uploader);

      this.uploader.options.itemAlias = "test123";

      this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

      this.uploadResponse = "";
      this.uploader.response.subscribe(res => this.uploadResponse = res);
    });




  }



  private setSelectedCountry() {
    for (let i = 0; i < this.countries.length; i++) {
      if (this.countries[i].id === +this.user.CountryId) {
        this.countries[i].selected = true;
        i = this.countries.length;
        console.log("Country selected");
        console.log(this.countries[i]);
      }
    }
  }

  private setSelectedBank() {
    for (let i = 0; i < this.bankList.length; i++) {
      if (this.bankList[i].name === this.banking.BankName) {
        this.currentBankName = this.banking.BankName;
        this.bankList[i].selected = true;
        i = this.bankList.length;
        console.log(this.bankList[i].name + " has been selected");
        console.log("After loading banklist");
        console.log(this.bankList);
      }
    }
  }

  //sets all selected flags to false except newly selected one which is set to true
  private async setNewBank() {

    console.log(this.banking.BankName);

    for (let i = 0; i < this.bankList.length; i++) {
      if (this.bankList[i].brandname === this.banking.BankName) {
        this.bankList[i].selected = true;
        this.banking.BankName = this.bankList[i].brandname;
        this.banking.BranchCode = this.bankList[i].branchcode;

      } else { this.bankList[i].selected = false; }

    }

    if (this.currentBankName != this.banking.BankName) {
      this.currentBankName = this.banking.BankName;
      await this.saveChanges("bank", "Bank name");
    }
    console.log("BankList after update:");
    console.log(this.bankList);

    return;

  }

  private async saveChanges(type: string, name: string) {
    if (!name) {
      let msg = "The " + name + "field is mandatory";
      this.userProv.setToast(msg);
      return;
    }

    switch (name) {
      case 'First name':
        await this.doUpdateField(type, "FirstName", this.user.FirstName, name);
        break;
      case 'Last name':
        await this.doUpdateField(type, "LastName", this.user.LastName, name);
        break;
      case 'Username':
        await this.doUpdateField(type, "UserName", this.user.UserName, name);
        break;
      case 'Citizenship':
        await this.doUpdateField(type, "CountryId", this.user.CountryId, name);
        break;
      case 'Bank name':
        await this.doUpdateField(type, "BankName", this.banking.BankName, name);
        await this.doUpdateField(type, "BranchCode", this.banking.BranchCode, name, true);
        break;
      case 'Account number':
        await this.doUpdateField(type, "AccountNumber", this.banking.AccountNumber, name);
        break;
    }

  }


  private doUpdateField(type: string, name: string, value: string, field_label: string, hideMsg?: boolean) {
    let showToast: boolean = hideMsg ? true : false;

    this.session.updateUserdata(type, name, value).then(async () => {
      await this.userProv.updateUserdata(type, name, value).then(() => {
        if (showToast) this.userProv.setToast(field_label + " updated successfully");

        return;
      }, (response) => {
        console.log("ERROR: saveChanges()");
        console.log(response);
      });
    });
  }

  private async handleSwipe(event) {

    console.log(event);

    if (event.direction === this.direction) return; //illiminates pan multi-triggers

    let dir = (this.direction = event.direction);

    console.log("this is dir: " + dir);

    await this.swipeToPage(dir).then((pageNo) => {

      console.log(pageNo);
      if (isNaN(Number(pageNo))) return;

      setTimeout(() => {
        this.cPage = pageNo;
        this.showPage(pageNo);
        this.direction = -5;

      }, 100);
      return;
    });

  }

  private async swipeToPage(direction: number): Promise<any> {

    return new Promise((resolve, reject) => {
      let nextPage: number = this.cPage;
      console.log("starting point: " + this.cPage);

      if (direction == 4) {
        nextPage = nextPage - 1;
        nextPage = (nextPage < 0) ? 0 : nextPage;
        console.log(this.pages[nextPage].page);
        resolve(nextPage);
      }
      if (direction == 2) {
        nextPage = nextPage + 1;
        nextPage = nextPage > 2 ? 2 : nextPage; //>3 ? 3 when security tab is ready
        console.log(this.pages[nextPage].page);
        resolve(nextPage);
      }
    });

  }

  private showPage(pageNo: number) {
    console.log("pageNo: " + pageNo);
    console.log("showing page: " + this.pages[pageNo].page);
    this.currentPage = this.pages[pageNo].page;
  }

  /* deprecated
  private getSelectedCountry() {
    console.log((this.count++) + " => country.id = " + this.user.CountryId);
    let cId = this.user.CountryId ? parseInt(this.user.CountryId) : 0;
    return cId;
  }*/

  private populateUserdata(): Promise<boolean> {

    return new Promise(async (resolve, reject) => {

      await this.session.getUserdata().then(async (bulk_data) => {
        console.log("USER DATA LOADED");
        console.log(bulk_data);
        this.user = bulk_data.general;
        this.banking = bulk_data.bank;
        this.docs = { "VerificationLevel": bulk_data.VerificationLevel, "KYCLevel": bulk_data.KYCLevel }
        this.security = { "fa2": bulk_data.fa2, "ipaddress": bulk_data.ip }
        this.referral = bulk_data.referral;
        resolve(true);
      }, () => {
        console.log("Shit happened - no userdata available. Request from server?");
        reject(false);
      });

    });

  }

  private initVariables() {
    this.countries = [{ name: "", id: 0, selected: false }];
    this.user = { "MemberId": "", "FirstName": "", "LastName": "", "IdNo": "", "IdType": "", "Gender": "", "UserName": "", "Email": "", "RefBy": "", "DOB": "", "Status": "", "KYCLevel": "", "CountryId": "", "Role": "", "MemberType": "", "RoleName": "" };
    this.banking = { "type": "", "Id": "0", "Country": "", "BankName": "", "AccountNumber": "", "BranchCode": "" }
    this.docs = { "VerificationLevel": "", "KYCLevel": "" }
    this.security = { "fa2": "", "ipaddress": "" }
    this.referral = { "referral": "" }
    this.bankList = [{ "name": "", "brandname": "", "branchcode": "", "swiftcode": "", "selected": false }];
    this.kycList = [{ "MediaId": "", "linkid": "", "LinkTo": "", "FieldName": "", "FileURL": "", "oldname": "", "Description": "", "Group": "", "Type": "", "Status": "", "TimeStamp": "", "Name": "", "User": "" }];
    this.sectorList = [{ "Id": "", "SectorId": "", "L_RID": "", "RecStatus": "", "Name": "", "Mandatory": "", "ValidTypes": [""], "Type": "", "AdminApproved": "", "FileSize": "", "CurrencyId": "", "JurisdictionId": "" }];
  }

  private async populateVariables() {

    return this.populateUserdata()
      .then(async () => {

        console.log("getting country list");
        this.countryList.getList().then((data) => {
          this.countries = data;

          console.log("country list loaded");
          if (this.user.CountryId) {
            this.setSelectedCountry();
          }
        })
          .then(async () => {
            console.log("getting banking list");
            await this.bankProvider.getList().then((data) => {
              console.log("banking list:");
              this.bankList = data;
              console.log(this.bankList);

              if (this.banking.BankName) {
                this.setSelectedBank();
                this.currentBankName = this.banking.BankName;
              }
            });

          })
          .then(async () => {
            await this.getLRList().then(async (data) => {
              if (data) {
                this.sectorList = await data;
                
                
              }
            });
          })
          .then(async () => {
            await this.getKYCList().then((data) => {
              if (data) {
                this.kycList = data;
              }
            });
          }).then(() => {
            this.primeSectorList().then(() => {
              this.showDocsLists = true;
              this.showDocsRequiredHeading = this.checkMoreDocsRequired();
                console.log("More docs required getList: "+this.showDocsRequiredHeading);
            });

          });
      });

  }

  //silent fetch - get both Sectorlist data
  private async getLRList(): Promise<any> {

    /*
    * getLRList takes three additional params JurisdictionId (1=south africa), SectorId (13=Startups), Type (3=consumer LR requirements)
    */

    return this.userProv.getLRList("sectorlrlist", 1, 13, 3).then(async (data) => {

      return new Promise((resolve, reject) => {
        if (!data || (!data.success && data.code == "1000")) {
          this.exitToLoginPage();
          resolve(false);
        }

        if (data.data) {
          if(data.data.length > 0){
            this.showDocsReceivedHeading = true;
          }
          resolve(data.data);
        } else resolve(false);

      });
    }, (data) => {
      console.log("failed to get KYC data");
    });
  }

  //silent fetch - get both Sectorlist data
  private async getKYCList(): Promise<any> {

    /*
    * getLRList takes three additional params JurisdictionId (1=south africa), SectorId (13=Startups), Type (3=consumer LR requirements)
    */

    return this.userProv.getKYCList("KYCList").then(async (data) => {

      return new Promise((resolve, reject) => {
        if (!data || (!data.success && data.code == "1000")) {
          this.exitToLoginPage();
          resolve(false);
        }

        if (data.data) {
          
          resolve(data.data);
        } else resolve(false);

      });
    }, (data) => {
      console.log("failed to get KYC data");
    });
  }

  private primeSectorList(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < this.sectorList.length; i++) {
        this.sectorList[i].uploaded = false;
        if (this.checkKYCList(this.sectorList[i].L_RID)) {
          this.sectorList[i].uploaded = true;
        }
      }

      //manual check to ensure only one of passport or ID has been uploaded <--- NOT PRODUCTION PROOF
      if (this.sectorList[0].uploaded || this.sectorList[1].uploaded) {
        this.sectorList[0].uploaded = true;
        this.sectorList[1].uploaded = true;
      }
      resolve(true);
    });


  }

  //checks if this user has submitted docs for this legal and regulatory (L_R) requirement id
  private checkKYCList(lrid: string): boolean {
    if (!this.kycList || !(this.kycList.length > 0) || !lrid) return;

    let fieldname: string = "L_RID_" + lrid;

    for (let i = 0; i < this.kycList.length; i++) {
      if (this.kycList[i].FieldName === fieldname) {
        return true;

      }
    }
    return false;
  }

  public exitToLoginPage(message?: string) {
    if (!message) { message = "Your session has expired. Please log in again."; }
    this.userProv.setToast(message);
    this.navCtrl.setRoot(AuthPage);
  }

  private close(fab) {
    fab.close();
    this.navCtrl.pop();
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

  }

}
