import { Component, ViewChild } from '@angular/core';
import { IonicPage, Content, NavController, LoadingController, AlertController, ToastController, NavParams } from "ionic-angular";
import { UserProvider } from '../../providers/user/user';
import { AuthPage } from '../auth/auth';
import { DatePipe } from '@angular/common';
import { timeout } from 'rxjs-compat/operator/timeout';

type ChatItem = { "supportId": string, "Header": string, "CompanyId": string, "TopicId": string, "SenderId": string, "MemberId": string, "AssignMem": string, "AssignCom": string, "Status": string, "Email": string, "RecStatus": string, "TimeStamp": string, "LastEditBy": string, "ModifyDate": string, "Settings": string, "rate": string, "Extra": string, "UserName": string, "msg": Array<{ "msg": string, "datetime": string, "SenderId": string, "email": string, "state": string, "canReply": string, "MessageId": string }> };
type Topics = Array<{ "Name": string, "value": string, "selected"?: boolean }>;
type MsgItem = { "msg": string, "datetime": string, "SenderId": string, "email": string, "state": string, "canReply": string, "MessageId": string };

@IonicPage({
  name: 'page-chat-detail',
  segment: 'chat'
})

@Component({
  selector: 'page-chat-detail',
  templateUrl: 'chat-detail.html',
  providers: [DatePipe]
})

export class ChatDetailPage {
  @ViewChild(Content) content: Content;

  private chatItem: ChatItem;
  private topics: Topics;

  private message: string;
  private supporttopicid: number;
  private supporttopic: string;
  private supportid: number;

  private showTopics: boolean = true;

  private numSelects: number = 0;

  private noContentMessage: string = "Howzit! Choose a topic from the list below to start a conversation with the AZUZA support team.";

  constructor(public user: UserProvider, public nav: NavController, public forgotCtrl: AlertController,
    public navparams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    private datePipe: DatePipe) {

    let item = this.navparams.get("item");
    let topics = this.navparams.get("topics");

    this.supporttopicid = -1;
    this.supporttopic = "";
    this.supportid = 0;

    this.primeChatItemData();

    if (item) {
      console.log("Incoming");
      console.log(item);
      this.setParams(item);
    }

    if (topics != null) {
      this.showTopics = true;
      this.topics = topics;
      this.setSupportTopicIndex();
      this.addMessageToList();
    }


  }

  private scrollToLatestMsg() {

    if(this.content){
      this.content.scrollToBottom();
    }
    

  }

  private getFriendlyString(supporttopicid: number) {
    switch (supporttopicid) {
      case 1: {
        return "technical support";
      }
      case 2: {
        return "investor support";
      }
      case 3: {
        return "customer support";

      }
      case 4: {
        return "general enquiries";
      }
      default:
        return "support";
    }
  }

  private setTopic(index: number, Name: string, value: string) {
    if (this.supporttopicid === +value) { return }

    ++this.numSelects;
    this.setSelectedIndex(index);
    this.supporttopic = Name;
    this.supporttopicid = +value;

    setTimeout(() => {
      this.noContentMessage = this.getResponseMsg();
      this.addMessageToList();
    }, 500);
    

    console.log("this.supporttopicid: " + this.supporttopicid + ", this.supporttopic: " + this.supporttopic);
  }

  private getResponseMsg(): string {
    console.log(this.numSelects);

    switch (this.numSelects) {
      case 1:
        return "Great! So you need help with " + this.supporttopic + ". Write a message and a member of our " + this.getFriendlyString(+this.supporttopicid) + " team will respond.";
      case 2:
        return "No problem. We've changed the topic. You need help with " + this.supporttopic + ". Go ahead, write a message to our " + this.getFriendlyString(+this.supporttopicid) + " team.";
      case 3:
        return "Support topic updated to " + this.supporttopic + ". Write a message to our " + this.getFriendlyString(+this.supporttopicid) + " team.";
      case 4:
        return "Haha... having a little tapping party on the support page? Come on, choose a topic so we can get on with life ;-)";
      case 5:
        this.noContentMessage = "You obviously do need help.";
        this.addMessageToList();
        this.noContentMessage = "We've changed the topic to 'Psychiatric problems'...  ";
        this.addMessageToList();
        return ";-)";
      default: return "AZUZA support standing by...";
    }
  }

