import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {TokenService} from './token.service';
import {tap} from 'rxjs/operators';

import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private af: AngularFireAuth,
    private http: HttpClient,
    private token: TokenService
    ) { }

  createUser(email: string, password: string): any
  {
  return this.af.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string): any{
  return this.af.signInWithEmailAndPassword(email, password);
  }

  logout(): any{
  return this.af.signOut();
  }

  hasUser(): any{
  return this.af.authState;
  }

  loginRestApi(email: string, password: string) {
    return this.http.post('https://platzi-store.herokuapp.com/auth', {
      email,
      password
    })
    .pipe(
      // tslint:disable-next-line: deprecation
      tap((data: {token: string}) => {
        const token = data.token;
        this.token.saveToken(token)
      })
    );
  }
}
