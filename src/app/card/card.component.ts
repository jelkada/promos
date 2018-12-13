import {Component, Input, OnInit} from '@angular/core';
import {Promo} from './promo.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() promo: Promo;

  constructor() { }

  ngOnInit() {

  }

}
