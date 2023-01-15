import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {Observable, tap} from 'rxjs';
import {Store} from '@ngrx/store';
import {UserStore} from '../../models/user-store.model';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user$: Observable<any>;

  constructor(private store: Store<UserStore>) {
    this.user$ = store.select('user').pipe(
      // tap(u => { console.log(u)})
    );
  }

  ngOnInit(): void {
  }

  goToLoginPage() {
    window.location.href = 'https://api-staging.csgoroll.com/auth/steam?redirectUri=http://localhost:4200';
  }

  logout() {
    this.store.dispatch({
      type: 'LOGOUT',
      payload: null
    });
  }
}
