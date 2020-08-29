import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SaBankListProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SaBankListProvider {

  private list: Array<{"name":string, "brandname":string, "branchcode":string, "swiftcode":string, "selected":boolean }>;
  

  constructor(public http: HttpClient) {
    this.setList();
  }

  public getList(): Promise<any>{ 
    return new Promise((resolve, reject) => {
      resolve(this.list);
    });
  }

  private setList(){
    this.list = [
      {
        "name": "Absa Bank Limited",
        "brandname": "ABSA",
        "branchcode": "632 005",
        "swiftcode": "ABSAZAJJXXX",
        "selected": false
      },
      {
        "name": "African Bank Limited",
        "brandname": "African Bank",
        "branchcode": "430 000",
        "swiftcode": "AFRCZAJJXXX",
        "selected": false
      },
      {
        "name": "Bidvest Bank Limited",
        "brandname": "Bidvest Bank",
        "branchcode": "462 005",
        "swiftcode": "BIDBZAJJXXX",
        "selected": false
      },
      {
        "name": "Capitec Bank Limited",
        "brandname": "Capitec",
        "branchcode": "470 010",
        "swiftcode": "CABLZAJJXXX",
        "selected": false
      },
      {
        "name": "Discovery Bank Limited",
        "brandname": "Discovery Bank",
        "branchcode": "679 000",
        "swiftcode": "DISCZAJJ",
        "selected": false
      },
      {
        "name": "First National Bank (FNB)",
        "brandname": "FNB",
        "branchcode": "250 655",
        "swiftcode": "FIRNZAJJ",
        "selected": false
      },
      {
        "name": "FirstRand Bank - A subsidiary of First Rand Limited",
        "brandname": "FirstRand Bank",
        "branchcode": "250 655",
        "swiftcode": "FIRNZAJJRSL",
        "selected": false
      },
      {
        "name": "Grindrod Bank Limited",
        "brandname": "Grindrod Bank",
        "branchcode": "223 626",
        "swiftcode": "GRIDZAJJXXX",
        "selected": false
      },
      {
        "name": "Investec Bank Limited",
        "brandname": "Investec",
        "branchcode": "580 105",
        "swiftcode": "IVESZAJJXXX",
        "selected": false
      },
      {
        "name": "Merchantile Bank Limited",
        "brandname": "Mercantile Bank",
        "branchcode": "450 105",
        "swiftcode": "LISAZAJJXXX",
        "selected": false
      },
      {
        "name": "Nedbank Limited",
        "brandname": "Nedbank",
        "branchcode": "198 765",
        "swiftcode": "NEDSZAJJXXX",
        "selected": false
      },
      {
        "name": "Old Mutual",
        "brandname": "Old Mutual Bank",
        "branchcode": "462 005",
        "swiftcode": "OMAMZAJC XXX",
        "selected": false
      },
      {
        "name": "Sasfin Bank Limited",
        "brandname": "Sasfin Bank",
        "branchcode": "683 000",
        "swiftcode": "SASFZAJJXXX",
        "selected": false
      },
      {
        "name": "Standard Bank of South Africa",
        "brandname": "Standard Bank ",
        "branchcode": "051 001",
        "swiftcode": "SBZAZAJJ",
        "selected": false
      },
      {
        "name": "SA Post Bank (Post Office)",
        "brandname": "Post Bank",
        "branchcode": "460 005",
        "swiftcode": "SBZAZAJJ",
        "selected": false
      },
      {
        "name": "Tyme Bank",
        "brandname": "Tyme Bank",
        "branchcode": "678 910",
        "swiftcode": "CBZAZAJJ",
        "selected": false
      }
     ]
  }

}
