import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnectNComponent } from './connect-n.component';

const routes: Routes = [
  {
    path: '',
    component: ConnectNComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectNRoutingModule {}
