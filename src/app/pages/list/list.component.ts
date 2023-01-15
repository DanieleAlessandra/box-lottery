import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {Apollo, gql} from 'apollo-angular';
import {Store} from '@ngrx/store';
import {BoxStore} from '../../models/box-store.model';

@Component({
  selector: 'app-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  boxes$: Observable<any>;

  constructor(private apollo: Apollo, private store: Store<BoxStore>) {
    this.boxes$ = store.select('boxes').pipe(
      tap(u => {
        // console.log(u)
      })
    );
  }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: gql`
      {
        boxes(free: false, purchasable: true, openable: true) {
          edges {
            node {
              id
              name
              iconUrl
              cost
            }
          }
        }
      }
      `
    })
      .valueChanges.subscribe((result: any) => {
      this.store.dispatch({
        type: 'LOADED',
        payload: result.data.boxes.edges || []
      });
    })
  }

}
