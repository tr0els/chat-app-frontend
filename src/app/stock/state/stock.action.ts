import {Stock} from '../shared/stock.model';

export class ListenForStocks {
  static readonly type = '[Stock] Listen For Stocks';
}

export class StopListeningForStocks {
  static readonly type = '[Stock] Stop Listening For Stocks';
}

export class UpdateStocksState {
  constructor(public stocks: Stock[]) {}
  static readonly type = '[Stock] Update Stocks';
}
