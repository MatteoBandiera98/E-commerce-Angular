import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confpassword: new FormControl('')
  }, {validators: [Validators.required, this.validatePassword]});

  constructor(private authSrv: AuthService) {}

  validatePassword(formGroup: AbstractControl) {
    if (formGroup.value.password === formGroup.value.confpassword) {
      return null
    } else {
      return {passwordMismatch: true}
    }
  }

  onSubmit() {
    this.authSrv.register(this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.username)
    this.registerForm.reset()
  }
}
