
import { Component, OnInit } from '@angular/core';
import { TaskForUpdate } from '../../_interfaces/taskForUpdate.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../_interfaces/task.model';
import { TaskRepositoryService } from 'src/app/shared/services/task-repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.css']
})
export class TaskUpdateComponent implements OnInit{
task: Task;
taskForm: FormGroup;
bsModalRef?:BsModalRef;

constructor(private repository: TaskRepositoryService, private errorHandler: ErrorHandlerService, 
  private router: Router, private activeRoute: ActivatedRoute, private datePipe: DatePipe,
  private modal: BsModalService) { }

ngOnInit(): void {
  this.taskForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(60)]),
    description: new FormControl('', [Validators.required]),
    lastDate: new FormControl('', [Validators.required])
  });
  this.getTaskById();
}
private getTaskById = () => {
  const taskId: string = this.activeRoute.snapshot.params['id'];
  const taskByIdUri: string = `api/tasks/${taskId}`;
  this.repository.getTask(taskByIdUri)
  .subscribe({
    next: (task: Task) => {
      this.task = { ...task, 
        lastDate: new Date(this.datePipe.transform(task.lastDate, 'MM/dd/yyyy'))
      };
      this.taskForm.patchValue(this.task);
    },
    error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
  })
}


public updateTask = (taskFormValue) => {
  if (this.taskForm.valid)
    this.executeTaskUpdate(taskFormValue);
}
private executeTaskUpdate = (taskFormValue) => {
  const taskForUpd: TaskForUpdate = {
    title: taskFormValue.title,
    description: taskFormValue.description,
    lastDate: this.datePipe.transform(taskFormValue.lastDate, 'yyyy-MM-dd'),
  }
  const apiUri: string = `api/tasks/${this.task.id}`;
  this.repository.updateTask(apiUri, taskForUpd)
  .subscribe({
    next: (_) => {
      const config: ModalOptions = {
        initialState: {
          modalHeaderText: 'Success Message',
          modalBodyText: 'Task updated successfully',
          okButtonText: 'OK'
        }
      };
      this.bsModalRef = this.modal.show(SuccessModalComponent, config);
      this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToTaskList());
    },
    error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
  })
}

public redirectToTaskList = () => {
  this.router.navigate(['/task/list']);
}

validateControl = (controlName: string) => {

  if (this.taskForm.get(controlName).invalid && this.taskForm.get(controlName).touched)
    return true;
  
  return false;
} 
hasError = (controlName: string, errorName: string) => {
  if (this.taskForm.get(controlName).hasError(errorName))
    return true;
  
  return false;
}

}
