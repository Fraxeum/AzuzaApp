import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams } from "ionic-angular";
import { UserProvider } from '../../providers/user/user';
import { OrderByPipe } from "./orderby.pipe";
import { AuthPage } from '../auth/auth';

type ChatItem = { "supportId": string, "Header": string, "CompanyId": string, "TopicId": string, "SenderId": string, "MemberId": string, "AssignMem": string, "AssignCom": string, "Status": string, "Email": string, "RecStatus": string, "TimeStamp": string, "LastEditBy": string, "ModifyDate": string, "Settings": string, "rate": string, "Extra": string, "UserName": string, "msg": Array<{ "msg": string, "datetime": string, "SenderId": string, "email": string, "state": string, "canReply": string, "MessageId": string }> };
type ChatData = Array<ChatItem>;

type Topics = Array<{ "Name": string, "value": string }>;

@IonicPage({
  name: 'page-chat',
  segment: 'supportmsglist'
})

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})

export class ChatPage {

  private loadingContent: string = "Loading...";
  private showChatList: boolean = null;
  private firstLoad: boolean = true;
  private noContentMessage: string = "Connect with an AZUZA support agent by clicking on the button below, or email us at support@azuzawealth.com";
  private chatListData: ChatData;
  private chatItem: ChatItem;
  private topics: Topics;


  constructor(public navCtrl: NavController, public user: UserProvider, public navparams: NavParams, public toastCtrl: ToastController) {
    this.chatListData = null;
    this.primeChatListData();
  }

  private getEmptyChatListData() {
    this.primeChatListData();
    return this.chatListData[0];
  }



  private primeChatListData() {
    this.chatItem = { "supportId": "", "Header": "", "CompanyId": "", "TopicId": "", "SenderId": "", "MemberId": "", "AssignMem": "", "AssignCom": "", "Status": "", "Email": "", "RecStatus": "", "TimeStamp": "", "LastEditBy": "", "ModifyDate": "", "Settings": "", "rate": "", "Extra": "", "UserName": "", "msg": [{ "msg": "", "datetime": "", "SenderId": "", "email": "", "state": "", "canReply": "", "MessageId": "" }] };
    this.chatListData = [this.chatItem];
    return;

  }

  public exitToLoginPage(message?: string) {
    if (!message) { message = "Your session has expired. Please log in again."; }
    this.user.setToast(message);
    this.navCtrl.setRoot(AuthPage);
  }



  private convertDate(dateStr: string) {
    return Date.parse(dateStr);
  }

  private loadSupportData() {

    if(this.firstLoad){
      this.user.createLoadingPopup("Connecting to support...", true);
    }
   

    this.user.getSupportTopics().then(async (response) => {

      let data = await response;

      if (!data || (!data.success && data.code == "1000") || !(data.data)) {
        this.exitToLoginPage();
        return false;
      }

      this.topics = await data.data;


    }).then(() => {

      this.user.getSupportMessages().then(async (response) => {

        let data = await response;

        if(this.firstLoad){
          this.user.dismissLoadingPopup();
          this.firstLoad = false;
        }

        this.chatListData = data.data;

        if (!this.chatListData || this.chatListData.length < 1) {
          this.showChatList = false;

        } else {
          this.showChatList = true;

        }

        console.log(this.chatListData);

        await data;
      });

    });

  }


  ionViewWillEnter() {
    this.loadSupportData();

  }

  ionViewDidLeave(){
    //this.showChatList = null;
    //this.primeChatListData();
    //this.topics = null;
  }

  //ChatData is 'n ARRAY <== Check dat jy dit so hanteer, hier en in die chat-detail page
  open(item?: ChatItem) {
    // console.log(proptype);
    let _item: ChatItem = item ? item : null;
    let _topics: Topics = null;

    if (_item == null) {
      _item = this.getEmptyChatListData();
      _topics = this.topics;
      console.log("sending topics");
      console.log(_topics);
    }

    this.navCtrl.push('page-chat-detail', { 'item': _item, 'topics': _topics });
  }



}
