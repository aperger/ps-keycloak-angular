import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 2, name: 'Neon', weight: 20.1797, symbol: 'Ne'}
];
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  constructor(private titleService: Title) {
  }
  ngOnInit(): void {
    this.titleService.setTitle('Cégek');
  }
}
