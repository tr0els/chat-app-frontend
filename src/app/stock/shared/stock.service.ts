import { Injectable } from '@angular/core';
import { SocketStock } from '../../app.module';
import { CreateStockDto } from './create-stock.dto';
import { StockDto } from './stock.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private socketStock: SocketStock) { }

  create(stock: CreateStockDto): void {
    this.socketStock.emit('create-stock', stock);
  }

  listenForCreateSuccess(): Observable<StockDto> {
    return this.socketStock.fromEvent<StockDto>('stock-created-success');
  }

  listenForCreateError(): Observable<string> {
    return this.socketStock.fromEvent<string>('stock-created-error');
  }
}
