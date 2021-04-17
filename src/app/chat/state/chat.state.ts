import {WelcomeDTO} from '../shared/welcome.dto';
import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {ChatClient} from '../shared/chat-client.model';
import {GetClients} from './chat.actions';

export interface ChatStateModel { // info about how the state will be setup
  chatClients: ChatClient[];
  chatClient: ChatClient | undefined;
}

@State<ChatStateModel>({
  name: 'chat',
  defaults: { // default values
    chatClients: [],
    chatClient: {id: 2, nickname: 'testnick'}
  }
})
@Injectable()
export class ChatState { // remember to add model to app.module
  @Selector()
  static clients(state: ChatStateModel): ChatClient[] {
    return state.chatClients;
  }

  @Action(GetClients)
  getClients(ctx: StateContext<ChatStateModel>): void {
    const state = ctx.getState();
    // const oldClients = state.chatClients; if you need to use the old state
    const newState: ChatStateModel = {
      ...state, // takes existing properties and put it in the now object/state
      chatClients: [{id: 22, nickname: 'dd'}] // overwriting defaults (mutating, using new object)
      // chatClients: [...oldClients] neat trick that will go through each object in the array
    };
    ctx.setState(newState);
  }
}
