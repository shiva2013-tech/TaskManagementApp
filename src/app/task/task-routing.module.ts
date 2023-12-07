import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskUpdateComponent } from './task-update/task-update.component';
import { TaskDeleteComponent } from './task-delete/task-delete.component';
const routes: Routes = [
 { path: 'list', component: TaskListComponent },
  { path: 'details/:id', component: TaskDetailsComponent },
  { path: 'create', component: TaskCreateComponent },
  { path: 'update/:id', component: TaskUpdateComponent },
{ path: 'delete/:id', component: TaskDeleteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
