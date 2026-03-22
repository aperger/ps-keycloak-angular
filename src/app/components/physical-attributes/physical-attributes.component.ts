import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { ColumnDefinition } from '../table-wrapper/table-wrapper.component';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-physical-attributes',
    templateUrl: './physical-attributes.component.html',
    styleUrls: ['./physical-attributes.component.scss']
})
export class PhysicalAttributesComponent {

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
            fieldName: 'unitName',
            fieldType: 'text',
            title: 'Mértékegység',
            filterable: true,
            cell: (element: any) => element.unitName
        }
    ];
    url = environment.AXING_API_URL + 'physical-attributes';

    constructor(private titleService: Title) { }

    ngOnInit(): void {
        this.titleService.setTitle('Fizikai jellemzők');
    }
}
