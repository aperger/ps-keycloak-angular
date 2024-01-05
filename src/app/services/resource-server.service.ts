import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ResourceServerService {

  constructor(
    private http: HttpClient,
  ) {
  }


  public getText(absoluteUrl: string, options? : {params?: HttpParams, headers?: HttpHeaders, reponseType?:string}): Observable<string> {
    return this.http.get(absoluteUrl, { headers: options?.headers, params: options?.params, responseType: 'text' });
  }

}
