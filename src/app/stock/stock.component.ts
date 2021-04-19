import { Component, OnInit, OnDestroy } from '@angular/core';
import {Stock} from './shared/stock.model';
import {Observable, Subject} from 'rxjs';
import {StockService} from './shared/stock.service';
import {StockState} from './state/stock.state';
import {Select, Store} from '@ngxs/store';
import {ListenForStocks, StopListeningForStocks} from './state/stock.action';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit, OnDestroy {

  unsubscribe$ = new Subject();
  @Select(StockState.stocks) stocks$: Observable<Stock[]> | undefined;
  selectedStock: Stock;

  constructor(private store: Store,
              private stockService: StockService) { }

  ngOnInit(): void {
    // this.stocks$ = this.stockService.listenForStocks();
    this.store.dispatch(new ListenForStocks());
    this.stockService.sendWelcome();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.store.dispatch(new StopListeningForStocks());
  }

  onSelect(stock: Stock): void {
    this.selectedStock = stock;
  }
}
