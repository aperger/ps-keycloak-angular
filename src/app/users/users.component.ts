import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  constructor(private titleService: Title) {
  }
  ngOnInit(): void {
    this.titleService.setTitle('Felhasználók');
  }
}
