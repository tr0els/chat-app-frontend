import { Injectable } from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Stock} from '../shared/stock.model';
import {ListenForStocks, UpdateStocksState} from './stock.action';
import {StockService} from '../shared/stock.service';

export interface StockStateModel {
  stocks: Stock[];
}

@State<StockStateModel>({
  name: 'stocks',
  defaults: {
    stocks: []
  }
})
@Injectable()
export class StockState {
  constructor(private stockService: StockService) { }

  @Selector()
  static stocks(state: StockStateModel): Stock[] {
    return state.stocks;
  }

  @Action(ListenForStocks)
  getStocks(ctx: StateContext<StockStateModel>): void {
    this.stockService.listenForStocks()
      .subscribe(stocks =>  {
        ctx.dispatch(new UpdateStocksState(stocks));
      });
  }

  @Action(UpdateStocksState)
  updateStocks(ctx: StateContext<StockStateModel>, updateStocks: UpdateStocksState): void {
    const newState: StockStateModel = {
      stocks: updateStocks.stocks
    };
    ctx.setState(newState);
  }
}
