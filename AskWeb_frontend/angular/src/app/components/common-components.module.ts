import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputBarComponent} from "./input-bar/input-bar.component";
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { MessageComponent } from './chat-window/message/message.component';



@NgModule({
  declarations: [InputBarComponent, HeaderBarComponent, ChatWindowComponent, MessageComponent],
  imports: [
    CommonModule
  ],
  exports: [InputBarComponent, HeaderBarComponent, ChatWindowComponent]
})
export class CommonComponentsModule { }
