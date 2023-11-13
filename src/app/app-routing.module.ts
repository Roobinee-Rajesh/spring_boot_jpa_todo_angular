import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [  { path: '', component: LoginComponent },
{ path: 'register', component: RegisterComponent},
{ path: 'home', component: HomeComponent},
{ path: 'login', component: LoginComponent }];
// { path: '**', component: NotFoundComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
