import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChatService } from './shared/chat.service';
import { Observable, Subject, Subscription } from 'rxjs';
import {debounceTime, subscribeOn, take, takeUntil} from 'rxjs/operators';
import { ChatMessage } from './shared/chat-message.model';
import { ChatClient } from './shared/chat-client.model';
import {ChatState} from './state/chat.state';
import {Select} from '@ngxs/store';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit, OnDestroy {
  nicknameFc = new FormControl('');
  messageFc = new FormControl('');

  messages: ChatMessage[] = [];
  chatClient: ChatClient | undefined;
  clients$: Observable<ChatClient[]> | undefined;
  clientsTyping: ChatClient[] = [];
  unsubscribe$ = new Subject();
  // @Select(ChatState.clients) // get from state management
  error$: Observable<string> | undefined;

  currentDate = new Date();

  constructor(private chatService: ChatService) { } // add state management here

  ngOnInit(): void {
    console.log('Chat active');
    this.chatService.isChatActive = true;
    this.chatService.setNumUnreadMessages(0);

    // Subscribes using async in html
    this.clients$ = this.chatService.listenForClients();
    this.error$ = this.chatService.listenForErrors();

    // If chatClient exists in chat service send nickname details again
    if (this.chatService.chatClient) {
      this.chatService.sendNickname(this.chatService.chatClient.nickname); // "login"
    }

    // Listen for new messages
    this.chatService.listenForMessages()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(message => { // subscribe to make it happen
        this.messages.push(message); // add new messages to array
      });

    // Tell server if client is typing
    this.messageFc.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(500) // only trigger again after this time
      )
      .subscribe((value) => {
        this.chatService.sendTyping(value.length > 0); // true if length > 0
      });

    // Listen for changes when a client starts/stops typing
    this.chatService.listenForClientTyping()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((chatClient) => {
        if (chatClient.typing && !this.clientsTyping.find((c) => c.id === chatClient.id)) { // add the client if typing and not in list
          this.clientsTyping.push(chatClient);
        } else {
          this.clientsTyping = this.clientsTyping.filter((c) => c.id !== chatClient.id); // remove the client if not typing but in list
        }
      });

    // On welcome get all previous messages and store this chatClient in service
    this.chatService.listenForWelcome()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(welcome => {
        this.messages = welcome.messages;
        this.chatClient = this.chatService.chatClient = welcome.client; // assignment right to left
      });

    this.chatService.listenForBackendConnect()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((id) => {
        console.log('connect id', id);
      });

    this.chatService.listenForBackendDisconnect()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((id) => {
        console.log('disconnect id', id);
      });
  }

  // Custom cleanup when component is destroyed
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.chatService.isChatActive = false;
    console.log('Chat inactive');
  }

  sendMessage(): void {
    console.log(this.messageFc.value);
    this.chatService.sendMessage(this.messageFc.value);
    this.messageFc.reset('');
  }

  sendNickname(): void {
    if (this.nicknameFc.value) {
      this.chatService.sendNickname(this.nicknameFc.value);
    }
  }

  isClientTyping(id): boolean {
    const index = this.clientsTyping.findIndex(x => x.id === id);
    return index !== -1;
  }

  handleSelection(event): void {
    this.messageFc.setValue(this.messageFc.value + event.char);
  }
}

