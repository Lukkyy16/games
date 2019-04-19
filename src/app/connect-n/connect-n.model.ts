import { IfStmt } from '@angular/compiler';

export class ConnectNMove {
  constructor(public player: 'X' | 'O', public rowIndex, public columnIndex) {}
}

export class ConnectNGameboard {
  board: string[][] = []; //variables
  count = 0;
  inRow = 4;
  moves: ConnectNMove[] = [];
  player: 'X' | 'O' = 'X';
  totalColumns = 7;
  totalRows = 6;

  get blankRows(): string[][] {
    //Creates a 2d board in the same space as the circles on the screen
    const rows = [];
    for (let i = 0; i < this.totalRows; i++) {
      const cells = [];
      for (let j = 0; j < this.totalColumns; j++) {
        cells.push(null);
      }
      rows.push(cells);
    }
    return rows;
  }

  get gameOver(): boolean {
    //Constantly checking if someone won based on the players previous move
    if (this.lastMove) {
      const r = this.lastMove ? this.lastMove.rowIndex : 0; //rows
      const c = this.lastMove ? this.lastMove.columnIndex : 0; //columns
      return this.checkH(r, c) || this.checkV(r, c) || this.checkD(r, c);
    }
    return false;
  }

  get lastMove(): ConnectNMove {
    //documents the preivous move
    return this.moves.length > 0 ? this.moves[this.moves.length - 1] : null;
  }

  get rows(): string[][] {
    //documents all moves made
    const blankRows = this.blankRows;
    return this.moves.reduce((acc, move) => {
      acc[move.rowIndex][move.columnIndex] = move.player;
      return acc;
    }, blankRows);
  }

  get totalMoves(): number {
    //gets total moves made
    return this.moves.length;
  }

  get winScenario():
    | 'HORIZONTAL'
    | 'VERTICAL'
    | 'DIAGONAL_DECLINE'
    | 'DIAGONAL_INCLINE' {
    if (!this.gameOver) {
      return null;
    } else {
      if (this.lastMove) {
        const r = this.lastMove ? this.lastMove.rowIndex : 0; // rows
        const c = this.lastMove ? this.lastMove.columnIndex : 0;
        if (this.checkH(r, c)) {
          return 'HORIZONTAL';
        }
        if (this.checkV(r, c)) {
          return 'VERTICAL';
        }
        if (this.checkDiagonalDecline(r, c)) {
          return 'DIAGONAL_DECLINE';
        }
        if (this.checkDiagonalIncline(r, c)) {
          return 'DIAGONAL_INCLINE';
        }
      }
    }
  }

  get winningMoves(): ConnectNMove[] {
    switch (this.winScenario) {
      case 'HORIZONTAL':
        return this.findWinningMovesHorizontal(
          this.countLeft(this.lastMove.rowIndex, this.lastMove.columnIndex),
          this.countRight(this.lastMove.rowIndex, this.lastMove.columnIndex)
        );
      case 'VERTICAL':
        return this.findWinningMovesVertical(
          this.countUp(this.lastMove.rowIndex, this.lastMove.columnIndex),
          this.countDown(this.lastMove.rowIndex, this.lastMove.columnIndex)
        );
      case 'DIAGONAL_DECLINE':
        return this.findWinningMovesDiagonalDecline(
          this.countUpLeft(this.lastMove.rowIndex, this.lastMove.columnIndex),
          this.countDownRight(this.lastMove.rowIndex, this.lastMove.columnIndex)
        );
      case 'DIAGONAL_INCLINE':
        return this.findWinningMovesDiagonalIncline(
          this.countUpRight(this.lastMove.rowIndex, this.lastMove.columnIndex),
          this.countDownLeft(this.lastMove.rowIndex, this.lastMove.columnIndex)
        );
      default:
        return null;
    }
  }

  checkD(r: number, c: number): boolean {
    // constantly checks diagonal to see if someone won
    return this.checkDiagonalDecline(r, c) || this.checkDiagonalIncline(r, c);
  }

  checkDiagonalDecline(r: number, c: number): boolean {
    // constantly checks diagonal to see if someone won
    return this.countDownRight(r, c) + this.countUpLeft(r, c) >= this.inRow - 1;
  }

