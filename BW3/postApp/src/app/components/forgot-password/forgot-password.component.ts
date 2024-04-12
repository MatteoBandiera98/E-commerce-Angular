import { Component } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  constructor(private authSrv: AuthService, private router: Router) {}

  onSubmit(form:AbstractControl) {
    this.authSrv.forgotPassword(form.value.email).then(() => {
      form.reset();
      this.router.navigate(['/login'])
    })
  }
}
