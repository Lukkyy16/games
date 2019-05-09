import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef
} from '@angular/core';

import { ConnectNGameboard } from './connect-n.model';

@Component({
  selector: 'games-connect-n',
  templateUrl: './connect-n.component.html',
  styleUrls: ['./connect-n.component.scss']
})
export class ConnectNComponent implements OnInit {
  @ViewChild('board') board: ElementRef;
  gameboard = new ConnectNGameboard(); //variables
  player1Name = '';
  player2Name = '';
  showSettings = true;
  count = 0;
  occupied = '';
  cuztomize = 0;
  errorMessage = '';
  hoverLeft = 0;
  playerError = 0;
  isSound = true;

  constructor() {}

  get boardWidth() {
    //creates board width based on amount of columns entered by the user
    return this.totalColumns * 80;
  }

  get boardHeight() {
    //creates board height based on amount of rows entered by the user
    return this.totalRows * 85;
  }

  get winner() {
    //figures out if someone won or not
    if (this.gameboard.gameOver) {
      if (this.isSound) {
        this.audioWinner();
        this.isSound = false;
      }
    }
    return this.gameboard.gameOver ? this.player : null;
  }

  get buttonText() {
    //determines whether show or hides setting needs to be displayed for the button
    return this.showSettings ? 'Hide Settings' : 'Show Settings';
  }

  get gameboardStart(): number {
    //gets starting board pixels
    return this.board.nativeElement.offsetLeft;
  }

  get gameboardEnd(): number {
    //gets the end length of the board
    return (
      this.board.nativeElement.offsetLeft + this.board.nativeElement.clientWidth
    );
  }

  get gameboardWidth(): number {
    //gets the wifth of the gameboard
    return this.board.nativeElement.clientWidth;
  }

  set inRow(value: number) {
    //sets the inrow variable
    if (value < 8) {
      //makes sure its less than 8
      if (value > 2) {
        //makes sure its greater than 2
        this.gameboard = this.gameboard.reduce({ inRow: value });
      } else {
        this.flashErrorMessage(
          'Make sure the connect how many is greater than 2'
        ); //flashes error if they entered a too small number
      }
    } else {
      this.flashErrorMessage('Make sure the connect how many is less than 8'); //flashes error if they entered a number too high
    }
  }

  get inRow() {
    //returns the inRow value to be used by the other values
    return this.gameboard.inRow;
  }

  get player(): string {
    //gets the x to equal player 1 or
    return this.gameboard.player === 'X' ? this.player1Name : this.player2Name;
  }

  get tie() {
    //checks to see if all spots are taken
    const maxMoves = this.totalColumns * this.totalRows;
    if (this.gameboard.totalMoves === maxMoves) {
      return true;
    }
    return false;
  }

  set totalColumns(value: number) {
    //sets the total columns to a value entered by a user
    if (value < 10) {
      //makes sure the value is less than 10
      if (value > 3) {
        //makes sure the value is greater than 3
        this.gameboard = this.gameboard.reduce({ totalColumns: value });
      } else {
        this.flashErrorMessage('Make sure the total columns is greater than 3'); //displays error message if smaller than 3
      }
    } else {
      this.flashErrorMessage('Make sure the total columns is less than 10'); //displays error messgae if greaterthan 10
    }
  }

  get totalColumns() {
    //returns the totalColumn value so the rest of the code can use it
    return this.gameboard.totalColumns;
  }

  set totalRows(value: number) {
    //sets total rows to the value entered by the user
    if (value < 10) {
      //makes sure the value is less than 10
      if (value > 3) {
        //makes sure the value is less than 3
        this.gameboard = this.gameboard.reduce({ totalRows: value });
      } else {
        this.flashErrorMessage('Make sure the total rows is greater than 3'); //displays error message if lower than 3
      }
    } else {
      this.flashErrorMessage('Make sure the total rows is less than 10'); //displays error message if greater than 10
    }
  }

  get totalRows() {
    //returns the totalRows value
    return this.gameboard.totalRows;
  }

  ngOnInit() {}

  clearBoard() {
    //returns the clear board value to be used else where
    this.gameboard.clearBoard();
  }

  audioWinner() {
    const audio = new Audio('assets/jingle.mp3');
    audio.play();
  }

  chipSound() {
    const chipDrop = new Audio('assets/chip drop.mp3');
    chipDrop.play();
  }

  click(row: number, col: number) {
    //anytime someone clicks a circle this runs
    let count = 0;
    if (this.player1Name !== '' && this.player2Name !== '') {
      //makes sure the names are entered
      for (let i = this.totalRows - 1; i > 0; i -= 1) {
        //loops through and places the chip at the lowest possible spot
        if (this.gameboard.rows[i][col] === null) {
          //if the spot is empty adds one to count
          count++;
          if (!this.gameboard.gameOver) {
            this.chipSound();
          }
        }
      }
      row = count; //makes row equal the lowest possible row
      if (this.gameboard.rows[row][col] === null) {
        //makes sure the column isnt full
        this.gameboard.move(row, col);
      }
      count = 0;
    } else {
      this.flashErrorMessage('Please enter player names before moving!'); //flashes error if names arent entered
    }
  }

  flashErrorMessage(message: string) {
    //creates the error message and its details
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

  @HostListener('document:mousemove', ['$event']) //listening to mouse moves and following where the mouse is with board limits
  onMouseMove(e) {
    this.hoverLeft = Math.min(
      Math.max(e.pageX - this.gameboardStart - 32.5, 0),
      this.gameboardWidth - 65
    );
  }

  isBlinking(rowIndex: number, columnIndex: number): boolean { //finds out whether the circles are blinking
    const winningMoves = this.gameboard.winningMoves;
    return winningMoves
      ? winningMoves.findIndex(
          x => x.rowIndex === rowIndex && x.columnIndex === columnIndex
        ) !== -1
      : false;
  }

  resetTheSettings() {
    //creates the reset board
    this.gameboard.resetSettings();
  }

  undoLastTurn() {
    //creates the undolasturn
    if (!this.isSound) {
      this.isSound = true;
    }
    this.gameboard.undoLastTurn();
  }
}
