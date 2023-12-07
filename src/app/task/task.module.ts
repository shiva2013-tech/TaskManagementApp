import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { SharedModule } from '../shared/shared.module';
import { TaskCreateComponent } from './task-create/task-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
import { AppComponent } from '../app.component';
import { TaskUpdateComponent } from './task-update/task-update.component';
import { TaskDeleteComponent } from './task-delete/task-delete.component';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskDetailsComponent,
    TaskCreateComponent,
    TaskUpdateComponent,
    TaskDeleteComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class TaskModule { }
