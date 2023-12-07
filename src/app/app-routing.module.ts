import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';

const routes: Routes = [
{path:'home',component:HomeComponent},
{path:'task', loadChildren: () => import('./task/task.module').then(m => m.TaskModule)},
{path:'404',component:NotFoundComponent},
{path:'500',component:InternalServerComponent},
{path:'',redirectTo:'/home',pathMatch:'full'},
{path:'**',redirectTo:'/404',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
