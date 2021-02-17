import { OnInit, Component, OnDestroy } from '@angular/core';
import { ChatService } from './chat/shared/chat.service';
import { Observable, Subject } from 'rxjs';
import { ChatClient } from './chat/shared/chat-client.model';
import {takeUntil} from 'rxjs/operators';
import {ChatMessage} from './chat/shared/chat-message.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Awesome chat app';
  clients$: Observable<ChatClient[]> | undefined;
  unreadMessages: number;
  unsubscribe$ = new Subject(); // is this necessary here?

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.clients$ = this.chatService.listenForClients();
    this.chatService.getNumUnreadMessages()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(value => {
        this.unreadMessages = value;
      });
    this.chatService.listenForMessages()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(_ => {
        if (!this.chatService.isChatActive) {
          this.chatService.setNumUnreadMessages(this.unreadMessages + 1);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
