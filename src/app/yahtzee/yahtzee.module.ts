import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YahtzeeRoutingModule } from './yahtzee-routing.module';
import { YahtzeeComponent } from './yahtzee.component';

@NgModule({
  declarations: [YahtzeeComponent],
  imports: [
    CommonModule,
    YahtzeeRoutingModule
  ]
})
export class YahtzeeModule { }
