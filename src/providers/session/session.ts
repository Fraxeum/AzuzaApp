import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


/*
  Generated class for the SessionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SessionProvider {

  private token: string;
  private userdata;
  private storage: Storage;

  constructor(public http: HttpClient, public _storage: Storage) {
    this.token = null;
    this.userdata = null;
    this.storage = _storage;
    //console.log("Init session");
  }

  public async updateUserdata(type: string, name: string, value: string): Promise<any> {
    return await new Promise((resolve, reject) => {
      console.log("type:" + type);
      console.log("name" + name);


      this.getUserdata().then(async (data) => {
        this.userdata = await data;
        console.log("BEFORE CHANGE: " + this.userdata[type][name]);
        this.userdata[type][name] = value;
        console.log("AFTER CHANGE: " + this.userdata[type][name]);

        this.storage.set("currentUser", this.userdata).then(() => {
          resolve(true);
        });
      });


    });
  }

  public async setUserdata() {
    this.userdata = await this.getUserdata();
    return;
  }

  public async getUserdata(): Promise<any> {

    return await new Promise((resolve, reject) => {

      if (this.userdata) resolve(this.userdata);

      this.storage.get("currentUser").then((result) => {
        resolve(result);
      });
    });
  }


  public async updateBalances(balances): Promise<any> {

    this.getUserdata().then((userdata) => {
      console.log("FOUND THIS USERDATA:");
      console.log(userdata);

      return new Promise((resolve, reject) => {

        userdata.Balance = balances;

        this.storage.set("currentUser", userdata).then(async (result) => {
          await result;
          console.log("THIS IS NEW USER BALANCE DATA:");
          console.log(userdata);
          resolve(true);
        });

      });

    });
  }


  public setToken(token: string) {
    this.token = token;
    return;
  }

  public async removeUserdata(): Promise<any> {
    return await new Promise((resolve, reject) => {
      this.storage.remove("session_token").then(async () => {
        await this.storage.remove("currentUser").then(() => {
          this.token = null;
          this.userdata = null;
        });
      });
      resolve(true);

    });

  }


  public getToken(): Promise<any> {


    return new Promise((resolve, reject) => {

      if (this.token) { resolve(this.token); return; }

      return this.storage.get("session_token").then((value) => {
        console.log("returning: " + value);
        resolve(value);
      }, () => {
        resolve(null);
      });



    });
  }

  public exitToLoginPage(): Promise<any> {

    return new Promise((resolve, reject) => {
      try {
        this.removeUserdata().then(async (result) => {
          console.log("Logout: userdata deleted");
          await result;
          resolve(true);
        }, async (result) => {
          console.log("Logout: failed to delete user data (1)");
          await result;
          resolve(false);
        });
      } catch (error) {
        console.log("Logout: failed to delete user data (2)");
        resolve(null);
      }

    });

  }

}
