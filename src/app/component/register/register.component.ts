import { Component } from '@angular/core';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  
  name:String='';
  password:String='';
  cpassword:String='';

  public constructor(private registerService:RegisterService){}

  register():void
  {
    this.registerService.register(this.name,this.password);
  }

}