  checkDiagonalIncline(r: number, c: number): boolean {
    // constantly checks diagonal to see if someone won
    return this.countUpRight(r, c) + this.countDownLeft(r, c) >= this.inRow - 1;
  }

  checkH(r: number, c: number): boolean {
    // checks horizontal to see if someone one
    return this.countLeft(r, c) + this.countRight(r, c) >= this.inRow - 1;
  }

  checkV(r: number, c: number): boolean {
    //checks vertical
    return this.countUp(r, c) + this.countDown(r, c) >= this.inRow - 1;
  }

  clearBoard() {
    //WHen clear board button is clicked it resets the board
    this.moves = [];
  }

  countDown(r: number, c: number): number {
    //counts downward
    let count = 0;
    let i = r;

    while (i < this.totalRows - 1) {
      //loops through all downward possibilities
      if (this.rows[i + 1][c] !== this.rows[r][c]) {
        break;
      }
      /*if (this.gameOver) {
        const countDown = [i + 1][c];
        console.log(countDown);
      }*/
      count++;
      i++;
    }
    return count;
  }

  countLeft(r: number, c: number): number {
    // checks left
    let count = 0;
    let i = c;
    while (i > 0) {
      // loops through any left winning conditions
      if (this.rows[r][i - 1] !== this.rows[r][c]) {
        break;
      }
      /*if (this.gameOver) {
        const countLeft = [r][i - 1];
      }*/
      count++;
      i -= 1;
    }
    return count;
  }

  countRight(r: number, c: number): number {
    // checks right
    let count = 0;
    let i = c;
    while (i < this.totalColumns - 1) {
      // loops through right moves
      if (this.rows[r][i + 1] !== this.rows[r][c]) {
        break;
      }
      /*if (this.gameOver) {
        const countRight = [r][i + 1];
      }*/
      count++;
      i++;
    }
    return count;
  }

  countUp(r: number, c: number): number {
    // checks upward
    let count = 0;
    let i = r;
    while (i > 0) {
      if (this.rows[i - 1][c] !== this.rows[r][c]) {
        // loops upward moves
        break;
      }
      /*if (this.gameOver) {
        const countUp = [i - 1][c];
      }*/

      count++;
      i -= 1;
    }
    return count;
  }

  countDownRight(r: number, c: number): number {
    // checks horizontal down right
    let count = 0;
    let i = r;
    let j = c;
    while (i < this.totalRows - 1 && j < this.totalColumns - 1) {
      // loops through downright moves
      if (this.rows[i + 1][j + 1] !== this.rows[r][c]) {
        break;
      }
      /*if (this.gameOver) {
        const countDownRight = [i + 1][j + 1];
      }*/

      i++;
      j++;
      count++;
    }
    return count;
  }

  countDownLeft(r: number, c: number): number {
    // checks horizontal down left
    let count = 0;
    let i = r;
    let j = c;
    while (i < this.totalRows - 1 && j > 0) {
      // loops through down left moves
      if (this.rows[i + 1][j - 1] !== this.rows[r][c]) {
        break;
      }
      /*if (this.gameOver) {
        const countDownLeft = [i + 1][j - 1];
      }*/
      j -= 1;
      i++;
      count++;
    }
    return count;
  }

  countUpRight(r: number, c: number): number {
    // checks up right horizontal win
    let count = 0;
    let i = r;
    let j = c;
    while (i > 0 && j < this.totalColumns - 1) {
      // loops through up right moves
      if (this.rows[i - 1][j + 1] !== this.rows[r][c]) {
        break;
      }
      /*if (this.gameOver) {
        const countUpRight = [i - 1][j + 1];
      }*/
      i -= 1;
      j++;
      count++;
    }
    return count;
  }

  countUpLeft(r: number, c: number): number {
    // checks up left horizontal
    let count = 0;
    let i = r;
    let j = c;
    while (i > 0 && j > 0) {
      //loops through up left moves
      if (this.rows[i - 1][j - 1] !== this.rows[r][c]) {
        break;
      }
      /*if (this.gameOver) {
        const countUpLeft = [i - 1][j - 1];
        console.log(countUpLeft);
      }*/
      i -= 1;
      j -= 1;
      count++;
    }
    return count;
  }

