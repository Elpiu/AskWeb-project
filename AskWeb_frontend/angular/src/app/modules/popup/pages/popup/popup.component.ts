import {Component, Inject, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TAB_ID} from '../../../../providers/tab-id.provider';
import {ConcreteMessage, Message, Sender} from "../../../../model/Message";
import {ChatService} from "../../services/chat.service";

@Component({
  selector: 'app-popup',
  templateUrl: 'popup.component.html',
  styleUrls: ['popup.component.scss']
})
export class PopupComponent implements OnInit {
  message: string;
  $canUserSendInput: BehaviorSubject<boolean>
  $senderNewMessage: BehaviorSubject<Message>
  $chromeContentIsChanged: BehaviorSubject<any>

  _url: string = ""
  _numberMsg: number = 0

  constructor(
    @Inject(TAB_ID) readonly tabId: number,
    private chatService: ChatService) {
    this.$canUserSendInput = new BehaviorSubject<boolean>(false)
    this.$senderNewMessage = new BehaviorSubject<Message>(null)
    this.$chromeContentIsChanged = new BehaviorSubject<any>(null)

    chrome.tabs.query({active: true, currentWindow: true})
      .then(tabs => {
        var currentTab = tabs[0];
        chrome.tabs.sendMessage(currentTab.id, {action: "getDOM"})
          .then(response => {
            this._url = response['url']
            this.$chromeContentIsChanged.next(response)
          })
      })

  }


  public handleUserSendQuestion(event) {
    this.$canUserSendInput.next(false)
    console.log('User send:', event);
    this._numberMsg += 1
    const msg: Message =
      new ConcreteMessage(event, this._numberMsg, Sender.Sender, new Date(), this._url)
    this.$senderNewMessage.next(msg)
    this.chatService.executeQueryContent(msg).subscribe(value => {
      value = value['result']
      console.log("Risposta backend:" + value)
      this._numberMsg += 1
      const result = value === 'error' ? "Il mio lavoro qui è finito!" : value
      const msg: Message =
        new ConcreteMessage(result, this._numberMsg, Sender.Chatbot, new Date(), this._url)
      this.$senderNewMessage.next(msg)
      if(result === 'error'){
        this.$canUserSendInput.next(false)

      }
      else {
        this.$canUserSendInput.next(true)
      }

    })
  }

  ngOnInit(): void {
    this.$chromeContentIsChanged.subscribe(value => {
      if (value !== null) {
        this.chatService.executeSendContentOfPage(value)
          .subscribe(data => {
            if (data['result'] === 'ok') {
              console.log("Backend is ready!")
              this._numberMsg = 1
              const msg: Message =
                new ConcreteMessage("Ciao come posso aiutarti?", this._numberMsg, Sender.Chatbot, new Date(), this._url)
              this.$senderNewMessage.next(msg)
              this.$canUserSendInput.next(true)
            } else {
              this._numberMsg = 1
              const msg: Message =
                new ConcreteMessage("Ciao, scusa ho mal di pancia non posso aiutarti!", this._numberMsg, Sender.Chatbot, new Date(), this._url)
              this.$senderNewMessage.next(msg)
              console.log("Mhhh maybe error")
            }
          })
      }
    })
  }

}
