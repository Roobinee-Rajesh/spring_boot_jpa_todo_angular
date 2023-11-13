import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http:HttpClient) { }

  addUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:8080/api/appuser/register', user);
  }

  register(name:String,password:String):void
  {
      let user={name:name,password:password};
      this.addUser(user).subscribe({
        next: (user: User) => {
          
        },
        complete: () => {},
        error: (error: Error) => {
          console.log('Message:', error.message);
          console.log('Name:', error.name);
        },
      });
  }
}