  findWinningMovesHorizontal(
    totalLeft: number,
    totalRight: number
  ): ConnectNMove[] {
    const moves = [this.lastMove];
    for (let i = totalLeft; i > 0; i--) {
      moves.push(
        new ConnectNMove(
          this.lastMove.player,
          this.lastMove.rowIndex,
          this.lastMove.columnIndex - i
        )
      );
      totalLeft--;
    }
    for (let j = totalRight; j > 0; j--) {
      moves.push(
        new ConnectNMove(
          this.lastMove.player,
          this.lastMove.rowIndex,
          this.lastMove.columnIndex + j
        )
      );
      totalLeft--;
    }
    return moves;
  }

  findWinningMovesVertical(totalUp: number, totalDown: number): ConnectNMove[] {
    const moves = [this.lastMove];
    for (let i = totalUp; i > 0; i--) {
      moves.push(
        new ConnectNMove(
          this.lastMove.player,
          this.lastMove.rowIndex - i,
          this.lastMove.columnIndex
        )
      );
      totalUp--;
    }
    for (let j = totalDown; j > 0; j--) {
      moves.push(
        new ConnectNMove(
          this.lastMove.player,
          this.lastMove.rowIndex + j,
          this.lastMove.columnIndex
        )
      );
      totalDown--;
    }
    return moves;
  }

  findWinningMovesDiagonalDecline(
    totalUp: number,
    totalDown: number
  ): ConnectNMove[] {
    const moves = [this.lastMove];
    for (let i = totalUp; i > 0; i--) {
      moves.push(
        new ConnectNMove(
          this.lastMove.player,
          this.lastMove.rowIndex - i,
          this.lastMove.columnIndex - i
        )
      );
      totalUp--;
    }
    for (let j = totalDown; j > 0; j--) {
      moves.push(
        new ConnectNMove(
          this.lastMove.player,
          this.lastMove.rowIndex + j,
          this.lastMove.columnIndex + j
        )
      );
      totalDown--;
    }
    return moves;
  }

  findWinningMovesDiagonalIncline(
    totalUp: number,
    totalDown: number
  ): ConnectNMove[] {
    const moves = [this.lastMove];
    for (let i = totalUp; i > 0; i--) {
      moves.push(
        new ConnectNMove(
          this.lastMove.player,
          this.lastMove.rowIndex - i,
          this.lastMove.columnIndex + i
        )
      );
      totalUp--;
    }
    for (let j = totalDown; j > 0; j--) {
      moves.push(
        new ConnectNMove(
          this.lastMove.player,
          this.lastMove.rowIndex + j,
          this.lastMove.columnIndex - j
        )
      );
      totalDown--;
    }
    return moves;
  }

  getIndex(r: number, c: number) {
    // gets the index of the moves
    return this.rows[r][c];
  }

  move(rowIndex: number, columnIndex: number) {
    // pushes the move to the correct position
    if (!this.gameOver) {
      this.moves.push(new ConnectNMove(this.player, rowIndex, columnIndex));
    }
    if (!this.gameOver) {
      this.switchPlayer();
    }
  }

  reduce(props: any): ConnectNGameboard {
    // replicates the board and makes sure the move is valid and if it is it applies it to the real board
    const newState = Object.assign(new ConnectNGameboard(), this, props);
    return newState;
  }

  replace(r: number, c: number) {
    // replaces the move with the player so it knows who won
    this.rows[r][c] = this.player;
  }

  resetSettings() {
    // resets the settings
    this.inRow = 4;
    this.totalRows = 6;
    this.totalColumns = 7;
  }

  switchPlayer() {
    // switches the player when called
    this.player = this.player === 'X' ? 'O' : 'X';
  }

  undoLastTurn() {
    // creates logic for the undo last turn button
    this.switchPlayer();
    if (this.gameOver) {
      this.switchPlayer();
    }
    this.moves = this.moves.filter((x, i) => i !== this.moves.length - 1);
  }
}
