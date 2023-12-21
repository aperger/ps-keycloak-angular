import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ResourceServerService } from '../services/resource-server.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  response = '';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private service: ResourceServerService) {} 

  onClickelcom1() {
    const url = 'https://ps-reactive-api.azurewebsites.net/api/message/welcome';
    this.service.getText(url).subscribe(response => {
      this.response = response;
    })
  }

  onClickelcom2() {
    const url = 'https://ps-servlet-api.azurewebsites.net/api/message/welcome';
    this.service.getText(url).subscribe(response => {
      this.response = response;
    })
  }


}
