import { SuccessModalComponent } from '../../shared/modals/success-modal/success-modal.component';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { TaskRepositoryService } from '../../shared/services/task-repository.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/_interfaces/task.model';
import { HttpErrorResponse } from '@angular/common/http';
import { TaskForCreation } from 'src/app/_interfaces/taskForCreation.model';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {
  errorMessage: string = '';
  taskForm: FormGroup;
  bsModalRef?: BsModalRef;

  constructor(private repository: TaskRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router, private datePipe: DatePipe, private modal: BsModalService) { }

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      description: new FormControl('', [Validators.required]),
      lastDate: new FormControl('', [Validators.required])
    });
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

  createTask = (taskFormValue) => {
    if (this.taskForm.valid)
      this.executeTaskCreation(taskFormValue);
  }

  private executeTaskCreation = (taskFormValue) => {
    const task: TaskForCreation = {
      title: taskFormValue.title,
      description: taskFormValue.description,
      lastDate: this.datePipe.transform(taskFormValue.lastDate, 'yyyy-MM-dd')
    }
    const apiUrl = 'api/tasks';
    this.repository.createTask(apiUrl, task)
    .subscribe({
      next: (task: Task[]) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Success Message',
            modalBodyText: `Task: ${task["title"]} created successfully`,
            okButtonText: 'OK'
          }
        };

        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToTaskList());
      },
      error: (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
          this.errorMessage = this.errorHandler.errorMessage;
      }
    })

  }

redirectToTaskList = () => {
  this.router.navigate(['/task/list']);
}

}