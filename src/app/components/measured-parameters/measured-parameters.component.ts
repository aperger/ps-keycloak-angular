import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { ColumnDefinition } from '../table-wrapper/table-wrapper.component';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-measured-parameters',
    templateUrl: './measured-parameters.component.html',
    styleUrls: ['./measured-parameters.component.scss']
})
export class MeasuredParametersComponent {

    columns: ColumnDefinition[] = [
        {
            fieldName: 'id',
            fieldType: 'numeric',
            title: '#',
            filterable: true,
            cell: (element: any) => element.id
        },
        {
            fieldName: 'measuringPointId',
            fieldType: 'text',
            title: 'Mérési pont azonosító',
            filterable: true,
            cell: (element: any) => element.measuringPointId
        },
        {
            fieldName: 'physicalAttributeId',
            fieldType: 'text',
            title: 'Fizikai jellemző azonosító',
            filterable: true,
            cell: (element: any) => element.physicalAttributeId
        }
    ];
    url = environment.AXING_API_URL + 'measured-parameters';

    constructor(private titleService: Title) { }

    ngOnInit(): void {
        this.titleService.setTitle('Mérési paraméterek');
    }
}
