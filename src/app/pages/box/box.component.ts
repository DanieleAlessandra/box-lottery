import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Box} from '../../models/box.model';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {BoxStore} from '../../models/box-store.model';
import {Apollo, gql} from 'apollo-angular';
import {BoxItemVariant, BoxOpeningResult} from '../../models/box-opening-result.model';

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
  public loadingAnimation = false;
  public prizeWon?: BoxItemVariant;
  private modalRef = ViewChild('showPrizeModal');

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private store: Store<BoxStore>,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.boxId = params['id'];

      let allBoxes: Box[] = [];
      this.store.pipe(select('boxes'), take(1)).subscribe(
        s => allBoxes = s
      );

      let filteredBoxes = allBoxes.filter(box => {
        // @ts-ignore
        return box.node.id === this.boxId;
      });

      if (filteredBoxes.length < 1) {
        this.router.navigate(['/', 'list']).then();
      }

      // @ts-ignore
      this.box = filteredBoxes[0].node;
    })

    // @ts-ignore
    this.modalRef = new window.bootstrap.Modal(
      document.getElementById('winningModal')
    );
  }

  buyBox(e: Box) {
    this.loadingAnimation = true;

    this.apollo.mutate<BoxOpeningResult>({
      mutation: BUY_BOX_MUTATION,
      variables: {
        "input": {
          "amount": 1,
          "boxId": e.id
        }
      }
    }).subscribe(({data}) => {
      if (!data) {
        /// @todo: handle errors
        return;
      }

      this.modalRef.show();

      this.prizeWon = data.openBox.boxOpenings[0].itemVariant;
      /**
       * {
       *   "id": "Qm94T3BlbmluZzo0OTA2Mzg1",
       *   "itemVariant": {
       *     "id": "SXRlbVZhcmlhbnQ6MQ",
       *     "name": "Doomkitty",
       *     "value": 1.76
       *   }
       * }
       */

      this.loadingAnimation = false;

      /// Since we are using OnPush strategy we need to launch change check manually for local variable changes
      this.changeDetectorRef.detectChanges();
    })
  }
}
