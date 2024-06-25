import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {
  editMode: boolean = false;
  editTaskId: number | null = null;

  constructor(private taskservice: TaskService) {}

  ngOnInit(): void {
    this.getAllTasks();
  }

  newTask: Task = { description: " ", status: false };
  tasks: Task[] = [];

  createTask(): void {
    if (this.editMode) {
      this.updateTask();
    } else {
      this.taskservice.createtask(this.newTask).subscribe(() => {
        this.newTask = { description: " ", status: false };
        this.getAllTasks();
      });
    }
  }

  getAllTasks() {
    this.taskservice.getalltask().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  editTask(task: Task): void {
    console.log('Editing task', task);
    this.newTask = { ...task };
    this.editMode = true;
    this.editTaskId = task.id ?? null; 
  }

  updateTask(): void {
    if (this.editTaskId !== null) {
      this.taskservice.updateTask({ ...this.newTask, id: this.editTaskId }).subscribe(() => {
        this.newTask = { description: " ", status: false };
        this.editMode = false;
        this.editTaskId = null;
        this.getAllTasks();
      });
    }
  }

  deleteTask(id: number): void {
    this.taskservice.deleteTask(id).subscribe(() => {
      this.getAllTasks();
    });
  }
}