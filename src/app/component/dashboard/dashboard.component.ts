import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  taskObj: Task = new Task();
  taskList: Task[] = [];

  addTaskValue: string = '';
  editTaskValue: string = '';

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.addTaskValue = '';
    this.editTaskValue = '';
    this.taskObj = new Task();
    this.taskList = [];
    this.getAllTask();
  }

  getAllTask() {
    this.crudService.getAllTasks().subscribe(
      (data) => {
        this.taskList = data;
      },
      (error) => {
        alert('Error while getting task' + error);
      }
    );
  }

  addTask() {
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe(
      (data) => {
        this.taskList.push(data);
        this.addTaskValue = '';
      },
      (error) => {
        alert('Error while adding task' + error);
      }
    );
  }

  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(
      (data) => {
        this.ngOnInit();
      },
      (error) => {
        alert('Error while editing task' + error);
      }
    );
  }

  deleteTask(etask: Task) {
    this.crudService.deleteTask(etask).subscribe(
      (data) => {
        this.ngOnInit();
      },
      (error) => {
        alert('Error while deleting task' + error);
      }
    );
  }

  call(etask: Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }
}
