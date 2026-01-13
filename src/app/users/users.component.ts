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

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent {
 
    columns: ColumnDefinition[] = [
        {
            fieldName: 'id',
            fieldType: 'text',
            title: 'Felhasználónév',
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
