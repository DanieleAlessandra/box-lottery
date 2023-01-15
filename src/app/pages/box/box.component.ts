import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Box} from '../../models/box.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, take, tap} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {BoxStore} from '../../models/box-store.model';
import {Apollo, gql} from 'apollo-angular';

const BUY_BOX_MUTATION = gql`
mutation OpenBox($input: OpenBoxInput!) {
  openBox(input: $input) {
    boxOpenings {
      id
      itemVariant {
        id
        name
        value
      }
    }
  }
}`;

@Component({
  selector: 'app-box',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit {
  private boxId: string = '';
  public box?: Box;

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private store: Store<BoxStore>,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.boxId = params['id'];

      let allBoxes: Box[] = [];
      this.store.pipe(select('boxes'), take(1)).subscribe(
        s => allBoxes = s
      );

      let filteredBoxes = allBoxes.filter( box => {
        console.log(box.id, this.boxId);
        // @ts-ignore
        return box.node.id === this.boxId;
      });

      if (filteredBoxes.length < 1) {
        this.router.navigate(['/', 'list']).then();
      }

      // @ts-ignore
      this.box = filteredBoxes[0].node;
    })
  }

  buyBox(e: Box) {
    console.log(e);
    /// @TODO: run mutation
  }

}
