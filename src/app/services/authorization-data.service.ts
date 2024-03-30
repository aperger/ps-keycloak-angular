import {Injectable} from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {Subject} from "rxjs";
import {KeycloakLoginOptions} from "keycloak-js";
import {AppUrlService} from "./app-url.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationDataService {
  private loginSubject = new Subject<boolean>();

  constructor(private keycloakService: KeycloakService, private appUrlService: AppUrlService) {

    //this.appUrlService.init(this.router);
    console.log('Method ngOnInit.');
    this.keycloakService.isLoggedIn().then(status => {
      this.notifyLogin(status);
    })
  }

  // Method to notify subscribers when login occurs
  notifyLogin(status: boolean) {
    this.loginSubject.next(status);
  }

  // Method to subscribe to login events
  onLogin() {
    return this.loginSubject.asObservable();
  }


  login(): Promise<void> {
    const options: KeycloakLoginOptions = {
      locale: 'hu'
    }
    return this.keycloakService.login();
  }

  logout(): Promise<void> {
    return this.keycloakService.logout(this.appUrlService.appBaseUrl /*window.location.origin*/);
  }
}
