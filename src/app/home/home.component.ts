import { Component } from '@angular/core';
import { ColumnDefinition } from '../components/table-wrapper/table-wrapper.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    columns: ColumnDefinition[] = [
        {
            fieldName: 'id',
            fieldType: 'numeric',
            title: '#',
            filterable: false,
            cell: (element: any) => element.id
        },
        {
            fieldName: 'name',
            fieldType: 'text',
            title: 'Név',
            filterable: false,
            cell: (element: any) => element.name
        },
        {
            fieldName: 'country',
            fieldType: 'text',
            title: 'Ország',
            filterable: false,
            cell: (element: any) => element.country
        },
        {
            fieldName: 'city',
            fieldType: 'text',
            title: 'Település',
            filterable: false,
            cell: (element: any) => element.city
        },
        {
            fieldName: 'address',
            fieldType: 'text',
            title: 'Utca/Házszám',
            filterable: false,
            cell: (element: any) => element.address
        }
    ];
    embeddedName = 'companies';
    //urlCompanies = 'https://axing55.axing.hu/api/rest/v20/companies';
    urlCompanies = 'http://localhost:8080/api/rest/v20/companies';
}
