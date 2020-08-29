import { Injectable } from '@angular/core';

/*
  Generated class for the HtmlHelpStringsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HtmlHelpStringsProvider {

  private htmlHelpStrings: Array<{ "identifier": string, "htmlString": string }>;

  constructor() {
    this.setStrings();
  }

  private setStrings() {
    this.htmlHelpStrings = [{
      "identifier": "login",
      "htmlString": '<h3>The log in page</h3><p class="text-white">Log into your Azuza account by providing the email address you registered with or your username, if you created one, and your password. Remeber passwords are case sensitive.</p>' +
        '<p><b>Forgot password?</b>Click on the "Forgot" button to reset your password using your account recovery key.</p>' +
        '<p><b>Need help?</b><p>Email Azuza: support@azuzawealth.com</p>'
    },
    {
      "identifier": "register",
      "htmlString": '<h3>The register page</h3><p class="text-white">All you need to create an Azuza account is a valid email address, which you will need to verify, a strong password and an account recovery key. </p>' +
        '<p><b>What about KYC?</b>You will need to complete the Azuza KYC process before you can deposit funds, buy and sell shares.</p>' +
        '<p><b>Information security</b><p>Your personal details are encrypted and stored in South Africa, on a secure database and is used only to communicate with you.</p>'
    },
    {
      "identifier": "lost-password",
      "htmlString": '<h3>Reset your password</h3><p class="text-white">Reset your password by entering the account recovery key you created when you signup with Azuza.</p>' +
        '<p><b>Account recovery key hint:</b>You selected nine to twelve words that are both CaSe sensitive and order sensitive.</p>' +
        '<p><b>Lost recovery key?</b><p>Email Azuza: support@azuzawealth.com Our support team will verify your identity manually, but it is important to understand that you will not be able to transact for up to 48-hours after your account has been unlocked.</p>'
    },
    {
      "identifier": "keywords",
      "htmlString": '<h3>Set up account recovery</h3><p class="text-white">If you ever lose your password or get locked out of your account you will be able to securely reset your password with your account recovery key.</p>' +
        '<p><b>Your account recovery key:</b>Your account recovery key is made up of nine to twelve words of your choice. They can be any words, example: one oil BIG stars clutch random winning OTC love</p>' +
        '<p><b>Notes:</b><ul><li>Words are case sensitive</li><li>The order of the words is important</li></ul>' +
        '<p><b>Store your key safely:</b><p class="text-white">Remember to write down your account recovery key - and store it in a safe place. Without your account recovery key you will need to manually verify your identity with the help of the Azuza support team.</p>'
    }];
  }

  public getHtmlString(identifier: string): Promise<any> {
    let text = null;
    for (let i = 0; i < this.htmlHelpStrings.length; i++) {
      if (this.htmlHelpStrings[i].identifier === identifier) {
        text = this.htmlHelpStrings[i].htmlString;
        i = this.htmlHelpStrings.length;
      }
    }

    return new Promise((resolve, reject) => {
      if (text == null) {
        reject(null);
      } else resolve(text);
    });

  }

}
