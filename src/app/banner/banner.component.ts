
import {Component, Input, OnInit} from '@angular/core';
import {Banner} from './banner.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  @Input() banner: Banner;

  constructor() { }

  ngOnInit() {
  }

}
