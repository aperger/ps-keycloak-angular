import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { ColumnDefinition } from '../components/table-wrapper/table-wrapper.component';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-companies',
    templateUrl: './companies.component.html',
    styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent {

    columns: ColumnDefinition[] = [
        {
            fieldName: 'id',
            fieldType: 'numeric',
            title: '#',
            filterable: true,
            cell: (element: any) => element.id
        },
        {
            fieldName: 'name',
            fieldType: 'text',
            title: 'Név',
            filterable: true,
            cell: (element: any) => element.name
        },
        {
            fieldName: 'country',
            fieldType: 'text',
            title: 'Ország',
            filterable: true,
            cell: (element: any) => element.country
        },
        {
            fieldName: 'city',
            fieldType: 'text',
            title: 'Település',
            filterable: true,
            cell: (element: any) => element.city
        },
        {
            fieldName: 'address',
            fieldType: 'text',
            title: 'Utca/Házszám',
            filterable: true,
            cell: (element: any) => element.address
        }
    ];
    urlCompanies = environment.AXING_API_URL + 'companies';

    constructor(private titleService: Title) { }

    ngOnInit(): void {
        this.titleService.setTitle('Cégek');
    }
}
