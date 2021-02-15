import { OnInit, Component, OnDestroy } from '@angular/core';
import { ChatService } from './chat/shared/chat.service';
import { Observable, Subject } from 'rxjs';
import { ChatClient } from './chat/shared/chat-client.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Awesome chat app';
  clients$: Observable<ChatClient[]> | undefined;
  unsubscribe$ = new Subject(); // is this nescesarry here?

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.clients$ = this.chatService.listenForClients();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
