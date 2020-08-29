import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServerHelperProvider } from '../../providers/server-helper/server-helper';
import { AuthPage } from '../../pages/auth/auth';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
//import { App } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/timeout';


/*
  Generated class for the ServerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServerProvider {
  private JSONuserdata: any = null;
  private storage:Storage;
  private BaseUrl = "https://app.azuzawealth.com/?iCd=";
  private network = 0;
  private httpClient = null;



  constructor(private httpService: HttpClient, private requestService: ServerHelperProvider) {

    this.httpClient = httpService;

  }


  public async doGetRequest(resource: string, token: string = null, params?: any): Promise<any> {

    if(!params){
      params = {};
    }

    let promise = new Promise((resolve, reject) => {

      this.processPostRequest(resource, token, params).subscribe(
        data => {
          if (this.sessionActive(data)) {
            console.log("HTTP: Session Active");
            resolve(data);
          } else {
            console
            console.log("HTTP: ALERT Session Expired");
            resolve(null);
          }
        },
        err => {
          reject(false);
        }
      );

    });

    return promise;

  }

  //check if user is still logged in
  private sessionActive(data): boolean {
    if (data && data.code === "1000") {
      return false;
    }
    return true;
  }

  private handleTimeout(): {} {
    console.log("Network timeout");
    return { "success": false, "data": "", "msg": "A network connection error is preventing the app from connecting to the server." };
  }

  //post request takes params in JSON array list, 
  public async doPostRequest(resource: string, token: string = null, params?: {}): Promise<any> {
    
    if (!params) {
      params = {};
    }

    console.log("DO POST REQUEST PARAMS: " + JSON.stringify(params));

    return new Promise((resolve, reject) => {

      this.processPostRequest(resource, token, params).subscribe(
        data => {
          if (data && this.sessionActive(data)) {
            console.log("HTTP: Session Active");
            resolve(data);
          } else {
            console
            console.log("HTTP: ALERT Session Expired");
            resolve(null);
          }

        },
        err => {
          console.log("+++++++++++NETWORK ERROR++++++++++++");
          console.log(err);
          reject(err);

        }
      )
    });

  }




  private makeUrl(resource: string, token: string) {

    token = token ? token : "";

    let randomNumber = Math.random() * 1000000;

    //return this.BaseUrl + resource + "&token=" + token + "&iCn=" + this.network + "&cacheSlayer=" + randomNumber;
    return this.BaseUrl + resource + "&iCn=" + this.network + "&cacheSlayer=" + randomNumber;
  }


  /*
  * @Returns BODY ONLY - JSON data. Added 5 second timeout.
  */
  private processGetRequest(resource: string, token: string, params): Observable<any> {

    params.token = token;

    const httpHeaders = new Headers();
    httpHeaders.set('Cache-control', 'no-cache');
    httpHeaders.set('Cache-control', 'no-store');
    httpHeaders.set('Expires', '0');
    httpHeaders.set('Pragma', 'no-cache');


    let options = {
      'observe': 'body',
      'responseType': 'json',
      'params': params,
      'headers': httpHeaders
    };
    console.log("GET Params: ");
    console.log(params);

    return this.httpClient.get(this.makeUrl(resource, token), options);
  }

  /*
  * @Returns BODY ONLY, JSON data
  */
  private processPostRequest(resource: string, token: string, params): Observable<any> {

    let _fakeToken = Math.random() * 12349876;

    let _token = (token == null || !token) ? _fakeToken : token;

    console.log("TOKEN CHECK: USING: "+ _token);
   
    params.token = _token;

    console.log("TOKEN CHECK: Params: ");

    console.log(JSON.stringify(params));

    let payload = this.createPostPayload(params);

    if (!payload) payload = "";

    //let httpHeaders = new Headers();
    /*httpHeaders.append('Cache-control', 'no-cache');
    httpHeaders.append('Cache-control', 'no-store');
    httpHeaders.append('Expires', '0');
    httpHeaders.append('Pragma', 'no-cache');*/
    //httpHeaders.append();
    //httpHeaders.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    //'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8'

    /*const requestOptions = new RequestOptions({ 
      headers: httpHeaders,
      observe: 'body',
      responseType: 'json' 
    });*/

    let options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded'),
      observe: 'body',
      responseType: 'json'
    };

    console.log("POST Params: ");
    console.log(params);

    return this.httpClient.post(this.makeUrl(resource, token), payload, options);

  }

  createPostPayload(data: any): string {
    if (!data) return null;

    let payload: string = "";

    for (var key in data) {
      payload += key + "=" + data[key];
      payload += "&";
    }
    console.log("Payload: " + payload.substring(0, payload.length - 1));

    return payload.substring(0, payload.length - 1);
  }

}
