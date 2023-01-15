import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {Store} from '@ngrx/store';
import {UserStore} from '../../models/user-store.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  user$: Observable<any>;

  constructor(private store: Store<UserStore>, private router: Router) {
    this.user$ = store.select('user').pipe(
      tap(u => {
        if (!!u) {
          this.navigateToList();
        }
      })
    );
  }

  navigateToList() {
    this.router.navigate(["/", "list"]).then();
  }
}
