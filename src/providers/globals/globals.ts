//import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServerProvider } from '../../providers/server/server';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';



/*
  Generated class for the GlobalsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalsProvider {

  private token = null;
  public userdata = null;
  private httpClient = null;

  constructor( serverService: ServerProvider) {
    this.httpClient = serverService;
  }


  public getUserData(){

    return this.userdata;
  }

  public setUserData(data): Promise<any>{

    return new Promise((resolve, reject) => {
      this.userdata = data;
      this.userdata ? resolve(true) : resolve(false);
    });
  }

  public clearUserData():void{
    this.userdata = null;
  }


  public async updateUserData(): Promise<any> {
    let data:any = null;
    let token:string;

    return await new Promise((resolve, reject) => {
      this.httpClient.doGetRequest("userinfo", token).then((data)=>{
        this.userdata = data;
        console.log("set userdata to: "+JSON.stringify(this.userdata));
        resolve(true);
      },
      (rej)=>{
        resolve(false);
      });
    });
  }
  

/***  TEST CODE - DELETE LATER
  
/*** */
  /*** REDUNDANT - ServerProvider Passes JSON
  private parseHttpData(data: any) {
    if (data) {
      let json_response = JSON.parse(data);
      console.log("DATA TO CONVERT: " + data);
      if (json_response) {
        console.log("Data converted successfully");
        return JSON.parse(json_response._body);
      } else {
        console.log("HTTP Error: Couldn't parse body");
        return false;
      }

    } else {
      console.log("HTTP Error: Couldn't parse response");
      return false;
    }
  }
***/

/***
 * Possibly redundant check later
 */
  public isStringJson(str: any) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }



}
