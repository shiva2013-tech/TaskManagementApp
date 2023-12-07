import { Component ,OnInit} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { TaskRepositoryService } from '../../shared/services/task-repository.service';
import { Task } from '../../_interfaces/task.model';

import { BsModalRef, ModalOptions, BsModalService } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';

@Component({
  selector: 'app-task-delete',
  templateUrl: './task-delete.component.html',
  styleUrls: ['./task-delete.component.css']
})
export class TaskDeleteComponent implements OnInit {
  task: Task;
  bsModalRef?: BsModalRef;
  constructor(private repository: TaskRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router, private activeRoute: ActivatedRoute, private modal: BsModalService) { }
ngOnInit(): void {
  this.getTaskById();
}


private getTaskById = () => {
  const taskId: string = this.activeRoute.snapshot.params['id'];
  const apiUri: string = `api/tasks/${taskId}`;
  this.repository.getTask(apiUri)
  .subscribe({
    next: (task: Task) => this.task = task,
    error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
  })
}
redirectToTaskList = () => {
  this.router.navigate(['/task/list']);
}


deleteTask = () => {
  const deleteUri: string = `api/tasks/${this.task.id}`;
  this.repository.deleteTask(deleteUri)
  .subscribe({
    next: (_) => {
      const config: ModalOptions = {
        initialState: {
          modalHeaderText: 'Success Message',
          modalBodyText: `Task deleted successfully`,
          okButtonText: 'OK'
        }
      };
      this.bsModalRef = this.modal.show(SuccessModalComponent, config);
      this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToTaskList());
    },
    error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
  })
}

}
