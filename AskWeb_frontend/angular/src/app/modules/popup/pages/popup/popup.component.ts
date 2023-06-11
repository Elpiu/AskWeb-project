import { Component, Inject } from '@angular/core';
import { bindCallback } from 'rxjs';
import { map } from 'rxjs/operators';
import { TAB_ID } from '../../../../providers/tab-id.provider';

@Component({
  selector: 'app-popup',
  templateUrl: 'popup.component.html',
  styleUrls: ['popup.component.scss']
})
export class PopupComponent {
  message: string;

  constructor(@Inject(TAB_ID) readonly tabId: number) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var currentTab = tabs[0];
      var url = currentTab.url;
      console.log(url);
    });

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var currentTab = tabs[0];
      chrome.tabs.sendMessage(currentTab.id, { action: "getDOM" }, function (response) {
        console.log(response["content"]);
      });
    });

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
}
