import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IonicPage, Events, NavController, LoadingController, AlertController, MenuController, ModalController, Modal, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { NewModalPage } from '../new-modal/new-modal';
import { UserProvider } from '../../providers/user/user';
import { SessionProvider } from "../../providers/session/session";

import { HtmlHelpStringsProvider } from '../../providers/html-help-strings/html-help-strings';


@IonicPage({
  name: 'page-auth',
  segment: 'auth',
  priority: 'high'
})

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html'
})

export class AuthPage {
  public onLoginForm: FormGroup;
  public onRegisterForm: FormGroup;
  auth: string = "login";
  userData: Array<any>;
  data: any;
  data1: any;
  remember: any;
  rememberMe = { email: '', password: '', checked: false };
  countries: Array<{ name: string, id: number, selected: boolean }>;

  showPassword: boolean = true;

  fieldType: string = 'password';

  countryList: any;
  toggleHelp: boolean = false;
  //toggleLogin: boolean = true;
  //toggleLoginBtn: boolean = false;
  modalDismissData: any;
  //initIndex: any = 0;

  private emailValid: boolean;
  private passwordValid: boolean;
  private passwordIcon: string;
  private currentPage: string = "";
  private newWord: string;
  private arr: Array<string> = [];
  private userOrderedArr: Array<string> = [];
  private originalArr: Array<string> = [];
  private count: number = 0;
  private sessionExpired: boolean = false;

  private gota: boolean = false;
  private gotA: boolean = false;
  private got$: boolean = false;
  private got8: boolean = false;
  private got1: boolean = false;

  private passwordRegex = new RegExp('^(?=[ -~]*?[A-Z])(?=[ -~]*?[a-z])(?=[ -~]*?[0-9])(?=[ -~]*?[#?!@$%^&*-])[ -~]{8,72}$');
  private lcRegx = new RegExp('(?=[ -~]*?[a-z])');
  private ucRegx = new RegExp('(?=[ -~]*?[A-Z])');
  private numRegx = new RegExp('(?=[ -~]*?[0-9])');
  private scRegx = new RegExp('(?=[ -~]*?[#?!@$%^&*-])');
  private lenRegx = new RegExp('(^\s*(?:\S\s*){10,100}$)');

  private selectedCountryCode: number = 710;

  private showPWhints: boolean = false;
  private navHistory: Array<{"page":string}>;


  //onthou om die selected index deur te gee met die registration request

  constructor(private _fb: FormBuilder, public loadingCtrl: LoadingController,
    public events: Events, public nav: NavController,
    public forgotCtrl: AlertController, public menu: MenuController, private storage: Storage,
    public user: UserProvider, public modalCtrl: ModalController, public navParams: NavParams,
    public session: SessionProvider, public helpStrings: HtmlHelpStringsProvider) {
    

    this.currentPage = (navParams && navParams.data && navParams.data.currentPage) ? navParams.data.currentPage : "login";
    this.navHistory = [{"page": this.currentPage}];

    this.sessionExpired = (navParams && navParams.data && navParams.data.sessionExpired) ? true : false;
    if(this.sessionExpired) { this.menu.enable(false, "main"); }

    this.storage = storage;
  }

  /* Auth2 methods */
  private checkEnter(event: any) {
    if (this.a11yClick(event)) {
      this.updateList();
    }
  }


  private a11yClick(event: any) {

    var code: any = event.charCode || event.keyCode;
    code = event.charCode || event.keyCode;
    if ((code === 32) || (code === 13)) {
      return true;
    }
  }

  private removeTag(tagId: number) {
    this.arr.splice(tagId, 1);
    return;
  }

  private checkTag() {

    //check for empty tags
    this.arr = this.arr.filter(function (v) { return v !== '' });

    if (this.arr.length >= 9 && this.arr.length <= 12) {

      this.count = this.arr.length;

      if (this.arr != null) {
        console.log("shuffling");
        this.shuffle(this.arr).then((shuffled_array) => {
          this.arr = shuffled_array;
          this.currentPage = "confirm-keywords";
          if(this.navHistory[this.navHistory.length-1].page != this.currentPage){
            this.navHistory.push({"page": this.currentPage});
          }
        });
      }



    } else {
      this.user.setToast("You must enter a minimum of 9 words and a maximum 12 words.");
    }

  }

  private orderItem(itemName: string, i: number) {
    let pos = this.userOrderedArr.length;

    console.log("itemName: " + itemName);
    console.log("pos: " + pos);
    console.log("userOrderedArr:");
    console.log(this.userOrderedArr);


    if (itemName.trim() === this.originalArr[pos].trim()) {
      this.userOrderedArr.push(itemName.trim());
      this.arr.splice(i, 1);

    } else {
      this.user.setToast("The selected word is not in the correct order");

    }
  }

