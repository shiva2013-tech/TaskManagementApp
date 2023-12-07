import { Component,OnInit } from '@angular/core';
import {Task } from 'src/app/_interfaces/task.model';
import { TaskRepositoryService } from 'src/app/shared/services/task-repository.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit{
tasks: Task[];
errorMessage: string = '';

constructor(private repository: TaskRepositoryService,private errorHandler:ErrorHandlerService,private router:Router){}

ngOnInit():void{
this.getAllTasks();

}


private getAllTasks = () => {
  const apiAddress: string = 'api/tasks';
  this.repository.getTasks(apiAddress).subscribe({
    next: (task: Task[]) => {
      this.tasks = task;
    },
    error: (err: HttpErrorResponse) => {
      this.errorHandler.handleError(err);
      this.errorMessage = this.errorHandler.errorMessage;
    },
  });
};


public getTaskDetails = () => {
const detailsUrl: string = '/api/details/${id}';
this.router.navigate([detailsUrl]);
}

public redirectToUpdatePage = (id) => { 
  const updateUrl: string = `/task/update/${id}`; 
  this.router.navigate([updateUrl]); 
}

public redirectToDeletePage = (id) => { 
  const deleteUrl: string = `/task/delete/${id}`; 
  this.router.navigate([deleteUrl]); 
}

}
