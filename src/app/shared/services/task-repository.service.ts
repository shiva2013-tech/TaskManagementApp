import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from './environment-url.service';
import { Task } from '../../_interfaces/task.model';
import { TaskForCreation } from 'src/app/_interfaces/taskForCreation.model';
import { TaskForUpdate } from 'src/app/_interfaces/taskForUpdate.model';

@Injectable({
  providedIn: 'root'
})
export class TaskRepositoryService {

  constructor(private http:HttpClient,private envUrl:EnvironmentUrlService) { }

public getTasks = (route:string) =>{
return this.http.get<Task[]>(this.createCompleteRoute(route,this.envUrl.urlAddress));
}

public createTask = (route: string, task: TaskForCreation) =>{
return this.http.post<Task[]>(this.createCompleteRoute(route,this.envUrl.urlAddress), task, this.generateHeaders());
}

public updateTask = (route: string, task: TaskForUpdate) =>{
return this.http.put<Task[]>(this.createCompleteRoute(route,this.envUrl.urlAddress), task, this.generateHeaders());
}

public deleteTask = (route:string) =>{
return this.http.delete<Task[]>(this.createCompleteRoute(route,this.envUrl.urlAddress));
}

public getTask = (route: string) =>{
return this.http.get<Task>(this.createCompleteRoute(route, this.envUrl.urlAddress));
}


public createCompleteRoute= (route:string, envAddress:string) =>{
return `${envAddress}/${route}`;
}


private generateHeaders = () => {
return{
headers: new HttpHeaders({'Content-Type':'application/json'})
}
}


}
