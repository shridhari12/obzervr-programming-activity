import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public messages: Array<string>;
  constructor() {
    this.messages = new Array<string>(); 
   }

   add(message: string) {
     this.messages.push(message);
   }

   clear() {
     this.messages = [];
   }

   getMessages(): Observable<Array<string>> {
     return of(this.messages);
   }
}
