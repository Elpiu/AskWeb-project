import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PopupComponent } from './pages/popup/popup.component';
import { PopupRoutingModule } from './popup-routing.module';
import {CommonComponentsModule} from "../../components/common-components.module";
import {ChatService} from "./services/chat.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [PopupComponent],
  imports: [CommonModule, PopupRoutingModule, CommonComponentsModule, HttpClientModule],
  exports: [PopupComponent],
  providers: [ChatService]
})
export class PopupModule {}
