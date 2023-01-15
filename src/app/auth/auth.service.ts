import { Injectable } from '@angular/core';
import {select, State, Store} from '@ngrx/store';
import {UserStore} from '../models/user-store.model';
import {take} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  constructor(private store: Store<UserStore>)
  { }

  isAuthenticated() {
    let state;

    this.store.pipe(select('user'), take(1)).subscribe(
      s => state = s
    );

    return !!state && !!state['user'];
  }
}
