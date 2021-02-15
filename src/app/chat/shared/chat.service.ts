import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { ChatClient } from './chat-client.model';
import { ChatMessage } from './chat-message.model';
import { WelcomeDTO } from './welcome.dto';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // instance variable of the chat client
  // notice this is kept in the service so available everywhere
  chatClient: ChatClient | undefined;

  constructor(private socket: Socket) { }

  sendMessage(msg: string): void {
    this.socket.emit('message', msg);
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

  sendNickname(nickname: string): void {
    this.socket.emit('nickname', nickname);
  }

  disconnect(): void {
    this.socket.disconnect();
  }

  connect(): void {
    this.socket.connect();
  }
}
