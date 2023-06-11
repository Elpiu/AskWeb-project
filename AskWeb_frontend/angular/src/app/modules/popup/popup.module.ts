import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PopupComponent } from './pages/popup/popup.component';
import { PopupRoutingModule } from './popup-routing.module';
import {CommonComponentsModule} from "../../components/common-components.module";

@NgModule({
  declarations: [PopupComponent],
  imports: [CommonModule, PopupRoutingModule, CommonComponentsModule]
})
export class PopupModule {}
