import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Observable, tap} from 'rxjs';
import {User} from '../../models/user.model';
import {Store} from '@ngrx/store';
import {UserStore} from '../../models/user-store.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user$: Observable<any>;
  balance: number = 0;

  constructor(private apollo: Apollo, private store: Store<UserStore>, private router: Router) {
    /// @todo: there is confusion between User and UserStore
    this.user$ = store.select('user').pipe(
      tap((u) => {
        // @ts-ignore
        if (u?.user) {
          this.balance = 0;
          // @ts-ignore
          for (let wallet of u.user.wallets) {
            this.balance += wallet.amount;
          }
        } else {
          router.navigate(['/', 'home']);
        }
      })
    );
  }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: gql`
      {
        currentUser {
           id
           name
           wallets {
             id
             amount
             currency
           }
         }
       }
      `
    })
      .valueChanges.subscribe((result: any) => {

      this.store.dispatch({
        type: 'LOGIN',
        payload: {
          name: result.data.currentUser.name,
          id: result.data.currentUser.id,
          wallets: result.data.currentUser.wallets,
        }
      });
    })
  }

}
