import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent {
  constructor(private titleService: Title) {
  }
  ngOnInit(): void {
    this.titleService.setTitle('Cégek');
  }
}
