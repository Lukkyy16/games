import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectNRoutingModule } from './connect-n-routing.module';
import { ConnectNComponent } from './connect-n.component';

@NgModule({
  declarations: [ConnectNComponent],
  imports: [
    CommonModule,
    ConnectNRoutingModule
  ]
})
export class ConnectNModule { }
