import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  getUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:8080/api/appuser/login', user);
  }

  users:User[]=[];

  login(name: String, password: String): boolean {
    let user: User = { name: name, password: password };

    this.getUser(user).subscribe({
      next: (user: User) => {
        this.users.push(user);
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });

    
    if (this.users.length>0) {
      if(!sessionStorage.getItem("user"))
      {
      sessionStorage.setItem("user",JSON.stringify(this.users[0]));
      }
      return true;
    } else {
      return false;
    }
  }

  logout() : void 
  {
    this.users=[];
    sessionStorage.removeItem("user");
  }
}
