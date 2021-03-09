import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';


@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    ReactiveFormsModule,
    PickerModule
  ]
})
export class ChatModule { }