  private setSelectedIndex(index: number) {
    this.topics[index].selected = true;
    this.setSupportTopicIndex(index);
  }

  private setSupportTopicIndex(skipIndex?: number) {

    for (let i = 0; i < this.topics.length; i++) {
      if (skipIndex != undefined && skipIndex != i) {
        this.topics[i].selected = false;
      }
    }
  }

  private async setParams(item: ChatItem): Promise<any> {
    return await new Promise((resolve, reject) => {

      this.chatItem = item;
      console.log("CHAT ITEM: ");
      console.log(this.chatItem);


      if (this.chatItem.supportId != "") { //new support message
        this.supporttopicid = this.chatItem.TopicId != "" ? +(this.chatItem.TopicId) : 0;
        this.supporttopic = this.chatItem.Header;
        this.supportid = this.chatItem.supportId != "" ? +(this.chatItem.supportId) : 0;

        console.log("this.supporttopicid: " + this.supporttopicid + ", this.supporttopic: " + this.supporttopic + ", this.supportid:" + this.supportid);
        resolve(true);
      }


    });
  }

  private convertDate(dateStr: string) {
    return Date.parse(dateStr);
  }

  private primeChatItemData() {
    this.topics = null;
    this.chatItem = { "supportId": "", "Header": "", "CompanyId": "", "TopicId": "", "SenderId": "", "MemberId": "", "AssignMem": "", "AssignCom": "", "Status": "", "Email": "", "RecStatus": "", "TimeStamp": "", "LastEditBy": "", "ModifyDate": "", "Settings": "", "rate": "", "Extra": "", "UserName": "", "msg": [{ "msg": "", "datetime": "", "SenderId": "", "email": "", "state": "", "canReply": "", "MessageId": "" }] };

    return;
  }

  private addMessageToList(isUser?: boolean) {

    let senderId:string = "-1";

    if(isUser){
      senderId = this.chatItem.MemberId;
    }

    let newMsg: MsgItem = { "msg": this.noContentMessage, "datetime": "now", "SenderId": senderId, "email": "", "state": "N", "canReply": "1", "MessageId": this.chatItem.msg.length + 1 + "" };

    console.log("this.chatItem.msg.length: "+this.chatItem.msg.length);

    if(this.chatItem.msg[0].msg.length === 0){
      this.chatItem.msg[0] = newMsg;
    } else {
      this.chatItem.msg.push(newMsg);
    }

    this.scrollToLatestMsg();

    return;

  }

  private send() {

    this.user.createLoadingPopup("Sending message...", true);

    this.noContentMessage = this.message;

   
    if(this.topics != null){
      this.primeChatItemData();
    }

    this.addMessageToList(true);

    this.user.sendSupportMessage(this.supportid, this.supporttopic, this.message, this.supporttopicid).then(async (data) => {

      this.user.dismissLoadingPopup();

      if (!data || (!data.success && data.code == "1000") || !(data.data)) {
        this.exitToLoginPage();
        return false;
      }

      if (data.data && data.data.Text) {
        //this.chatItem.msg = JSON.parse(data.data.Text);
        this.message = null;
        
      }

      await data;
    });

  }

  public exitToLoginPage(message?: string) {
    this.nav.setRoot(AuthPage);
  }

  ionViewDidEnter() {
    if (this.topics == null) {
      this.scrollToLatestMsg();
    }
  }

  ionViewDidLeave() {
    this.chatItem = null;
    this.topics = null;
    this.message = null;
    this.supporttopicid = -1;
    this.supporttopic = null;
    this.supportid = 0;
  }

}
