import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
})
export class CounterComponent {
  count: number = 0;

  incrementCount() {
    this.count++;
  }

  decrementCount() {
    this.count--;
  }

  resetCount() {
    this.count = 0;
  }
}
