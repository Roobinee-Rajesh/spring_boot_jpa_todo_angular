import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http: HttpClient) {}

  getItems(): Observable<Todo[]> {
    let loggedInUser = JSON.parse(sessionStorage.getItem('user')!);

    return this.http.get<Todo[]>(
      'http://localhost:8080/api/todo/' + loggedInUser.id
    );
  }

  insertItems(item: Todo): Observable<Todo[]> {
    return this.http.post<Todo[]>('http://localhost:8080/api/todo/add', item);
  }

  updateItems(item: Todo): Observable<Todo[]> {
    return this.http.put<Todo[]>('http://localhost:8080/api/todo/update', item);
  }

  deleteTodo(id:number) : Observable<Todo[]>{
    return this.http.delete<Todo[]>('http://localhost:8080/api/todo/delete/'+id);
  }

  findTodo(id:number) : Observable<Todo>{
    return this.http.get<Todo>('http://localhost:8080/api/todo/find/'+id);
  }

  addOrEditItems(itemnew: String, editId: number): Observable<Todo[]> {
    let loggedInUser = JSON.parse(sessionStorage.getItem('user')!);
    return new Observable((observer) => {
      if (itemnew !== '') {
        if (editId === 0) {
          let item: Todo = { todo: itemnew, userId: loggedInUser.id };
          console.log(item);
          this.insertItems(item).subscribe({
            next: (data: Todo[]) => {
              observer.next(data);
            },
          });
        } else {
          let item: Todo = { id: editId, todo: itemnew, userId: loggedInUser.id };
          // console.log(item);
          this.updateItems(item).subscribe({
            next: (data: Todo[]) => {
              observer.next(data);
            },
          });
        }
      }
    });
  }

  deleteItems(id:number) : Observable<Todo[]>
  {
    return new Observable((observer)=>{
      this.deleteTodo(id).subscribe({
        next:(data:Todo[])=>{
          observer.next(data);
        }
      })
    });
  }

  findItem(id:number) : Observable<Todo>
  {
    return new Observable((observer)=>{
      this.findTodo(id).subscribe({
        next:(data:Todo)=>{
          observer.next(data);
        }
      })
    });
  }

}
