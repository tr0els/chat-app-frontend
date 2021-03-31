import { Injectable } from '@angular/core';
import { SocketStock } from '../../app.module';
import { CreateStockDto } from './create-stock.dto';
import { StockDto } from './stock.dto';
import {Observable, of} from 'rxjs';
import {Stock} from './stock.model';
import {ChatClient} from '../../chat/shared/chat-client.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {

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

  update(stock: Stock): void {
    this.socketStock.emit('stock-update', stock);
    console.log('updating stock with id: ' + stock.id);
  }

  listenForUpdateSuccess(): Observable<Stock> {
    return this.socketStock.fromEvent<Stock>('stock-updated-success');
  }

  listenForUpdateError(): Observable<string> {
    return this.socketStock.fromEvent<string>('stock-updated-error');
  }

  listenForStocks(): Observable<Stock[]> {
    return this.socketStock.fromEvent<Stock[]>('stocks');
  }

  sendWelcome(): void {
    this.socketStock.emit('welcome');
  }
}
