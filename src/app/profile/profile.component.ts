import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(private titleService: Title) {
  }
  ngOnInit(): void {
    this.titleService.setTitle('Profil');
  }
}
