import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { ChatClient } from './chat-client.model';
import { ChatMessage } from './chat-message.model';
import { WelcomeDTO } from './welcome.dto';
import { map } from 'rxjs/operators';
import { SocketChat } from '../../app.module';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private numUnreadMessages: BehaviorSubject<number>;
  isChatActive: boolean;
  chatClient: ChatClient;

  constructor(private socketChat: SocketChat) {
    this.numUnreadMessages = new BehaviorSubject<number>(0);
  }

  sendMessage(message: string): void {
    this.socketChat.emit('message', message);
  }

  sendTyping(typing: boolean): void {
    this.socketChat.emit('typing', typing);
  }

  listenForMessages(): Observable<ChatMessage> {
    return this.socketChat
      .fromEvent<ChatMessage>('newMessage');
  }

  listenForClients(): Observable<ChatClient[]> {
    return this.socketChat
      .fromEvent<ChatClient[]>('clients');
  }

  listenForWelcome(): Observable<WelcomeDTO> {
    return this.socketChat
      .fromEvent<WelcomeDTO>('welcome');
  }

  listenForClientTyping(): Observable<ChatClient> {
    return this.socketChat
      .fromEvent<ChatClient>('clientTyping');
  }

  listenForErrors(): Observable<string> {
    return this.socketChat
      .fromEvent<string>('error');
  }


  // wrap the two methods in a listenForConnection method
  // connected to backend
  listenForBackendConnect(): Observable<string> {
    return this.socketChat
      .fromEvent<string>('connect')
      .pipe(
        map(() => {
          return this.socketChat.ioSocket.id;
        })
      );
  }

  // disconnected from backend
  listenForBackendDisconnect(): Observable<string> {
    return this.socketChat
      .fromEvent<string>('disconnect')
      .pipe(
        map(() => {
          return this.socketChat.ioSocket.id;
        })
      );
  }

  sendNickname(nickname: string): void {
    this.socketChat.emit('nickname', nickname);
  }

  getNumUnreadMessages(): Observable<number> {
    return this.numUnreadMessages.asObservable();
  }

  setNumUnreadMessages(newValue): void {
    this.numUnreadMessages.next(newValue);
  }
}
