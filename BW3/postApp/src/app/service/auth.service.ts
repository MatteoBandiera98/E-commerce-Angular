import { Injectable } from '@angular/core';
import { User } from '../interface/user.interface';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { Product } from '../interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogged: boolean = false;
  private userData: BehaviorSubject<any> = new BehaviorSubject(null);
  userData$ = this.userData.asObservable();
  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.isLogged = true
        this.setUserData(user)
        localStorage.setItem('user', JSON.stringify(user))
      } else {
        this.isLogged = false
        this.userData.next(null);
        localStorage.removeItem('user')
      }
    })
  }

  isFavorite(id:number) {
    let data = this.userData.value as User
    let favorites = data.favorites
    let findIndex = favorites.findIndex((prod) => {
      return prod.id === id
    })
    return findIndex !== -1
  }

  addToFavorites(product:Product) {
    let data = this.userData.value as User
    data.favorites.push(product)
    this.userData.next(data)
    this.updateUserData(data)
  }

  removeToFavorites(productId: number) {
    let data = this.userData.value as User
    let favorites = data.favorites
    let findIndex = favorites.findIndex((prod) => prod.id === productId)
    if (findIndex !== -1) {
      data.favorites.splice(findIndex, 1)
      this.userData.next(data)
      this.updateUserData(data)
    }
  }

  changeNickname(nickname: string) {
    this.afAuth.currentUser.then((value) => {
      if (value) {
        console.log(value, nickname)
        value.updateProfile({displayName: nickname}).then(() => {
          console.log(value)
          this.setUserData(value)
        })
      }
    })
  }

  login(email:string, password:string) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then((result) => {
      this.setUserData(result.user)
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          this.isLogged = true
          this.router.navigate([''])
        }
      })
    }).catch((error) => {
      this.gestioneErrori(error.message)
    })
  }

  gestioneErrori(error:string) {
    switch (true) {
      case error.includes('auth/invalid-email'):
        console.log('Email non corretta')
        break;
      case error.includes('auth/invalid-credential'):
        console.log('Email / Password errate')
        break
      default:
        break;
    }
  }

  register(email:string, password: string, username: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then((result) => {
      result.user?.updateProfile({
        displayName: username
      }).then(() => {
        this.verificateMail();
        this.setUserData(result.user)
      })
    })
  }

  verificateMail() {
    return this.afAuth.currentUser.then((u) => u?.sendEmailVerification()).then(() => {
      this.router.navigate(['verify-email'])
    })
  }

  forgotPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email).then(() => {
      window.alert('Abbiamo inviato una email per reimpostare la password')
    }).catch((error) => {
      console.log(error)
    })
  }

  logout() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate([''])
      this.isLogged = false
    })
  }

  updateUserData(user:User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL || "",
      emailVerified: user.emailVerified,
      roles: user.roles || {reader: true},
      favorites: user.favorites
    }
    const ref: AngularFireObject<User> = this.db.object(`users/${user.uid}`)
    ref.update(userData)
    this.userData.next(userData);
    userRef.set(userData, {
      merge: true,
    })
  }

  setUserData(user:any) {
    const userData2: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL || "",
      emailVerified: user.emailVerified,
      roles: user.roles || {reader: true},
      favorites: user.favorites || []
    }
    const ref: AngularFireObject<User> = this.db.object(`users/${user.uid}`)
    return ref.valueChanges().subscribe(value => {
      if (value) {
        if (!value.roles) {
          ref.update(userData2)
          this.userData.next(userData2);
          return
        }
        if (userData2.favorites.length > 0 && !value.favorites) {
          ref.update(userData2)
          this.userData.next(userData2);
          return
        }
        if (user.displayName !== value.displayName) {
          ref.update(userData2)
          this.userData.next(userData2);
          return
        }
        if (this.userData.value == null) {
          this.userData.next(userData2);
          return
        }
      } else {
        ref.update(userData2)
        this.userData.next(userData2);
        return
      }
    })
  }
}
