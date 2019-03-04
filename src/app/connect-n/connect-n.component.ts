import { Component, OnInit } from '@angular/core';

import { ConnectNGameboard } from './connect-n.model';

@Component({
  selector: 'games-connect-n',
  templateUrl: './connect-n.component.html',
  styleUrls: ['./connect-n.component.scss']
})
export class ConnectNComponent implements OnInit {
  gameboard = new ConnectNGameboard();

  constructor() {}

  ngOnInit() {}
}
