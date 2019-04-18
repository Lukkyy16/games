import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

import { ConnectNRoutingModule } from './connect-n-routing.module';
import { ConnectNComponent } from './connect-n.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ConnectNComponent],
  imports: [SharedModule, ConnectNRoutingModule]
})
export class ConnectNModule {}
