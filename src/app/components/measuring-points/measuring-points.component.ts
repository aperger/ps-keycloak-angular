import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { ColumnDefinition } from '../table-wrapper/table-wrapper.component';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-measuring-points',
    templateUrl: './measuring-points.component.html',
    styleUrls: ['./measuring-points.component.scss']
})
export class MeasuringPointsComponent {

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
            fieldName: 'company.name',
            fieldType: 'text',
            title: 'Cég',
            filterable: true,
            cell: (element: any) => element.company.name
        },
        {
            fieldName: 'siteName',
            fieldType: 'text',
            title: 'Telephely',
            filterable: true,
            cell: (element: any) => element.site.name
        }
    ];
    url = environment.AXING_API_URL + 'measuring-points';

    constructor(private titleService: Title) { }

    ngOnInit(): void {
        this.titleService.setTitle('Mérési pontok');
    }
}
