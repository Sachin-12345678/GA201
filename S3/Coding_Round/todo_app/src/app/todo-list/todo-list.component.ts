import { Component } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
   todos: string[]=[];
   newTodo: string="";

   addTodo(){
    if(this.newTodo.trim() !== "")
    {
      this.todos.push(this.newTodo);
      this.newTodo="";
    }
   }

   removeTodo(index: number)
   {
    this.todos.splice(index,1);
   }
}
