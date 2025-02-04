import {Component, OnInit} from '@angular/core';
import {AuthorizationDataService, KeycloakUserInfo} from "./services/authorization-data.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = '';

  constructor(
    private authSrv: AuthorizationDataService, private titleService: Title) {
  }

  private loggedIn = false;
  public profile: KeycloakUserInfo | null = null;

  ngOnInit(): void {
    this.titleService.setTitle('');
    this.authSrv.onLogin().subscribe(status => {
      this.loggedIn = status;
      this.profile = this.authSrv.profile;
    });
  }

  public get isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(): Promise<void> {
    return this.authSrv.login();
  }

  logout(): Promise<void> {
    return this.authSrv.logout();
  }
}
