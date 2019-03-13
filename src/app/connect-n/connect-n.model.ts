export class ConnectNGameboard {
  player = 'O';
  count = 0;
  board: string[][] = [];

  constructor(
    public totalRows: number,
    public totalColumns: number,
    public inRow: number
  ) {
    for (let r = 0; r < this.totalRows; r++) {
      this.board.push(new Array(this.totalColumns));
    }
    for (let r = 0; r < this.totalRows; r++) {
      for (let c = 0; c < this.totalColumns; c++) {
        this.board[r][c] = '-';
      }
    }
    console.dir(this.board);
  }

  check(r: number, c: number): boolean {
    return this.board[r][c] === '-'
      ? false
      : this.checkH(r, c) || this.checkV(r, c) || this.checkD(r, c);
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

  countDown(r: number, c: number): number {
    let count = 0;
    let i = r;

    while (i < this.totalRows - 1) {
      if (this.board[i + 1][c] !== this.board[r][c]) {
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
      if (this.board[r][i - 1] !== this.board[r][c]) {
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
      if (this.board[r][i + 1] !== this.board[r][c]) {
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
      if (this.board[i - 1][c] !== this.board[r][c]) {
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
      if (this.board[i + 1][j + 1] !== this.board[r][c]) {
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
      if (this.board[i + 1][j - 1] !== this.board[r][c]) {
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
      if (this.board[i - 1][j + 1] !== this.board[r][c]) {
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
      if (this.board[i - 1][j - 1] !== this.board[r][c]) {
        break;
      }
      i -= 1;
      j -= 1;
      count++;
    }
    return count;
  }

  getIndex(r: number, c: number) {
    return this.board[r][c];
  }

  replace(r: number, c: number) {
    this.board[r][c] = this.player;
  }

  switchPlayer() {
    if (this.player === 'O') {
      this.player = 'X';
    } else {
      this.player = 'O';
    }
  }
}
