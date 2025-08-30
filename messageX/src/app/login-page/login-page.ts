import { Component } from '@angular/core';
import { Common } from '../common';

@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {
  activeTab: 'login' | 'register' = 'login';
  username: string = "";
  password: string = "";
  confrim_password: string = "";

  constructor(
    private _commonService: Common
  ) {}

  onSubmit(form: any){
    console.log(this.activeTab, form?.value)
    if (form?.valid) {
      let payload = form?.value
      if (this.activeTab === "register" && form?.value?.password === form?.value?.confirmPassword ) {
        this._commonService.createUser(payload)
      }
      else if (this.activeTab === "login" ) {
        this._commonService.doLogin(payload)
      }
    }
  }

}
