import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { HomePage } from '../home/home';
import { AuthPage } from '../auth/auth';

@IonicPage({
  name: 'page-message',
  segment: 'message'
})

@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessagePage {

  private chatListTopics: Array<{ "Name": string, "value": string }>;
  private message:string = null;

  constructor(public navCtrl: NavController, public user: UserProvider, public toastCtrl: ToastController) {
    
    this.loadChatListTopics();

  }

  private loadChatListTopics() {
    this.user.getSupportTopics().then(async (data) => {
      if (!data || (!data.success && data.code == "1000") || !(data.data)) {
        this.exitToLoginPage();
        return false;
      }

      if (data.data && data.data.length < 1) {
        this.chatListTopics = [
          {
            "Name": "Assets",
            "value": "2"
          },
          {
            "Name": "KYC",
            "value": "3"
          },
          {
            "Name": "Other",
            "value": "4"
          },
          {
            "Name": "Problem signin in",
            "value": "1"
          }
        ];
        return;
      }

      this.chatListTopics = await data.data;

      return;
    });
  }

  openChat() {
    // console.log(proptype);
    this.navCtrl.push('page-chat-detail');
  }


  send() {

  }

  public exitToLoginPage(message?: string) {
    if (!message) { message = "Your session has expired. Please log in again."; }
    this.user.setToast(message);
    this.navCtrl.setRoot(AuthPage);
  }


}
