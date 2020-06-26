import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  public messages: Array<string>;
  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages() {
    this.messageService.getMessages().subscribe(messages => this.messages = messages);
  }

  clearMessageHandler() {
    console.log('[clearMessageHandler] clicked');
    this.messageService.clear();
    this.getMessages();
  }

}
