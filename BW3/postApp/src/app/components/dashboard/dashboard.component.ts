import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/interface/user.interface';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../modal/modal.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user!: User;
  modalRef: MdbModalRef<ModalComponent> | null = null
  constructor(private authSrv: AuthService, private router: Router, private modalService: MdbModalService) {
  }

  ngOnInit(): void {
    this.authSrv.userData$.subscribe((value) => {
      this.user = value
    })
    setTimeout(() => {
      if (!this.authSrv.isLogged) {
        this.router.navigate(['/'])
      }
    }, 300)
  }

  cambiaPassword() {
    this.authSrv.forgotPassword(this.user.email)
    // alert('Abbiamo inviato una mail a '+this.user.email+' per effettuare il cambio password')
  }

  cambiaNickname() {
    this.modalRef = this.modalService.open(ModalComponent, {
      data: {
        title: 'Cambia NickName'
      }
    })
    this.modalRef.onClose.subscribe((message:{nickname: string}|null) => {
      if (message) {
        console.log(message)
        this.authSrv.changeNickname(message.nickname)
      }
    })
  }

  cambiaFotoProfilo() {

  }
}
