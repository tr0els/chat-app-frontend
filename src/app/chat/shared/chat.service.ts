import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { ChatClient } from './chat-client.model';
import { ChatMessage } from './chat-message.model';
import { WelcomeDTO } from './welcome.dto';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // make service visible throughout the application
})

export class ChatService {
  private numUnreadMessages: BehaviorSubject<number>;
  isChatActive: boolean;
  chatClient: ChatClient;

  constructor(private socket: Socket) {
    this.numUnreadMessages = new BehaviorSubject<number>(0);
  }

  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  sendTyping(typing: boolean): void {
    this.socket.emit('typing', typing);
  }

  listenForMessages(): Observable<ChatMessage> {
    return this.socket
      .fromEvent<ChatMessage>('newMessage');
  }

  listenForClients(): Observable<ChatClient[]> {
    return this.socket
      .fromEvent<ChatClient[]>('clients');
  }

  listenForWelcome(): Observable<WelcomeDTO> {
    return this.socket
      .fromEvent<WelcomeDTO>('welcome');
  }

  listenForClientTyping(): Observable<ChatClient> {
    return this.socket
      .fromEvent<ChatClient>('clientTyping');
  }

  listenForErrors(): Observable<string> {
    return this.socket
      .fromEvent<string>('error');
  }


  // wrap the two methods in a listenForConnection method
  // connected to backend
  listenForBackendConnect(): Observable<string> {
    return this.socket
      .fromEvent<string>('connect')
      .pipe(
        map(() => {
          return this.socket.ioSocket.id;
        })
      );
  }

  // disconnected from backend
  listenForBackendDisconnect(): Observable<string> {
    return this.socket
      .fromEvent<string>('disconnect')
      .pipe(
        map(() => {
          return this.socket.ioSocket.id;
        })
      );
  }

  sendNickname(nickname: string): void {
    this.socket.emit('nickname', nickname);
  }

  getNumUnreadMessages(): Observable<number> {
    return this.numUnreadMessages.asObservable();
  }

  setNumUnreadMessages(newValue): void {
    this.numUnreadMessages.next(newValue);
  }
}
