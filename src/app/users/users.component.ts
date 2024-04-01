import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { ColumnDefinition } from '../components/table-wrapper/table-wrapper.component';
import { environment } from 'src/environments/environment';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' }
];

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent {
    
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    dataSource = ELEMENT_DATA;

    columns: ColumnDefinition[] = [
        {
            fieldName: 'userId',
            fieldType: 'text',
            title: 'Felhasználónév',
            filterable: false,
            cell: (element: any) => element.userId
        },
        {
            fieldName: 'name',
            fieldType: 'text',
            title: 'Név',
            filterable: true,
            cell: (element: any) => element.name
        },
        {
            fieldName: 'email',
            fieldType: 'text',
            title: 'E-mail',
            filterable: true,
            cell: (element: any) => element.email
        }
    ];
    embeddedName = 'users';
    urlUsers =  environment.AXING_API_URL + 'users';
    
    constructor(private titleService: Title) { }

    ngOnInit(): void {
        this.titleService.setTitle('Felhasználók');
    }

}
