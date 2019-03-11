export class ConnectNGameboard {
  board: string[][];
  player = '';
  totalRows = 0;
  totalColumns = 0;
  count = 0;
  inRow = 0;

  constructor() {}

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
    return 0;
  }

  countLeft(r: number, c: number): number {
    return 0;
  }

  countRight(r: number, c: number): number {
    return 0;
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
    return 0;
  }

  countDownLeft(r: number, c: number): number {
    return 0;
  }

  countUpRight(r: number, c: number): number {
    return 0;
  }

  countUpLeft(r: number, c: number): number {
    return 0;
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
