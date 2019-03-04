import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'games-eight-ball',
  templateUrl: './eight-ball.component.html',
  styleUrls: ['./eight-ball.component.scss']
})
export class EightBallComponent implements OnInit {
  fortunes = [
    'It is certain.',
    'It is decidedly so.',
    'Without a doubt.',
    'Yes - defintely.',
    'You may rely on it.',
    'As I see it, yes.',
    'Most likely.',
    'Outlook good.',
    'Yes.',
    'Signs point to yes.',
    'Reply hazy, try again.',
    'Ask again later.',
    'Better not tell you now.',
    'Cannot predict now.',
    'Concentrate and ask again.',
    "Don't count on it.",
    'My reply is no.',
    'My sources say no.',
    'Outlook not so good.',
    'Very doubtful.'
  ];
  fortune = '';

  constructor() {}

  ngOnInit() {}

  inRange(myNumber, lowerBound, upperBound) {
    return myNumber > lowerBound && myNumber < upperBound;
  }

  shake() {
    const rand = Math.random();
    const n = this.fortunes.length;
    this.fortune = this.fortunes.find((x, i) =>
      this.inRange(rand, i / n, (i + 1) / n)
    );
  }
}
