import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  counter = 0;

  randomBackground: string = '';
  whiteText: string = '';
  colorOptions: string[] = [];
  clicked: boolean = false;
  correctColor: boolean = false;

  ngOnInit() {
    this.randomBackground = this.getRandomColor();
    this.whiteText = this.checkDarkness(this.randomBackground)
      ? '#fff'
      : '#3e3e3e';
    this.colorOptions = this.createColors();
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++)
      color += letters[Math.floor(Math.random() * 16)];
    return color;
  }

  checkDarkness(color: string): boolean {
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness <= 125;
  }

  createColors(): string[] {
    const colors = [this.randomBackground];

    for (let i = 0; i < 2; i++) colors.push(this.getRandomColor());

    return colors.sort(() => Math.random() - 0.5);
  }

  checkCorrect(color: string) {
    this.clicked = true;
    this.correctColor = color === this.randomBackground;

    if (this.correctColor) {
      this.counter++;

      setTimeout(() => {
        this.ngOnInit();
        this.clicked = false;
      }, 2000);
    } else this.counter = 0;
  }
}
