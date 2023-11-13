import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/model/user';
import { HomeService } from 'src/app/service/home.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  btn: String = 'Add';
  item: String = '';
  items: Todo[] = [];
  editId: number = 0;
  val: String = '';

  public constructor(
    private homeService: HomeService,
    private loginService: LoginService,
    private router: Router
  ) {
    homeService.getItems().subscribe({
      next: (items: Todo[]) => {
        this.items = items;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  addOrEditItem(): void {
    console.log(this.item);
    this.homeService.addOrEditItems(this.item, this.editId).subscribe({
      next: (items: Todo[]) => {
        this.items = items;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
    this.item = '';
    this.btn = 'Add';
    this.editId = 0;
    // console.log(this.item);
  }

  deleteItems(deleteid: any): void {
    this.homeService.deleteItems(deleteid).subscribe({
      next: (items: Todo[]) => {
        this.items = items;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }
  
  editItems(editid: any): void {
    this.homeService.findItem(editid).subscribe({
      next: (val: Todo) => {
        this.val = val.todo;
        this.item = this.val;
        // console.log(this.item);
        this.btn = 'Edit';
        this.editId = editid;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate([''], { replaceUrl: true });
  }

}
