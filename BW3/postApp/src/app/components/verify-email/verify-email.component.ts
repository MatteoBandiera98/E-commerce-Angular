import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent {
  userData:any = null
  constructor(public authSrv:AuthService){
    this.authSrv.userData$.subscribe((value) => {
      this.userData = value
    })
  }
}
