import { DatePipe } from '@angular/common';
import { HttpClient, HttpUrlEncodingCodec } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDateRangeInput, MatDateRangePicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { Observable, catchError, map, merge, of, startWith, switchMap, tap } from 'rxjs';

export interface KeyValuePair {
    key: string;
    value: string;
}

export interface ColumnDefinition {
    allowRowClick?: boolean;
    fieldName: string;
    fieldType: 'text' | 'numeric' | 'daterange' | 'datetimerange' | 'dropdown' | 'selection';
    title: string;
    filterable: boolean;
    sortDisabled?: boolean;
    filterOptions?: KeyValuePair[];
    cell: (element: any) => string;
}

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'axing-table-wrapper',
    templateUrl: './table-wrapper.component.html',
    styleUrls: ['./table-wrapper.component.scss']
})
export class TableWrapperComponent implements OnInit, AfterViewInit {

    @Input() dataSource: any[];
    @Input() restApiurl: string;
    @Input() embeddedName: string = '';
    @Input() pageIndexParamName: string = 'page';
    @Input() pageSizeParamName: string = 'size';
    @Input() defaultSortField: string = 'id';
    @Input() sortParamName: string = 'sort';
    @Input() columns: ColumnDefinition[];
    @Input() filterInputTimeout = 1000;
    @Input() preFilters: KeyValuePair[];
    @Input() hidePagination: boolean = false;
    // set preFilters(pairs : KeyValuePair[]) {
    //   const controlDisabledInit = new Map<string, any>();
    //   pairs?.forEach(p => {
    //       this.filterForm.get(p.key)?.setValue(p.value);
    //   });
    // }


    @Output() rowClick = new EventEmitter<{ data: any, column: ColumnDefinition, event: Event }>();
    @Output() pageLoad = new EventEmitter<PageEvent>();
    @Output() filterChange = new EventEmitter<IterableIterator<[string, any]>>();

    displayedColumns: string[] = [];

    firstCall = true;
    isLoadingResults = false;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    restApi!: RestApi;

    private queryString = '';

    public get showFilter(): boolean {
        return this.columns.filter(def => def.filterable).length > 0;
    }

    filterForm: FormGroup = new FormGroup({});

    constructor(
        private httpClient: HttpClient,
        private formBuilder: FormBuilder
    ) {
        this.dataSource = [];
        this.restApiurl = '';
        this.columns = [];
        this.preFilters = [];
    }

    ngOnInit(): void {
        this.displayedColumns = this.columns.map(c => c.fieldName);

        const controls: any = {};
        this.columns.forEach(columnDef => {
            if (columnDef.fieldType === 'daterange' || columnDef.fieldType === 'datetimerange') {
                controls[columnDef.fieldName + 'From'] = [''];
                controls[columnDef.fieldName + 'To'] = [''];
            } else {
                controls[columnDef.fieldName] = [''];
            }
        });

        console.log(controls);
        this.filterForm = this.formBuilder.group(controls);
        this.preFilters?.forEach(p => {
            this.filterForm.get(p.key)?.setValue(p.value);
            this.filterMap.set(p.key, p.value);
        });
    }

    ngAfterViewInit(): void {
        // If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

        if (!this.restApiurl) {

        }
        this.restApi = new RestApi(this.httpClient, this.restApiurl, this.pageIndexParamName, this.pageSizeParamName, this.sortParamName);

        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                // Start it with an empty event to get the first page (only once)
                this.firstCall ? startWith({}) : tap(),
                switchMap(() => {
                    // setTimeout(() => this.globalService.showProgressBar());
                    this.queryString = this.getQueryString(this.filterMap.entries());
                    this.isLoadingResults = true;
                    return this.restApi.fetchData(
                        this.sort.active,
                        this.sort.direction,
                        this.paginator.pageIndex,
                        this.paginator.pageSize,
                        this.queryString
                    ).pipe(catchError(() => {
                        return of(null);
                    }));
                }),
                map((data: any) => {
                    //this.globalService.hideProgressBar();
                    this.firstCall = false;
                    // Flip flag to show that loading has finished.
                    this.isLoadingResults = false;

                    if (data === null) {
                        this.paginator.length = 0;
                        this.paginator.pageSize = 0;
                        return [];
                    }

                    // Only refresh the result length if there is new data. In case of rate
                    // limit errors, we do not want to reset the paginator to zero, as that
                    // would prevent users from re-triggering requests.
                    let page = !!data.page ? data.page : data;

                    this.paginator.length = page.totalElements;
                    this.onLoadPage({ pageIndex: page.number, pageSize: page.size, length: page.totalElements });
                    let elements = data;
                    if (data.content) {
                        elements = data.content;
                    } else if (data._embedded) {
                        elements = data._embedded[this.embeddedName];
                    }
                    return elements;
                }),
            )
            .subscribe(data => (this.dataSource = data));