  private shuffle(arr: any): Promise<any> {

    return new Promise(async (resolve, reject) => {
      //create a copy of original array
      await arr.forEach(item => {
        this.originalArr.push(item);
        console.log("word: " + this.originalArr[this.originalArr.length - 1]);
      });

      //shuffle array data
      let i: number, j: number, temp: number;

      for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }

      resolve(arr);
    });

  };

  private goBack(fab) {
    if(fab){
      fab.close();
    }
    console.log("Nav history:");
    console.log(this.navHistory);
    //go back to word create page
    let nextPage = this.navHistory[ this.navHistory.length-2 < 0  ? 0 : this.navHistory.length-2 ].page;
    this.navHistory.pop();
    
    switch (nextPage) {
      case 'keywords': {
        //this.arr = [];
        this.userOrderedArr = [];
        this.originalArr = [];
        break;
      }

      case 'register': {
        this.arr = [];
        break;
      }

    }

    this.currentPage = nextPage;

    return
  }

  

  /* Needs to be implemented */
  private showWords() {
    this.openModal();
  }


  private updateList() {

    if (this.newWord == null || this.newWord === 'undefined' || this.newWord.length < 0) {
      return;
    }

    this.newWord = this.newWord.trim();
    //protecting newValue null pointer


    let regExp = new RegExp(/^[a-zA-Z0-9]{3,12}$/);

    if (!regExp.test(this.newWord)) {

      this.user.setToast('Words can be made up of English alphabet letters and numbers and must be 3 to 12 characters long.');

      this.newWord = this.newWord.slice(0, -1);
      return false;
    }

    if (this.arr.length == 12) {

      this.user.setToast("You can enter up to twelve words.");



      return false;
    }

    //add item to array once space is pressed
    regExp = new RegExp(/[`~!@#$%^&*()_|+\-=?;:",.<>\s\{\}\[\]\\\/\-]/gi);
    let outString = this.newWord.replace(regExp, '');

    // It has any kind of whitespace
    this.arr.push(outString);

    this.newWord = null;

    return;
  }
  /* end */

  private async populateVariables() {

    console.log("getting country list");
    this.countryList.getList().then((data: Array<{ name: string, id: number, selected: boolean }>) => {
      this.countries = data;

      console.log("country list loaded");
      if (this.selectedCountryCode) {
        this.setSelectedCountry();
      }
    });

  }

  private setSelectedCountry() {
    for (let i = 0; i < this.countries.length; i++) {
      if (this.countries[i].id === this.selectedCountryCode) {
        this.countries[i].selected = true;
        i = this.countries.length;
        console.log("Country selected");
        console.log(this.countries[i]);
      }
    }
  }


  showRegister() {
    this.currentPage = "register";
    this.navHistory.push({"page": this.currentPage});
  }


  private async openModal() {
    let helpScreen: Modal | any = null;
    let helpText = null;

    this.helpStrings.getHtmlString(this.currentPage).then(async (text:string) => {
      helpText = await text;
      console.log("this is helpText: " + helpText);//Help string return nog Null

      /* Short circuit to add runtime values */
      if (this.currentPage == "confirm-keywords") {
        helpText = "<h3>Sneak peak</h3><p class='text-white'>The keywords you created in their orginal order are:</p><p>";
        this.originalArr.forEach(element => {
          helpText += element + "   ";
        });
        helpText += "</p>"
      }

      if (helpText == null) {
        helpText = "<h3>Under construction</h3><p class='text-white'>No help content created for this page yet</p>";
      }

      helpScreen = this.user.getInstructionsPage(helpText);
      await helpScreen.present();
    });

  }

  showHelp() {
    this.openModal();
  }

  //toggle password
  private toggleShowPassword() {
    this.showPassword = !this.showPassword;
    this.fieldType = this.showPassword ? 'text' : 'password';
    console.log("This is fieldType = " + this.fieldType);
  }


  // go to register page
  register() {
    if (!this.doRegValidationCheck()) return false;

    this.currentPage = "keywords";
    if(this.navHistory[this.navHistory.length-1].page != this.currentPage){
      this.navHistory.push({"page": this.currentPage});
    }
    
  }


  //DEBUG CODE : REMOVE LATER
  isJson(str: any) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  private togglePWHints() {
    this.showPWhints = true;
    return;
  }




  private checkValidEmailAddress() {

    //let emailValidationRegex = new RegExp('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\.([a-zA-Z]{2,5})$');
    let validEmailFormatRegex = new RegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i);

    if (!this.rememberMe.email.match(validEmailFormatRegex)) {
      this.emailValid = false;
      console.log("false: " + this.emailValid);
      return false;
    }

    this.emailValid = true;
    console.log("valid email address: " + this.emailValid);
    return true;
  }

  private checkValidPassword() {

    if (!this.rememberMe.password.match(this.passwordRegex)) {
      this.passwordValid = false;
      this.showPWhints = true;

    } else {
      this.passwordValid = this.gota = this.gotA = this.got$ = this.got1 = this.got8 = true;
      this.showPWhints = false;
      return this.passwordValid;
    }

    if (this.rememberMe.password.match(this.lcRegx)) {
      this.gota = true;
    } else this.gota = false;

    if (this.rememberMe.password.match(this.ucRegx)) {
      this.gotA = true;
    } else this.gotA = false;

    if (this.rememberMe.password.match(this.numRegx)) {
      this.got1 = true;
    } else this.got1 = false;

    if (this.rememberMe.password.match(this.scRegx)) {
      this.got$ = true;
    } else this.got$ = false;

    if (this.rememberMe.password.length > 7 && this.rememberMe.password.length < 73) {
      this.got8 = true;
    } else this.got8 = false;


    return this.passwordValid;
  }

  private validateEmailAddressCreated() {
    if (!this.checkValidEmailAddress()) {
      let stringUsernameRegex = new RegExp('^([a-zA-Z0-9_\\-\\.]+)$');
      if (!this.rememberMe.email.match(stringUsernameRegex)) {
        this.emailValid = false;
        return false;
      }
      this.emailValid = false;
      return;
    }
    this.emailValid = true;
    return;
  }

  private validatePasswordCreated() {
    if (!this.checkValidPassword()) {
      this.passwordValid = false;
      console.log("this.passwordValid: " + this.passwordValid);
      return;
    }

    this.passwordValid = true;
    console.log("this.passwordValid: " + this.passwordValid);
    return;
  }

  /*** REGISTER VALIDATION CHECK ****/
  private doRegValidationCheck(): boolean {

    if (!this.rememberMe.email || this.rememberMe.email.length < 1) {
      this.user.setToast("You need a valid email address to create an AZUZA account");
    }

    if (!this.rememberMe.password || this.rememberMe.password.length < 1) {
      this.user.setToast("You must create a password for your account");
    }

    if (!this.checkValidEmailAddress()) {
      let stringUsernameRegex = new RegExp('^([a-zA-Z0-9_\\-\\.]+)$');
      if (!this.rememberMe.email.match(stringUsernameRegex)) {
        this.emailValid = false;
        this.user.setToast("Your email address doesn't look so lekker hey");
        return false;
      }
    }

    if (!this.checkValidPassword()) {
      this.passwordValid = false;
      this.user.setToast("Use a combination of UPPERCASE and lowercase letters, numbers, and special characters");
      return false;
    }

    this.passwordValid = false;

    return true;

  }

  /*** LOGIN VALIDATION CHECK ****/
  private doValidationCheck(): boolean {

    if (!this.rememberMe.email || this.rememberMe.email.length < 1) {
      this.user.setToast("To log in you must provide a username");
    }

    if (!this.rememberMe.password || this.rememberMe.password.length < 1) {
      this.user.setToast("To log in you must provide a username");
    }

    if (!this.checkValidEmailAddress()) {
      let stringUsernameRegex = new RegExp('^([a-zA-Z0-9_\\-\\.]+)$');
      if (!this.rememberMe.email.match(stringUsernameRegex)) {
        this.emailValid = false;
        this.user.setToast("Invalid username format entered in the username line");
        return false;
      }
    }

    if (!this.checkValidPassword()) {
      this.user.setToast("Invalid password format entered in the password line");
      return false;
    }

    return true;

  }

  ionViewDidLoad() {
    this.currentPage = "login";
  }


  // login and go to home page
  private login() {

    if (!this.rememberMe.email || this.rememberMe.email.length < 1) {
      this.user.setToast("Enter your email address or Azuza username in the username line");
      return;
    }

    if (!this.rememberMe.password || this.rememberMe.password.length < 1) {
      this.user.setToast("Enter your passwordin the password line");
      return;
    }


    //set spinner
    var loader = "Connecting to AZUZA..."
    let loading = this.loadingCtrl.create({ content: loader });
    loading.present();

    console.log("Login data - before");

    //do login

    let params: {} = { "username": this.rememberMe.email, "password": this.rememberMe.password };

    this.user.login(params).then((data: any) => {

      loading.dismiss();

      if (!data.data) {
        console.log("Server offline. No data resturned.");
        this.user.setToast(data.msg);
        return;
      }

      if (!data.success) {
        //authentication error
        if (data.data.state === 0 && data.msg) {
          this.user.setToast(data.msg);
          return;
        }

        //all other errors.
        console.log("network error");
        this.user.setToast(data.msg);
        return;
      }

      let body = data.data;

      if (data.data) {
        console.log("Body Token:");
        console.log(body.token);
        this.storage.set("session_token", body.token).then(() => {
          this.storage.set("currentUser", body).then(() => {
            console.log("token: " + this.storage.get("session_token"));
            
            this.menu.enable(true,"main");
            this.nav.setRoot("page-home");
          });

        }
        );

        if (this.rememberMe.checked) {
          //sets userprofile data in the provider and stores it in temp storage
          this.user.storeItem('check', this.rememberMe);
        }


      } else {
        this.menu.enable(false,"main");
        loading.dismiss();
        let response = this.user.setToast(body.msg);


      }
    }, error => {
      loading.dismiss();
      this.menu.enable(false,"main");

      this.user.setToast("A network error is preventing AZUZA from connecting to the servers.");

      setTimeout(() => {
        loading.dismiss();
        this.nav.popToRoot();
      }, 3000);

    })

  }

  //returns a piped string of seed words
  private makePipedList(array: Array<string>): string | boolean {
    if (!array) return false;

    let seedstring: string = "";

    let filteredArray = array.filter(function (el) {
      return el != null;
    });


    filteredArray.forEach((word, index) => {
      seedstring += word;
      if (index != filteredArray.length - 1) {
        seedstring += "|";
      }
    });
    return seedstring;
  }

  // check tags    
  private completeRegister() {
    let loading = this.user.createLoadingPopup("Creating your AZUZA account...", true);

    loading.present();

    let seedstr: string | boolean = this.makePipedList(this.userOrderedArr);

    let countryJson = null;

    try {
      countryJson = JSON.parse('' + this.selectedCountryCode);
    } catch (error) {
      console.log(error.message);
      countryJson = { "Name": "South Africa", "value": "710" };
    }

    //remove any old user data
    this.user.removeTempUserData();

    this.user.register(this.rememberMe.email, this.rememberMe.password, 710, seedstr).then((data: any) => {

      loading.dismiss();

      if (!data) {
        this.nav.setRoot('page-auth');
        this.user.setToast("The Azuza seems to be having a bad day. Please try again later.");

        return;
      }

      if (!data.success) {
        //throw network error toast
        this.nav.setRoot('page-auth');
        this.user.setToast(data.msg);

        return;
      }

      if (data && data.success) {
        this.nav.setRoot('page-auth');
        this.user.setToast("Done! We've sent you an email with a link. Please click on the link to activate your account.", true);
      }

    }, () => {
      loading.dismiss();
      this.user.setToast("A network error occured. Please try again later.");
      this.nav.setRoot('page-auth');
    });

  }




  // forget password popup
  private forgotPass() {
    
    this.arr = [];
    this.userOrderedArr = [];
    this.originalArr = [];
    this.currentPage = "lost-password";
    if(this.navHistory[this.navHistory.length-1].page != this.currentPage){
      this.navHistory.push({"page": this.currentPage});
    }

    return;
  }




  private doPasswordReset() {
    let loading = this.user.createLoadingPopup("Connecting to AZUZA...", true);

    loading.present();

    let seedstr: string | boolean = this.makePipedList(this.arr);


    //remove any old user data
    this.user.removeTempUserData();

    console.log("resetting user");

    this.user.resetPassword(this.rememberMe.email, seedstr).then((data: any) => {

      loading.dismiss();

      if (!data) {
        this.nav.setRoot('page-auth');
        this.user.setToast("The Azuza system is currently unavailable. Please try again later.");

        return;
      }

      this.nav.setRoot('page-auth');

      this.user.setToast(data.msg);


    }, (data) => {

      loading.dismiss();
      let msg = "A network error occured. Please try again later.";

      if (data && data.msg && data.msg.length > 1) {
        msg = data.msg;
      }
      this.user.setToast(msg, true);
      this.nav.setRoot('page-auth');
    });

  }

  ionViewDidEnter() {
    if (this.sessionExpired) {
      this.sessionExpired = false;
      let message = "Your session has expired. Please log in again.";
      this.user.setToast(message);
    }
  }


}
