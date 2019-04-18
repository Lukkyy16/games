import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YahtzeeComponent } from './yahtzee.component';

const routes: Routes = [{
  path: '',
  component: YahtzeeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YahtzeeRoutingModule { }
