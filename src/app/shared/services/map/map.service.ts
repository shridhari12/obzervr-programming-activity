import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DATA_POINTS } from './mock-data-points';
import { MessageService } from '../message/message.service';

@Injectable({
    providedIn: 'root'
})
export class MapService {
    constructor(private messageService: MessageService) {}

    getDataPoints(): Observable<Array<any>> {
        this.messageService.add('Fetching data points for map ...');
        return of(DATA_POINTS);
    }
}
