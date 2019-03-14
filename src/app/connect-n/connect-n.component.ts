import { Component, OnInit } from '@angular/core';

import { ConnectNGameboard } from './connect-n.model';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

@Component({
  selector: 'games-connect-n',
  templateUrl: './connect-n.component.html',
  styleUrls: ['./connect-n.component.scss']
})
export class ConnectNComponent implements OnInit {
  gameboard = new ConnectNGameboard(6, 7, 4);
  showSettings = true;

  constructor() {}

  get check(): boolean {
    return this.gameboard.check;
  }

  get player(): string {
    return this.gameboard.player;
  }

  get rows(): string[][] {
    return this.gameboard.board;
  }

  ngOnInit() {}

  click(row: number, col: number) {
    this.gameboard.board[row][col] = this.gameboard.player;
    this.gameboard.player = this.gameboard.player === 'X' ? 'O' : 'X';
  }
}