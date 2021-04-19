import { BrowserModule } from '@angular/platform-browser';
import { Injectable, NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Socket, SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { NgxEmojiPickerModule } from 'ngx-emoji-picker';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';
import {ChatState} from './chat/state/chat.state';
import {StockState} from './stock/state/stock.state';

@Injectable()
export class SocketChat extends Socket {
  constructor() {
    super({ url: 'http://localhost:3000', options: {} });
  }
}

@Injectable()
export class SocketStock extends Socket {
  constructor() {
    super({ url: 'http://localhost:3200', options: {} });
  }
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule,
    [NgbModule],
    NgxsModule.forRoot([], {
      developmentMode: !environment.production
    }),
    // NgxEmojiPickerModule.forRoot(),
  ],
  providers: [SocketChat, SocketStock],
  bootstrap: [AppComponent]
})
export class AppModule { }
