export class ConnectNMove {
  constructor(public player: 'X' | 'O', public rowIndex, public columnIndex) {}
}

export class ConnectNGameboard {
  board: string[][] = [];
  count = 0;
  inRow = 4;
  moves: ConnectNMove[] = [];
  player: 'X' | 'O' = 'X';
  totalColumns = 7;
  totalRows = 6;

  get blankRows(): string[][] {
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
    if (this.lastMove) {
      const r = this.lastMove ? this.lastMove.rowIndex : 0;
      const c = this.lastMove ? this.lastMove.columnIndex : 0;
      return this.checkH(r, c) || this.checkV(r, c) || this.checkD(r, c);
    }
    return false;
  }

  get lastMove(): ConnectNMove {
    return this.moves.length > 0 ? this.moves[this.moves.length - 1] : null;
  }

  get rows(): string[][] {
    const blankRows = this.blankRows;
    return this.moves.reduce((acc, move) => {
      acc[move.rowIndex][move.columnIndex] = move.player;
      return acc;
    }, blankRows);
  }

  checkD(r: number, c: number): boolean {
    return (
      this.countUpRight(r, c) + this.countDownLeft(r, c) >= this.inRow - 1 ||
      this.countDownRight(r, c) + this.countUpLeft(r, c) >= this.inRow - 1
    );
  }

  checkH(r: number, c: number): boolean {
    return this.countLeft(r, c) + this.countRight(r, c) >= this.inRow - 1;
  }

  checkV(r: number, c: number): boolean {
    return this.countUp(r, c) + this.countDown(r, c) >= this.inRow - 1;
  }

  clearBoard() {
    this.moves = [];
  }

  countDown(r: number, c: number): number {
    let count = 0;
    let i = r;

    while (i < this.totalRows - 1) {
      if (this.rows[i + 1][c] !== this.rows[r][c]) {
        break;
      }
      count++;
      i++;
    }
    return count;
  }

  countLeft(r: number, c: number): number {
    let count = 0;
    let i = c;
    while (i > 0) {
      if (this.rows[r][i - 1] !== this.rows[r][c]) {
        break;
      }
      count++;
      i -= 1;
    }
    return count;
  }

  countRight(r: number, c: number): number {
    let count = 0;
    let i = c;
    while (i < this.totalColumns - 1) {
      // console.log(this.rows[r][i + 1], this.rows[r][c]);
      if (this.rows[r][i + 1] !== this.rows[r][c]) {
        break;
      }
      count++;
      i++;
    }
    return count;
  }

  countUp(r: number, c: number): number {
    let count = 0;
    let i = r;
    while (i > 0) {
      if (this.rows[i - 1][c] !== this.rows[r][c]) {
        break;
      }
      count++;
      i -= 1;
    }
    return count;
  }

  countDownRight(r: number, c: number): number {
    let count = 0;
    let i = r;
    let j = c;
    while (i < this.totalRows - 1 && j < this.totalColumns - 1) {
      if (this.rows[i + 1][j + 1] !== this.rows[r][c]) {
        break;
      }
      i++;
      j++;
      count++;
    }
    return count;
  }

  countDownLeft(r: number, c: number): number {
    let count = 0;
    let i = r;
    let j = c;
    while (i < this.totalRows - 1 && j > 0) {
      if (this.rows[i + 1][j - 1] !== this.rows[r][c]) {
        break;
      }
      j -= 1;
      i++;
      count++;
    }
    return count;
  }

  countUpRight(r: number, c: number): number {
    let count = 0;
    let i = r;
    let j = c;
    while (i > 0 && j < this.totalColumns - 1) {
      if (this.rows[i - 1][j + 1] !== this.rows[r][c]) {
        break;
      }
      i -= 1;
      j++;
      count++;
    }
    return count;
  }

  countUpLeft(r: number, c: number): number {
    let count = 0;
    let i = r;
    let j = c;
    while (i > 0 && j > 0) {
      if (this.rows[i - 1][j - 1] !== this.rows[r][c]) {
        break;
      }
      i -= 1;
      j -= 1;
      count++;
    }
    return count;
  }

  getIndex(r: number, c: number) {
    return this.rows[r][c];
  }

  move(rowIndex: number, columnIndex: number) {
    if (!this.gameOver) {
      this.moves.push(new ConnectNMove(this.player, rowIndex, columnIndex));
    }
    if (!this.gameOver) {
      this.switchPlayer();
    }
  }

  reduce(props: any): ConnectNGameboard {
    const newState = Object.assign(new ConnectNGameboard(), this, props);
    console.dir(newState);
    return newState;
  }

  replace(r: number, c: number) {
    this.rows[r][c] = this.player;
  }

  switchPlayer() {
    this.player = this.player === 'X' ? 'O' : 'X';
  }
}
