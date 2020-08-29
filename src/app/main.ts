import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./app.module";

// this is the magic wand
//enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);
