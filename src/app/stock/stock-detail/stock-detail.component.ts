import {Component, Input, OnInit} from '@angular/core';
import {Stock} from '../shared/stock.model';
import {StockService} from '../shared/stock.service';
import {StockDto} from '../shared/stock.dto';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.scss']
})
export class StockDetailComponent implements OnInit {
  @Input() stock?: Stock;
  error: string | undefined;
  stockUpdate: Stock | undefined;

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.stockService.listenForUpdateSuccess()
      .subscribe(stockUpdate => {
        this.stock = stockUpdate;
      });

    this.stockService.listenForUpdateError()
      .subscribe(errorMessage => {
        this.error = errorMessage;
      });
  }

  add(): void {
    const stockValue = (document.getElementById('stockValue') as HTMLInputElement);
    stockValue.value = (+stockValue.value + 0.10).toFixed(2).toString();
    this.update();
  }

  subtract(): void {
    const stockValue = (document.getElementById('stockValue') as HTMLInputElement);
    stockValue.value = (+stockValue.value - 0.10).toFixed(2).toString();
    this.update();
  }

  update(): void {
    this.error = undefined;
    const stockValue = (document.getElementById('stockValue') as HTMLInputElement);
    const updateStockDto: Stock = {
      id: this.stock.id,
      name: this.stock.name,
      description: this.stock.description,
      value: Number(stockValue.value)
    };

    this.stockService.update(updateStockDto);
  }
}
