import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './stock.component';
import { StockCreateComponent } from './stock-create/stock-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StockDetailComponent } from './stock-detail/stock-detail.component';


@NgModule({
  declarations: [StockComponent, StockCreateComponent, StockDetailComponent],
  imports: [
    CommonModule,
    StockRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class StockModule { }
