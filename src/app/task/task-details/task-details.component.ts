import { Component,OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/_interfaces/task.model';
import { TaskRepositoryService } from 'src/app/shared/services/task-repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit{
task: Task;
errorMessage: string = '';

constructor(private repository:TaskRepositoryService,private router:Router,private activeRoute:ActivatedRoute,private errorHandler:ErrorHandlerService){}
ngOnInit(){
this.getTaskDetails;
}

getTaskDetails = () => {
const id: string = this.activeRoute.snapshot.params['id'];
const apiUrl:string = `api/tasks/${id}/account`;

this.repository.getTask(apiUrl)
.subscribe({
next:(task:Task)=>this.task = task,
error:(err:HttpErrorResponse)=>{
this.errorHandler.handleError(err);
this.errorMessage = this.errorHandler.errorMessage;
}
})
}
}
