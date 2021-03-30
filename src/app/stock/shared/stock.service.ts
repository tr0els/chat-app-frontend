import { Injectable } from '@angular/core';
import { SocketStock } from '../../app.module';
import { CreateStockDto } from './create-stock.dto';
import { StockDto } from './stock.dto';
import {Observable, of} from 'rxjs';
import {Stock} from './stock.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  stocks: Stock[] = [
    { id: '1', name: 'Stock nummer 1', description: 'dejlig stock', value: 123.00 },
    { id: '2', name: 'Stock nummer 2', description: 'dejlig stock', value: 12.12 },
    { id: '3', name: 'Stock nummer 3', description: 'dejlig stock', value: 321.123 },
    { id: '4', name: 'Stock nummer 4', description: 'dejlig stock', value: 123 },
    { id: '5', name: 'Stock nummer 5', description: 'dejlig stock', value: 123 },
    { id: '6', name: 'Stock nummer 6', description: 'dejlig stock', value: 123 },
  ];

  constructor(private socketStock: SocketStock) { }

  create(stock: CreateStockDto): void {
    this.socketStock.emit('stock-create', stock);
  }

  listenForCreateSuccess(): Observable<StockDto> {
    return this.socketStock.fromEvent<StockDto>('stock-created-success');
  }

  listenForCreateError(): Observable<string> {
    return this.socketStock.fromEvent<string>('stock-created-error');
  }

  update(stock: StockDto): void {
    this.socketStock.emit('stock-update', stock);
  }

  listenForUpdateSuccess(): Observable<StockDto> {
    return this.socketStock.fromEvent<StockDto>('stock-updated-success');
  }

  listenForUpdateError(): Observable<string> {
    return this.socketStock.fromEvent<string>('stock-updated-error');
  }

  listenForStocks(): Observable<Stock[]> {
    return of(this.stocks);
  }
}
