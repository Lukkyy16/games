import { Component, OnInit } from '@angular/core';

import { ConnectNGameboard } from './connect-n.model';

@Component({
  selector: 'games-connect-n',
  templateUrl: './connect-n.component.html',
  styleUrls: ['./connect-n.component.scss']
})
export class ConnectNComponent implements OnInit {
  gameboard = new ConnectNGameboard();
  player1Name = '';
  player2Name = '';
  showSettings = true;

  constructor() {}

  set inRow(value: number) {
    this.gameboard = this.gameboard.reduce({ inRow: value });
  }

  get inRow() {
    return this.gameboard.inRow;
  }

  get player(): string {
    return this.gameboard.player === 'X' ? this.player1Name : this.player2Name;
  }

  set totalColumns(value: number) {
    this.gameboard = this.gameboard.reduce({ totalColumns: value });
  }

  get totalColumns() {
    return this.gameboard.totalColumns;
  }

  set totalRows(value: number) {
    this.gameboard = this.gameboard.reduce({ totalRows: value });
  }

  get totalRows() {
    return this.gameboard.totalRows;
  }

  ngOnInit() {}

  click(row: number, col: number) {
    this.gameboard.move(row, col);
  }
}
