import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DATA_POINTS } from './mock-data-points';

@Injectable({
    providedIn: 'root'
})
export class MapService {
    constructor() {

    }

    getDataPoints(): Observable<Array<any>> {
        return of(DATA_POINTS);
    }
}