import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakLoginOptions } from 'keycloak-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'ps-keycloak-angular';

  constructor (
    private keycloakService: KeycloakService) {}

  private loggedIn = false;

  ngOnInit(): void {
    console.log('Method ngOnInit.');
    this.keycloakService.isLoggedIn().then(reason => {
      console.log(`Logged in? -> ${reason}`);
      this.loggedIn = reason;
    })
  }

  
  public get isLoggedIn() : boolean {
    return this.loggedIn;
  }
  
  login(): Promise<void> {
    const options: KeycloakLoginOptions = {
      locale: 'hu'
    }
    return this.keycloakService.login();
  }

  logout(): Promise<void> {
    return this.keycloakService.logout('http://localhost:4200');
  }
}
