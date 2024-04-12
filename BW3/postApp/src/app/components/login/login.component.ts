import { Component } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    constructor(private authSrv: AuthService) {}
    onSubmit(form:AbstractControl) {
      this.authSrv.login(form.value.email, form.value.password)
      form.reset();
    }
}
