import {Component, Inject} from '@angular/core';
import {BehaviorSubject, bindCallback} from 'rxjs';
import {map} from 'rxjs/operators';
import {TAB_ID} from '../../../../providers/tab-id.provider';
import {Message} from "../../../../model/Message";

@Component({
  selector: 'app-popup',
  templateUrl: 'popup.component.html',
  styleUrls: ['popup.component.scss']
})
export class PopupComponent {
  message: string;
  $canUserSendInput: BehaviorSubject<boolean>

  $senderNewMessage: BehaviorSubject<Message>


  constructor(@Inject(TAB_ID) readonly tabId: number) {
    this.$canUserSendInput = new BehaviorSubject<boolean>(true);
    this.$senderNewMessage = new BehaviorSubject<Message>(null)

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      var currentTab = tabs[0];
      var url = currentTab.url;
      console.log(url);
    });

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      var currentTab = tabs[0];
      chrome.tabs.sendMessage(currentTab.id, {action: "getDOM"}, function (response) {
        console.log(response["content"]);
      });
    });

    //setTimeout(() => {
    //  // La tua funzione da eseguire dopo 3 secondi
    //  this.$canUserSendInput.next(true)
    //  console.log(this.$canUserSendInput.value)
    //}, 3000);
    setTimeout(() => {
      // La tua funzione da eseguire dopo 3 secondi
      let mgs = {
        id: 1,
        content: "Ciao! Sono un messaggio di esempio.",
        time: new Date(),
        sender: 0,
        url: "https://example.com"
      }
      this.$senderNewMessage.next(mgs)
      console.log("msg  inviato")
    }, 3000);
  }

  async onClick(): Promise<void> {
    this.message = await bindCallback<any, any>(chrome.tabs.sendMessage.bind(this, this.tabId, 'request'))()
      .pipe(
        map(msg =>
          chrome.runtime.lastError
            ? 'The current page is protected by the browser, goto: https://www.google.nl and try again.'
            : msg
        )
      )
      .toPromise();
  }

  public handleUserSendQuestion(event) {
    console.log('Valore ricevuto:', event);

  }

  //TODO EM: questa pagina puzza fai schifo

  /**
   * All'init attraverso il service invia il contentuo della pagina come testo recuperato dal content script girato
   * nella current tab dellutente (nel browser).
   *
   * Permette di inviare il primo messaggio al backend attraverso il service e notificherà
   * alla chat del nuovo messaggio da inserire nella lista,
   * all'invio bloccerà il tasto per inviare nuovamente un nuovo messaggio finchè non
   * ci sarà risposta dal backend.
   *
   * I prossimi messaggi avranno lo stesso flusso (il bottone si disattiva finchè la risposta non viene elaborata).
   * è possibile comunque anticiparsi scrivendo la nuova domanda.
   *
   *
   */

}
