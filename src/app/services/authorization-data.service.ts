import { Injectable } from '@angular/core';
import { KeycloakService } from "keycloak-angular";
import { of, Subject } from "rxjs";
import { KeycloakLoginOptions } from "keycloak-js";
import { AppUrlService } from "./app-url.service";
import { MenuItem } from "../models/MenuItem";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";

export interface KeycloakUserInfo {
  email: string;
  email_verified: true;
  family_name: string;
  given_name: string;
  locale: string;
  name: string;
  preferred_username: string;
  realm_access: string[];
  sub: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthorizationDataService {
  private keycloakProfile: KeycloakUserInfo | null = null;
  private loginSubject = new Subject<boolean>();
  private menuitemsSubject = new Subject<MenuItem[]>();

  constructor(
    private keycloakService: KeycloakService,
    private appUrlService: AppUrlService,
    private httpClient: HttpClient
  ) {

    //this.appUrlService.init(this.router);
    console.log('Method ngOnInit.');
    this.keycloakService.isLoggedIn().then(status => {
      
      if (!!status) {
        this.getUserInfo().subscribe(profile => {
          this.keycloakProfile = profile;
          this.notifyLogin(status);
        });
      }
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


  async login(): Promise<void> {
    const options: KeycloakLoginOptions = {
      locale: 'hu'
    }
    await this.keycloakService.login();
    const status = await this.keycloakService.isLoggedIn();
    if (status) {
      this.getUserInfo().subscribe(profile => {
        this.keycloakProfile = profile;
        this.notifyLogin(status);
      });
    }
  }

  logout(): Promise<void> {
    return this.keycloakService.logout(this.appUrlService.appBaseUrl /*window.location.origin*/);
  }

  getMenuItems() {
    const menuItems: MenuItem[] = [
      {
        name: 'Felhasználók',
        icon: 'person',
        url: '/felhasznalok'
      },
      {
        name: 'Cégek',
        icon: 'corporate_fare',
        url: '/cegek'
      }
    ];
    return of(menuItems);
  }

  getUserInfo() {
    let absoluteUrl = `${environment.KEYCLOAK_URL}/realms/${environment.KEYCLOAK_REALM}/protocol/openid-connect/userinfo`
    return this.httpClient.get<KeycloakUserInfo>(absoluteUrl);
  }

  public get profile(): KeycloakUserInfo | null {
    return this.keycloakProfile;
  }

}
