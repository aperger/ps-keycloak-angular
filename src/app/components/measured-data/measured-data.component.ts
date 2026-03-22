import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Title } from "@angular/platform-browser";
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { ColumnDefinition } from '../table-wrapper/table-wrapper.component';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-measured-data',
    templateUrl: './measured-data.component.html',
    styleUrls: ['./measured-data.component.scss']
})
export class MeasuredDataComponent implements OnInit {

    periodOptions = [
        { value: '15min', label: '15 perc' },
        { value: '1hour', label: '1 óra' },
        { value: '1day', label: '1 nap' },
        { value: '1week', label: '1 hét' },
        { value: '1month', label: '1 hónap' },
    ];

    filterForm: FormGroup;

    columns: ColumnDefinition[] = [
        {
            fieldName: 'periodStart',
            fieldType: 'datetimerange',
            title: 'Periódus kezdete',
            filterable: false,
            cell: (element: any) => this.datePipe.transform(element.periodStart * 1000, 'yyyy-MM-dd\THH:mm:ssZ', undefined, this.locale) ?? element.periodStart
        },
        {
            fieldName: 'value',
            fieldType: 'numeric',
            title: 'Érték',
            filterable: false,
            cell: (element: any) => this.decimalPipe.transform(element.value, '1.2-2', this.locale) ?? element.value
        },
    ];

    url = '';

    private datePipe: DatePipe;
    private decimalPipe: DecimalPipe;

    constructor(private titleService: Title, private fb: FormBuilder, @Inject(LOCALE_ID) private locale: string) {
        this.datePipe = new DatePipe(this.locale);
        this.decimalPipe = new DecimalPipe(this.locale);
        this.filterForm = this.fb.group({
            period: ['1month'],
            measuringPointId: [1645],
            startDate: [new Date('2024-01-01')],
            endDate: [new Date()]
        });
    }

    ngOnInit(): void {
        this.titleService.setTitle('Mért adatok');
        this.buildUrl();
        this.filterForm.valueChanges.pipe(debounceTime(300)).subscribe(() => this.buildUrl());
    }

    private buildUrl(): void {
        const { period, measuringPointId, startDate, endDate } = this.filterForm.value;
        if (!period || !measuringPointId || !startDate || !endDate) return;
        const startTs = Math.floor(startDate.valueOf() / 1000);
        const endTs = Math.floor(endDate.valueOf() / 1000);
        this.url = `${environment.AXING_API_URL}measured-data/${period}/${measuringPointId}/${startTs}/${endTs}`;
    }
}
