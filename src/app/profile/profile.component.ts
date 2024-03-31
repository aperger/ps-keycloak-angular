import { Component } from '@angular/core';
import { ColumnDefinition } from '../components/table-wrapper/table-wrapper.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
    columns: ColumnDefinition[] = [
        {
            fieldName: 'userId',
            fieldType: 'numeric',
            title: 'Felhasználónév',
            filterable: false,
            cell: (element: any) => element.userId
        },
        {
            fieldName: 'name',
            fieldType: 'text',
            title: 'Név',
            filterable: false,
            cell: (element: any) => element.name
        },
        {
            fieldName: 'email',
            fieldType: 'text',
            title: 'Ország',
            filterable: false,
            cell: (element: any) => element.email
        }
    ];
    embeddedName = 'users';
    //urlUsers = 'https://axing55.axing.hu/api/rest/v20/users';
    urlUsers = 'http://localhost:8080/api/rest/v20/users';
}