        //// force to start - this is the another way to force to start
        //// -> it is better is we want to magae tthe first load from outside...
        // this.paginator.page.emit({pageIndex: 0, pageSize: 1, length: 1});

    }

    onLoadPage(pageEvent: PageEvent) {
        console.debug("pageEvent", pageEvent);
        this.pageLoad.emit(pageEvent);
    }

    onRowClick(data: any, column: ColumnDefinition, event: Event) {
        console.debug("onRowClick", data);
        this.rowClick.emit({ data, column, event });
    }

    private handlerFilterTextInputTimeout: any;
    private filterMap = new Map<string, any>();

    onFilterOptionChanged(value: string/*MatOptionSelectionChange<string>*/, column: ColumnDefinition) {
        if (!!value) {
            this.filterMap.set(column.fieldName, value);
        } else {
            this.filterMap.delete(column.fieldName);
        }
        this.fireFilterChangeEvent();
    }
    onFilterTextInput(event: Event, column: ColumnDefinition, timeout: number): void {
        event.stopPropagation();

        // update values all the time....
        this.updateFilterMap(event, column);

        if (column.fieldType === 'numeric') {
            this.maxSafeValue(event);
        }

        // in time send changes... if no editing happened
        this.clearTimeoutHanler();
        this.handlerFilterTextInputTimeout = setTimeout(() => {
            this.fireFilterChangeEvent();
        }, timeout);
    }
    private fireFilterChangeEvent() {
        const publicFilters = new Map<string, any>();

        for (const entry of this.filterMap.entries()) {
            const filteredCol = this.findColumn(entry[0]);
            publicFilters.set(entry[0], entry[1]);
        }

        // force to reload - this is the another way to force to start
        this.paginator?.page?.emit({ pageIndex: 0, pageSize: 1, length: 1 });
        this.filterChange.emit(publicFilters.entries());
    }

    updateFilterMap(event: Event, column: ColumnDefinition): void {
        console.debug("updateFilterMap", event);
        if (event.target instanceof HTMLSelectElement) {
            const select = (event.target as HTMLSelectElement);
            if (!!select.value) {
                this.filterMap.set(column.fieldName, select.value);
            } else {
                this.filterMap.delete(column.fieldName);
            }
        } else if (event.target instanceof HTMLInputElement) {
            const input = (event.target as HTMLInputElement);
            if (input.value) {
                this.filterMap.set(column.fieldName, input.value);
            } else {
                this.filterMap.delete(column.fieldName);
            }
        }
    }
    clearRanges(event: Event, from: string, to: string) {
        event.stopPropagation();
        this.filterForm.controls[from].reset();
        this.filterForm.controls[to].reset();
        this.filterMap.delete(from);
        this.filterMap.delete(to);
        this.paginator.page.emit({ pageIndex: 0, pageSize: 1, length: 1 });
    }
    handleDateRangeChangeEvent(name: string, column: ColumnDefinition, event: MatDatepickerInputEvent<Date>) {
        const ts = new Date(event.value as any);
        let d = new Date();
        d.setFullYear(ts.getFullYear(), ts.getMonth(), ts.getDate())
        if ((column.fieldType === 'datetimerange') && name.endsWith('From')) {
            d.setHours(0, 0, 0, 0);
        } if ((column.fieldType === 'datetimerange') && name.endsWith('To')) {
            d.setHours(23, 59, 59, 59);
        }

        let value = this.formatDateRangeValues(column, d);

        this.filterMap.set(name, value);
        this.paginator.page.emit({ pageIndex: 0, pageSize: 1, length: 1 });
    }
    private formatDateRangeValues(column: ColumnDefinition, d: Date): string | null {
        let value: string | null = null;
        if (column.fieldType === 'datetimerange') {
            value = d.toISOString();
        } else if (column.fieldType === 'daterange') {
            const datePipe = new DatePipe('en_US'); // we send this to server -> not for display
            const formatDate: string = 'yyyy-MM-dd';
            value = datePipe.transform(d, formatDate);
        }
        return value;
    }
    preventNonNumericCharacter(event: any): void {
        const char = String.fromCharCode(event.keyCode);

        if (!char.match(/(^[0-9]+|\r+$)/)) {
            event.preventDefault();
        }
    }
    private clearTimeoutHanler(): void {
        if (this.handlerFilterTextInputTimeout != null) {
            clearTimeout(this.handlerFilterTextInputTimeout);
            this.handlerFilterTextInputTimeout = null;
        }
    }
    private findColumn(fieldName: string): ColumnDefinition | undefined {
        return this.columns.find((column: ColumnDefinition) => column.fieldName === fieldName);

    }
    private maxSafeValue(event: any): void {
        if (event.target.value > Number.MAX_SAFE_INTEGER) {
            console.warn(`Max safe value exceeded. Reverting to ${Number.MAX_SAFE_INTEGER}`)
            event.target.value = Number.MAX_SAFE_INTEGER;
        }
    }
    private getQueryString(entries: IterableIterator<[string, any]>): string {
        let queryString = '';

        const codec = new HttpUrlEncodingCodec();
        for (const entry of entries) {
            queryString = queryString + `&${codec.encodeKey(entry[0])}=${encodeURIComponent(entry[1])}`;
        }

        return queryString;
    }

    onClickStopPropagation(event: Event) {
        event.stopPropagation();
    }

    onClickPiker(dateRange: MatDateRangeInput<any>, picker: MatDateRangePicker<any>) {
        console.trace("onClickPiker", dateRange);
    }

}


export class RestApi {
    constructor(private _httpClient: HttpClient, private url: string, 
        private pageIndexParamName: string,
        private pageSizeParamName: string ,
        private sortParamName: string) { }

    fetchData(sort: string, order: SortDirection, pageIndex: number, pageSize: number, queryString: string = ''): Observable<any> {
        const startChar = this.url.includes('?') ? '&' : '?';
        const requestUrl = `${this.url}${startChar}${this.pageIndexParamName}=${pageIndex}&${this.pageSizeParamName}=${pageSize}&${this.sortParamName}=${sort},${order}&${queryString}`;
        return this._httpClient.get<any>(requestUrl);
    }
}

export interface PageDetails {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;

}
