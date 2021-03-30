import { Component, OnInit, OnDestroy } from '@angular/core';
import {Stock} from './shared/stock.model';
import {Observable, Subject} from 'rxjs';
import {StockService} from './shared/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit, OnDestroy {

  unsubscribe$ = new Subject();
  stocks: Stock[] = [];
  selectedStock: Stock;

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.listenForStocks();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  listenForStocks(): void {
    this.stockService.listenForStocks()
      .subscribe(stocks => this.stocks = stocks);
  }

  onSelect(stock: Stock): void {
    this.selectedStock = stock;
  }
}
