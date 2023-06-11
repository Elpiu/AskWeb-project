import {Component, Input} from '@angular/core';
import {Message, Sender} from "../../../model/Message";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  @Input() message: Message
  SENDER: number = Sender.Sender
  CHATBOT: number = Sender.Chatbot


}
