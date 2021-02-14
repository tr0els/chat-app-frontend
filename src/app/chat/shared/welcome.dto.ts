import { ChatClient } from './chat-client.model';
import { ChatMessage } from './chat-message.model';

export interface WelcomeDTO {
  client: ChatClient;
  clients: ChatClient[];
  messages: ChatMessage[];
}
