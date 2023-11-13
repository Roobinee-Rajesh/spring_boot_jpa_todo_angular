import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  name: String = '';
  password: String = '';
  

  public constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  login(): void {
    let isUser = this.loginService.login(this.name, this.password);
    if (isUser) {
      this.router.navigate(['todo'], { replaceUrl: true });
    }
    else 
    {
      this.router.navigate([''], { replaceUrl: true });
    }
  }

}
