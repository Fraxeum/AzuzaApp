import { Injectable } from '@angular/core';

@Injectable()
export class CountryListProvider {

 public list:Array<{"name":string,"id":number, "selected":boolean}>;

 constructor() {
    this.setList();
  }

  public getList(): Promise<any>{ 
    return new Promise((resolve, reject) => {
      resolve(this.list);
    });
    
  }

  //legacy - registration page
  public getCountryList(){ return this.getList(); }

  private setList(){
    this.list = [
      {
        "name": "Afghanistan",
        "id": 4,
        "selected": false
      },
      {
        "name": "Aland Islands",
        "id": 248,
        "selected": false
      },
      {
        "name": "Albania",
        "id": 8,
        "selected": false
      },
      {
        "name": "Algeria",
        "id": 12,
        "selected": false
      },
      {
        "name": "American Samoa",
        "id": 16,
        "selected": false
      },
      {
        "name": "Andorra",
        "id": 20,
        "selected": false
      },
      {
        "name": "Angola",
        "id": 24,
        "selected": false
      },
      {
        "name": "Anguilla",
        "id": 660,
        "selected": false
      },
      {
        "name": "Antarctica",
        "id": 10,
        "selected": false
      },
      {
        "name": "Antigua and Barbuda",
        "id": 28,
        "selected": false
      },
      {
        "name": "Argentina",
        "id": 32,
        "selected": false
      },
      {
        "name": "Armenia",
        "id": 51,
        "selected": false
      },
      {
        "name": "Aruba",
        "id": 533,
        "selected": false
      },
      {
        "name": "Australia",
        "id": 36,
        "selected": false
      },
      {
        "name": "Austria",
        "id": 40,
        "selected": false
      },
      {
        "name": "Azerbaijan",
        "id": 31,
        "selected": false
      },
      {
        "name": "Bahamas",
        "id": 44,
        "selected": false
      },
      {
        "name": "Bahrain",
        "id": 48,
        "selected": false
      },
      {
        "name": "Bangladesh",
        "id": 50,
        "selected": false
      },
      {
        "name": "Barbados",
        "id": 52,
        "selected": false
      },
      {
        "name": "Belarus",
        "id": 112,
        "selected": false
      },
      {
        "name": "Belgium",
        "id": 56,
        "selected": false
      },
      {
        "name": "Belize",
        "id": 84,
        "selected": false
      },
      {
        "name": "Benin",
        "id": 204,
        "selected": false
      },
      {
        "name": "Bermuda",
        "id": 60,
        "selected": false
      },
      {
        "name": "Bhutan",
        "id": 64,
        "selected": false
      },
      {
        "name": "Bolivia, Plurinational State of",
        "id": 68,
        "selected": false
      },
      {
        "name": "Bonaire, Sint Eustatius and Saba",
        "id": 535,
        "selected": false
      },
      {
        "name": "Bosnia and Herzegovina",
        "id": 70,
        "selected": false
      },
      {
        "name": "Botswana",
        "id": 72,
        "selected": false
      },
      {
        "name": "Bouvet Island",
        "id": 74,
        "selected": false
      },
      {
        "name": "Brazil",
        "id": 76,
        "selected": false
      },
      {
        "name": "British Indian Ocean Territory",
        "id": 86,
        "selected": false
      },
      {
        "name": "Brunei Darussalam",
        "id": 96,
        "selected": false
      },
      {
        "name": "Bulgaria",
        "id": 100,
        "selected": false
      },
      {
        "name": "Burkina Faso",
        "id": 854,
        "selected": false
      },
      {
        "name": "Burundi",
        "id": 108,
        "selected": false
      },
      {
        "name": "Cambodia",
        "id": 116,
        "selected": false
      },
      {
        "name": "Cameroon",
        "id": 120,
        "selected": false
      },
      {
        "name": "Canada",
        "id": 124,
        "selected": false
      },
      {
        "name": "Cape Verde",
        "id": 132,
        "selected": false
      },
      {
        "name": "Cayman Islands",
        "id": 136,
        "selected": false
      },
      {
        "name": "Central African Republic",
        "id": 140,
        "selected": false
      },
      {
        "name": "Chad",
        "id": 148,
        "selected": false
      },
      {
        "name": "Chile",
        "id": 152,
        "selected": false
      },
      {
        "name": "China",
        "id": 156,
        "selected": false
      },
      {
        "name": "Christmas Island",
        "id": 162,
        "selected": false
      },
      {
        "name": "Cocos (Keeling) Islands",
        "id": 166,
        "selected": false
      },
      {
        "name": "Colombia",
        "id": 170,
        "selected": false
      },
      {
        "name": "Comoros",
        "id": 174,
        "selected": false
      },
      {
        "name": "Congo",
        "id": 178,
        "selected": false
      },
      {
        "name": "Congo, the Democratic Republic of the",
        "id": 180,
        "selected": false
      },
      {
        "name": "Cook Islands",
        "id": 184,
        "selected": false
      },
      {
        "name": "Costa Rica",
        "id": 188,
        "selected": false
      },
      {
        "name": "CÙte d'Ivoire",
        "id": 384,
        "selected": false
      },
      {
        "name": "Croatia",
        "id": 191,
        "selected": false
      },
      {
        "name": "Cuba",
        "id": 192,
        "selected": false
      },
      {
        "name": "CuraÁao",
        "id": 531,
        "selected": false
      },
      {
        "name": "Cyprus",
        "id": 196,
        "selected": false
      },
      {
        "name": "Czech Republic",
        "id": 203,
        "selected": false
      },
      {
        "name": "Denmark",
        "id": 208,
        "selected": false
      },
      {
        "name": "Djibouti",
        "id": 262,
        "selected": false
      },
      {
        "name": "Dominica",
        "id": 212,
        "selected": false
      },
      {
        "name": "Dominican Republic",
        "id": 214,
        "selected": false
      },
      {
        "name": "Ecuador",
        "id": 218,
        "selected": false
      },
      {
        "name": "Egypt",
        "id": 818,
        "selected": false
      },
      {
        "name": "El Salvador",
        "id": 222,
        "selected": false
      },
      {
        "name": "Equatorial Guinea",
        "id": 226,
        "selected": false
      },
      {
        "name": "Eritrea",
        "id": 232,
        "selected": false
      },
      {
        "name": "Estonia",
        "id": 233,
        "selected": false
      },
      {
        "name": "Ethiopia",
        "id": 231,
        "selected": false
      },
      {
        "name": "Falkland Islands (Malvinas)",
        "id": 238,
        "selected": false
      },
      {
        "name": "Faroe Islands",
        "id": 234,
        "selected": false
      },
      {
        "name": "Fiji",
        "id": 242,
        "selected": false
      },
      {
        "name": "Finland",
        "id": 246,
        "selected": false
      },
      {
        "name": "France",
        "id": 250,
        "selected": false
      },
      {
        "name": "French Guiana",
        "id": 254,
        "selected": false
      },
      {
        "name": "French Polynesia",
        "id": 258,
        "selected": false
      },
      {
        "name": "French Southern Territories",
        "id": 260,
        "selected": false
      },
      {
        "name": "Gabon",
        "id": 266,
        "selected": false
      },
      {
        "name": "Gambia",
        "id": 270,
        "selected": false
      },
      {
        "name": "Georgia",
        "id": 268,
        "selected": false
      },
      {
        "name": "Germany",
        "id": 276,
        "selected": false
      },
      {
        "name": "Ghana",
        "id": 288,
        "selected": false
      },
      {
        "name": "Gibraltar",
        "id": 292,
        "selected": false
      },
      {
        "name": "Greece",
        "id": 300,
        "selected": false
      },
      {
        "name": "Greenland",
        "id": 304,
        "selected": false
      },
      {
        "name": "Grenada",
        "id": 308,
        "selected": false
      },
      {
        "name": "Guadeloupe",
        "id": 312,
        "selected": false
      },
      {
        "name": "Guam",
        "id": 316,
        "selected": false
      },
      {
        "name": "Guatemala",
        "id": 320,
        "selected": false
      },
      {
        "name": "Guernsey",
        "id": 831,
        "selected": false
      },
      {
        "name": "Guinea",
        "id": 324,
        "selected": false
      },
      {
        "name": "Guinea-Bissau",
        "id": 624,
        "selected": false
      },
      {
        "name": "Guyana",
        "id": 328,
        "selected": false
      },
      {
        "name": "Haiti",
        "id": 332,
        "selected": false
      },
      {
        "name": "Heard Island and McDonald Islands",
        "id": 334,
        "selected": false
      },
      {
        "name": "Holy See (Vatican City State)",
        "id": 336,
        "selected": false
      },
      {
        "name": "Honduras",
        "id": 340,
        "selected": false
      },
      {
        "name": "Hong Kong",
        "id": 344,
        "selected": false
      },
      {
        "name": "Hungary",
        "id": 348,
        "selected": false
      },
      {
        "name": "Iceland",
        "id": 352,
        "selected": false
      },
      {
        "name": "India",
        "id": 356,
        "selected": false
      },
      {
        "name": "Indonesia",
        "id": 360,
        "selected": false
      },
      {
        "name": "Iran, Islamic Republic of",
        "id": 364,
        "selected": false
      },
      {
        "name": "Iraq",
        "id": 368,
        "selected": false
      },
      {
        "name": "Ireland",
        "id": 372,
        "selected": false
      },
      {
        "name": "Isle of Man",
        "id": 833,
        "selected": false
      },
      {
        "name": "Israel",
        "id": 376,
        "selected": false
      },
      {
        "name": "Italy",
        "id": 380,
        "selected": false
      },
      {
        "name": "Jamaica",
        "id": 388,
        "selected": false
      },
      {
        "name": "Japan",
        "id": 392,
        "selected": false
      },
      {
        "name": "Jersey",
        "id": 832,
        "selected": false
      },
      {
        "name": "Jordan",
        "id": 400,
        "selected": false
      },
      {
        "name": "Kazakhstan",
        "id": 398,
        "selected": false
      },
      {
        "name": "Kenya",
        "id": 404,
        "selected": false
      },
      {
        "name": "Kiribati",
        "id": 296,
        "selected": false
      },
      {
        "name": "Korea, Democratic People's Republic of",
        "id": 408,
        "selected": false
      },
      {
        "name": "Korea, Republic of",
        "id": 410,
        "selected": false
      },
      {
        "name": "Kuwait",
        "id": 414,
        "selected": false
      },
      {
        "name": "Kyrgyzstan",
        "id": 417,
        "selected": false
      },
      {
        "name": "Lao People's Democratic Republic",
        "id": 418,
        "selected": false
      },
      {
        "name": "Latvia",
        "id": 428,
        "selected": false
      },
      {
        "name": "Lebanon",
        "id": 422,
        "selected": false
      },
      {
        "name": "Lesotho",
        "id": 426,
        "selected": false
      },
      {
        "name": "Liberia",
        "id": 430,
        "selected": false
      },
      {
        "name": "Libya",
        "id": 434,
        "selected": false
      },
      {
        "name": "Liechtenstein",
        "id": 438,
        "selected": false
      },
      {
        "name": "Lithuania",
        "id": 440,
        "selected": false
      },
      {
        "name": "Luxembourg",
        "id": 442,
        "selected": false
      },
      {
        "name": "Macao",
        "id": 446,
        "selected": false
      },
      {
        "name": "Macedonia, the former Yugoslav Republic of",
        "id": 807,
        "selected": false
      },
      {
        "name": "Madagascar",
        "id": 450,
        "selected": false
      },
      {
        "name": "Malawi",
        "id": 454,
        "selected": false
      },
      {
        "name": "Malaysia",
        "id": 458,
        "selected": false
      },
      {
        "name": "Maldives",
        "id": 462,
        "selected": false
      },
      {
        "name": "Mali",
        "id": 466,
        "selected": false
      },
      {
        "name": "Malta",
        "id": 470,
        "selected": false
      },
      {
        "name": "Marshall Islands",
        "id": 584,
        "selected": false
      },
      {
        "name": "Martinique",
        "id": 474,
        "selected": false
      },
      {
        "name": "Mauritania",
        "id": 478,
        "selected": false
      },
      {
        "name": "Mauritius",
        "id": 480,
        "selected": false
      },
      {
        "name": "Mayotte",
        "id": 175,
        "selected": false
      },
      {
        "name": "Mexico",
        "id": 484,
        "selected": false
      },
      {
        "name": "Micronesia, Federated States of",
        "id": 583,
        "selected": false
      },
      {
        "name": "Moldova, Republic of",
        "id": 498,
        "selected": false
      },
      {
        "name": "Monaco",
        "id": 492,
        "selected": false
      },
      {
        "name": "Mongolia",
        "id": 496,
        "selected": false
      },
      {
        "name": "Montenegro",
        "id": 499,
        "selected": false
      },
      {
        "name": "Montserrat",
        "id": 500,
        "selected": false
      },
      {
        "name": "Morocco",
        "id": 504,
        "selected": false
      },
      {
        "name": "Mozambique",
        "id": 508,
        "selected": false
      },
      {
        "name": "Myanmar",
        "id": 104,
        "selected": false
      },
      {
        "name": "Namibia",
        "id": 516,
        "selected": false
      },
      {
        "name": "Nauru",
        "id": 520,
        "selected": false
      },
      {
        "name": "Nepal",
        "id": 524,
        "selected": false
      },
      {
        "name": "Netherlands",
        "id": 528,
        "selected": false
      },
      {
        "name": "New Caledonia",
        "id": 540,
        "selected": false
      },
      {
        "name": "New Zealand",
        "id": 554,
        "selected": false
      },
      {
        "name": "Nicaragua",
        "id": 558,
        "selected": false
      },
      {
        "name": "Niger",
        "id": 562,
        "selected": false
      },
      {
        "name": "Nigeria",
        "id": 566,
        "selected": false
      },
      {
        "name": "Niue",
        "id": 570,
        "selected": false
      },
      {
        "name": "Norfolk Island",
        "id": 574,
        "selected": false
      },
      {
        "name": "Northern Mariana Islands",
        "id": 580,
        "selected": false
      },
      {
        "name": "Norway",
        "id": 578,
        "selected": false
      },
      {
        "name": "Oman",
        "id": 512,
        "selected": false
      },
      {
        "name": "Pakistan",
        "id": 586,
        "selected": false
      },
      {
        "name": "Palau",
        "id": 585,
        "selected": false
      },
      {
        "name": "Palestinian Territory, Occupied",
        "id": 275,
        "selected": false
      },
      {
        "name": "Panama",
        "id": 591,
        "selected": false
      },
      {
        "name": "Papua New Guinea",
        "id": 598,
        "selected": false
      },
      {
        "name": "Paraguay",
        "id": 600,
        "selected": false
      },
      {
        "name": "Peru",
        "id": 604,
        "selected": false
      },
      {
        "name": "Philippines",
        "id": 608,
        "selected": false
      },
      {
        "name": "Pitcairn",
        "id": 612,
        "selected": false
      },
      {
        "name": "Poland",
        "id": 616,
        "selected": false
      },
      {
        "name": "Portugal",
        "id": 620,
        "selected": false
      },
      {
        "name": "Puerto Rico",
        "id": 630,
        "selected": false
      },
      {
        "name": "Qatar",
        "id": 634,
        "selected": false
      },
      {
        "name": "RÈunion",
        "id": 638,
        "selected": false
      },
      {
        "name": "Romania",
        "id": 642,
        "selected": false
      },
      {
        "name": "Russian Federation",
        "id": 643,
        "selected": false
      },
      {
        "name": "Rwanda",
        "id": 646,
        "selected": false
      },
      {
        "name": "Saint BarthÈlemy",
        "id": 652,
        "selected": false
      },
      {
        "name": "Saint Helena, Ascension and Tristan da Cunha",
        "id": 654,
        "selected": false
      },
      {
        "name": "Saint Kitts and Nevis",
        "id": 659,
        "selected": false
      },
      {
        "name": "Saint Lucia",
        "id": 662,
        "selected": false
      },
      {
        "name": "Saint Martin (French part)",
        "id": 663,
        "selected": false
      },
      {
        "name": "Saint Pierre and Miquelon",
        "id": 666,
        "selected": false
      },
      {
        "name": "Saint Vincent and the Grenadines",
        "id": 670,
        "selected": false
      },
      {
        "name": "Samoa",
        "id": 882,
        "selected": false
      },
      {
        "name": "San Marino",
        "id": 674,
        "selected": false
      },
      {
        "name": "Sao Tome and Principe",
        "id": 678,
        "selected": false
      },
      {
        "name": "Saudi Arabia",
        "id": 682,
        "selected": false
      },
      {
        "name": "Senegal",
        "id": 686,
        "selected": false
      },
      {
        "name": "Serbia",
        "id": 688,
        "selected": false
      },
      {
        "name": "Seychelles",
        "id": 690,
        "selected": false
      },
      {
        "name": "Sierra Leone",
        "id": 694,
        "selected": false
      },
      {
        "name": "Singapore",
        "id": 702,
        "selected": false
      },
      {
        "name": "Sint Maarten (Dutch part)",
        "id": 534,
        "selected": false
      },
      {
        "name": "Slovakia",
        "id": 703,
        "selected": false
      },
      {
        "name": "Slovenia",
        "id": 705,
        "selected": false
      },
      {
        "name": "Solomon Islands",
        "id": 90,
        "selected": false
      },
      {
        "name": "Somalia",
        "id": 706,
        "selected": false
      },
      {
        "name": "South Africa",
        "id": 710,
        "selected": false
      },
      {
        "name": "South Georgia and the South Sandwich Islands",
        "id": 239,
        "selected": false
      },
      {
        "name": "South Sudan",
        "id": 728,
        "selected": false
      },
      {
        "name": "Spain",
        "id": 724,
        "selected": false
      },
      {
        "name": "Sri Lanka",
        "id": 144,
        "selected": false
      },
      {
        "name": "Sudan",
        "id": 729,
        "selected": false
      },
      {
        "name": "Suriname",
        "id": 740,
        "selected": false
      },
      {
        "name": "Svalbard and Jan Mayen",
        "id": 744,
        "selected": false
      },
      {
        "name": "Swaziland",
        "id": 748,
        "selected": false
      },
      {
        "name": "Sweden",
        "id": 752,
        "selected": false
      },
      {
        "name": "Switzerland",
        "id": 756,
        "selected": false
      },
      {
        "name": "Syrian Arab Republic",
        "id": 760,
        "selected": false
      },
      {
        "name": "Taiwan, Province of China",
        "id": 158,
        "selected": false
      },
      {
        "name": "Tajikistan",
        "id": 762,
        "selected": false
      },
      {
        "name": "Tanzania, United Republic of",
        "id": 834,
        "selected": false
      },
      {
        "name": "Thailand",
        "id": 764,
        "selected": false
      },
      {
        "name": "Timor-Leste",
        "id": 626,
        "selected": false
      },
      {
        "name": "Togo",
        "id": 768,
        "selected": false
      },
      {
        "name": "Tokelau",
        "id": 772,
        "selected": false
      },
      {
        "name": "Tonga",
        "id": 776,
        "selected": false
      },
      {
        "name": "Trinidad and Tobago",
        "id": 780,
        "selected": false
      },
      {
        "name": "Tunisia",
        "id": 788,
        "selected": false
      },
      {
        "name": "Turkey",
        "id": 792,
        "selected": false
      },
      {
        "name": "Turkmenistan",
        "id": 795,
        "selected": false
      },
      {
        "name": "Turks and Caicos Islands",
        "id": 796,
        "selected": false
      },
      {
        "name": "Tuvalu",
        "id": 798,
        "selected": false
      },
      {
        "name": "Uganda",
        "id": 800,
        "selected": false
      },
      {
        "name": "Ukraine",
        "id": 804,
        "selected": false
      },
      {
        "name": "United Arab Emirates",
        "id": 784,
        "selected": false
      },
      {
        "name": "United Kingdom",
        "id": 826,
        "selected": false
      },
      {
        "name": "United States",
        "id": 840,
        "selected": false
      },
      {
        "name": "United States Minor Outlying Islands",
        "id": 581,
        "selected": false
      },
      {
        "name": "Uruguay",
        "id": 858,
        "selected": false
      },
      {
        "name": "Uzbekistan",
        "id": 860,
        "selected": false
      },
      {
        "name": "Vanuatu",
        "id": 548,
        "selected": false
      },
      {
        "name": "Venezuela, Bolivarian Republic of",
        "id": 862,
        "selected": false
      },
      {
        "name": "Viet Nam",
        "id": 704,
        "selected": false
      },
      {
        "name": "Virgin Islands, British",
        "id": 92,
        "selected": false
      },
      {
        "name": "Virgin Islands, U.S.",
        "id": 850,
        "selected": false
      },
      {
        "name": "Wallis and Futuna",
        "id": 876,
        "selected": false
      },
      {
        "name": "Western Sahara",
        "id": 732,
        "selected": false
      },
      {
        "name": "Yemen",
        "id": 887,
        "selected": false
      },
      {
        "name": "Zambia",
        "id": 894,
        "selected": false
      },
      {
        "name": "Zimbabwe",
        "id": 716,
        "selected": false
      }
     ];
  }

  
}
