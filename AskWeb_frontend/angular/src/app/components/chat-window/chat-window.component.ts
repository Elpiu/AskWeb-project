import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../model/Message";
import {BehaviorSubject, pipe} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit{

  @Input() $emitterForNewMessage: BehaviorSubject<Message>
  messages: Message[] = []

  constructor() {}

  ngOnInit(): void {
    this.$emitterForNewMessage.pipe(
      map((value: any) => value as Message)
    ).subscribe((message: Message | null) => {
      if (message !== null) {
        this.messages.push(message);
      }
    });
  }

  //messages: Message[] = [
  //  {
  //    id: 1,
  //    content: "Ciao! Sono un messaggio di esempio.",
  //    time: new Date(),
  //    sender: 0,
  //    url: "https://example.com"
  //  },
  //  {
  //    id: 2,
  //    content: "Buongiorno! Come posso aiutarti oggi?",
  //    time: new Date(),
  //    sender: 1,
  //    url: "https://example.com"
  //  }
  //];
}
