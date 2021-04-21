import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './stock.component';
import { StockCreateComponent } from './stock-create/stock-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StockDetailComponent } from './stock-detail/stock-detail.component';
import { StockState } from './state/stock.state';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  declarations: [StockComponent, StockCreateComponent, StockDetailComponent],
  imports: [
    CommonModule,
    StockRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxsModule.forFeature([StockState])
  ]
})
export class StockModule { }
