import {AfterViewChecked, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {Observable, tap} from 'rxjs';
import {Store} from '@ngrx/store';
import {MainStore} from '../../models/main-store.model';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public showLoginButton = true;
  public showLogoutButton = true;

  user$: Observable<User | undefined>;

  constructor(private store: Store<MainStore>) {
    this.user$ = store.select('user').pipe(
      tap(user => {
        this.showLoginButton = !!user;
        this.showLogoutButton = !user;
      })
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
