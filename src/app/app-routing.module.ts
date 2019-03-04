import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'connect-n'
      },
      {
        path: 'connect-n',
        loadChildren: './connect-n/connect-n.module#ConnectNModule'
      },
      {
        path: 'eight-ball',
        loadChildren: './eight-ball/eight-ball.module#EightBallModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
