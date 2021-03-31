import { Component, OnInit, OnDestroy } from '@angular/core';
import {Stock} from './shared/stock.model';
import {Observable, Subject} from 'rxjs';
import {StockService} from './shared/stock.service';
import {ChatClient} from '../chat/shared/chat-client.model';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit, OnDestroy {

  unsubscribe$ = new Subject();
  stocks$: Observable<Stock[]> | undefined;

  selectedStock: Stock;

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.stocks$ = this.stockService.listenForStocks();
    this.stockService.sendWelcome();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSelect(stock: Stock): void {
    this.selectedStock = stock;
  }
}
