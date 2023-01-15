import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Box} from '../../models/box.model';

@Component({
  selector: 'app-box-card',
  templateUrl: './box-card.component.html',
  styleUrls: ['./box-card.component.scss']
})
export class BoxCardComponent implements OnInit {

  @Input() box?: Box;
  @Input() buy: boolean = false;

  @Output() onBuyBox = new EventEmitter<Box>();

  constructor() {
  }

  ngOnInit(): void {
  }

  buyBox() {
    this.onBuyBox.emit(this.box);
  }
}
