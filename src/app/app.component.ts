import { Component, ViewChild, Inject } from '@angular/core';
import { Nav, Platform, Events, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { UserProvider } from '../providers/user/user';
import { SessionProvider } from "../providers/session/session";

import { OtcMarketMainPage } from "../pages/otc-market-main/otc-market-main";
import { TrxHistoryPage } from "../pages/trx-history/trx-history";
import { AuthPage } from '../pages/auth/auth';
import { ProfilePage } from '../pages/profile/profile';
import { SupportChatPage } from '../pages/support-chat/support-chat';

export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
    templateUrl: 'app.html'
})

export class AzuzaApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = 'page-initial';

    nextPage: string = ''; //placeholder for nextPage

    showMenu: boolean = true;

    homeItem: any;

    marketItem: any;

    authItem: any;

    initialItem: any;

    messagesItem: any;

    timelineItem: any;

    settingsItem: any;

    propertyList: any;

    portfolioItem: any;

    myWalletItem: any;

    myProfileItem: any;

    appMenuItems: Array<MenuItem>;

    yourPropertyMenuItems: Array<MenuItem>;

    accountMenuItems: Array<MenuItem>;

    accountMenuItems2: Array<MenuItem>;

    helpMenuItems: Array<MenuItem>;

    lastMenuItems: Array<MenuItem>;

    //private storage: Storage;

    showInitial: boolean;
    counter: number = 1;
    data1: any;
    data2: any;
    userImage: any;
    show: boolean = false;
    name: string | boolean;
    email: any;
    data: any;
    fverify: any;
    fv: boolean = false;
    bv: boolean = false;
    nv: boolean = false;

    session_token: string;
    private intervalId: number;

    constructor(public platform: Platform, public user: UserProvider,
        public events: Events, public statusBar: StatusBar, private menu: MenuController,
        public splashScreen: SplashScreen, private storage: Storage,
        @Inject(SessionProvider) public session: SessionProvider) {

        //STORAGE RESET
        //storage.clear().then(async (result)=>{ console.log("storage reset"); });
        //return;

        //init app once platform is ready and storage is ready.
        this.platform.ready().then(() => {
            this.storage.ready().then(() => {
                this.initializeApp();
            });
        });

    }



    private checkTokenState(token: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.user.checkToken(token).then((response: any) => {
                if (response) {
                    console.log("Token found - SESSION GOOD. CONTINUE.");
                    // this.session.setToken(token);
                    console.log("SESSION TOKEN: " + token);

                    resolve(true);

                } else {
                    console.log("Token INVALID: reAuth().");
                    resolve(false);


                }
            }, (response: any) => {

                console.log("Token CHECK ERROR: Promise rejection.");
                resolve(false);
            });
        });
    }





    private async checkStoreCreated() {

        return this.storage.length().then((num: number) => {

            if (!num) {
                console.log("No store detected: num = " + num);
                //no data - fresh install
                let date = new Date().toDateString();
                console.log("created date: ");
                console.log(date);
                this.storage.set("installDate: ", date);
                console.log(this.storage.get("installDate").then((result) => {
                    console.log("installDate: ");
                    console.log(result);
                }));
                return false;
            }

            return true;
        });

    }

    private async initAppFlow() {

        return new Promise(async (resolve, reject) => {

            if (await this.checkStoreCreated()) {
                //keys in the datastore = show login page
                this.showInitial = false;

                //this.user.showSessionData(); //FOR DEBUG PURPOSES
                let tokenState = false;

                this.session.getToken().then((token) => {
                    console.log("NEW SESSION getToken() => " + token);

                    if (token) {
                        this.checkTokenState(token).then((result: boolean) => {
                            tokenState = result;

                            if (tokenState) {
                                this.session.setToken(token);
                                this.session.setUserdata();

                                console.log("Token found - SESSION ACTIVE. Resolve true.");
                                
                                this.menu.enable(true, "main");
                                this.nextPage = 'page-home';

                                resolve(true);
                                return;
                            }
                            //token state false
                            this.reAuth();
                            return;

                        }, (result) => {
                            this.reAuth();
                            resolve(false);

                        });
                    } else {
                        this.reAuth();
                        resolve(false);
                    }


                }, () => {
                    //network or server error - authenticate
                    this.reAuth();
                    resolve(false);

                });

            } else {

                console.log("NAVIGATION: No store, Show Initial");

                this.session_token = null;
                this.showInitial = true;

                this.nextPage = 'page-initial';
                resolve(false);

                return;


            }




        });


    }

    private initItems(): boolean {
        
        return true;
    }

    private openDepositPage() {
        this.nav.push('page-deposit-money');
    }

    private openSupportPage() {
        this.nav.setRoot('page-chat');
    }

    private openProfilePage() {
        this.nav.push(ProfilePage);
    }

    private openHomePage() {
        this.nav.setRoot("page-home");
    }

    private openOTCMarketPlace() {
        this.nav.setRoot(OtcMarketMainPage);
    }

    private openTransactionHistory() {
        this.nav.setRoot(TrxHistoryPage);
    }

    private logout() {
        try {
            if (this.session != null) {
                this.session.removeUserdata().then(() => {
                    this.session = null;
                    this.reAuth();
                }, () => {
                    this.reAuth();
                });
            } else {
                this.storage.remove("currentUser").then(() => {
                    this.storage.remove("session_token").then(() => {
                        this.reAuth();
                    })
                });
            }
        } catch (error) {
            this.reAuth();
        }

    }



    private async initializeApp() {

        await this.initAppFlow().then(async (result) => {

            //start session active check
            if (this.nextPage && this.nextPage != null) {
                this.setIntervalSessionCheck();
                await this.nav.setRoot(this.nextPage).then(()=>{
                    console.log("called this.splashScreen.hide();");
                    this.splashScreen.hide();
                });
            }

        });
    }

   

    public async reAuth() {
        this.menu.enable(false, "main"); 
        
        clearInterval(this.intervalId);

        this.nextPage = 'page-auth';
        if (this.session) {
            await this.session.exitToLoginPage();
        }

        setTimeout(() => {
            this.nav.setRoot(this.nextPage);
        }, 250);

    }

    public setIntervalSessionCheck() {

        console.log("setting interval");

        //set session check interval
        if (this.nextPage === 'page-auth') return;

        this.intervalId = setInterval(() => {

            if (this.session) {

                this.session.getToken().then(async (stored_token: string) => {
                    if (!stored_token || stored_token == null) {
                        //no session active - nothing to check
                        console.log("Sesion check aborted: no token present");
                        return;
                    }

                    console.log("Checking session validity....");

                    this.user.checkToken(stored_token).then((result) => {
                        if (!result) {
                            this.logout();
                            return;
                        }
                        console.log("Session valid");
                        return;
                    }, (err: any) => {
                        clearInterval(this.intervalId);
                        this.logout();
                        this.user.setToast("You have been disconnnected from Azuza. Please check your Internet connection.");
                        return;
                    });

                });

            }

        }, 60000); //refreshes every 60 seconds

        return;
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
}
