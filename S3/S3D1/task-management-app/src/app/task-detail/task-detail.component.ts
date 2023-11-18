// task-detail.component.ts

import { Component, Input } from '@angular/core';
import { Task } from '../task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
})
export class TaskDetailComponent {
  @Input() task: Task | undefined;
}
