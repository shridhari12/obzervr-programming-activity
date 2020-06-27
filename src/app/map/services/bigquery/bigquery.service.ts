import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BigQuery } from '@google-cloud/bigquery';

const QUERY_URL = 'https://us-central1-obzervr-prog-activity.cloudfunctions.net/bigQueryFetchData';

@Injectable({
  providedIn: 'root'
})
export class BigqueryService {
  constructor(private httpClient: HttpClient) { }
  public data: Array<any>;
  // onQuery(datasetName: string, q: string): Observable<any> {
  onQuery(query: string): Observable<Array<any>> {
    // const postParams = {
    // datasetName,
    //  query
    // };

    return this.httpClient.post<Array<any>>(QUERY_URL, null);
    // .toPromise()
    // .then(data => {
    //   console.log('[data] ', data);
    //   return of(data);
    // })
    // .catch(err => {
    //   console.error('[httpClient][error] ', err);
    // });
    //return returnArray;
    // .subscribe(data => {
    //   this.data = data;
    //   return of(this.data);
    //  });
    // .subscribe({
    //   next: data => this.data = data,
    //   error: error => console.error('[httpClient][error] ', error)
    // });
    // return of(this.data);
    // return this.httpClient.post(QUERY_URL, postParams);
    // return of(this.httpClient.post(QUERY_URL, null));
    // return of(httpResponse);
    // return this.httpClient.post(QUERY_URL, null);
  }
}
