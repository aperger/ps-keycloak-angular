import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AppUrlService {

  public appBaseUrl!: string;

  constructor() { 
    this.appBaseUrl = window.location.origin;
    console.log("appBaseUrl: " + this.appBaseUrl);
  }

  
  init(baseRouter: Router) {
    /*this.appBaseUrl = baseRouter.url;
    console.log("App BASE-URL is: " + this.appBaseUrl)
    console.log("Origin: " + window.location.origin);
    console.log("href: " + window.location.href);
    console.log("Pathname: " + window.location.pathname);

    console.log("Path: " + this.location.path());
    console.log("Extarnal URL: " + this.location.prepareExternalUrl('/'));
    console.log("BaseHref: " + this.locationStrategy.getBaseHref());*/
  }

}