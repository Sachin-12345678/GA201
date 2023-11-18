// task-add.components.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TaskService } from '../task.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css'],
})
export class TaskAddComponent {
  newTask: Task = { id: 0, title: '', description: '', completed: false };

  constructor(private taskService: TaskService) {}

  addTask(): void {
    // Make sure to create a new object to avoid reference issues
    this.taskService.addTask({ ...this.newTask });
    this.newTask = { id: 0, title: '', description: '', completed: false };
  }
}

