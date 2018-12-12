
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ContentfulService} from './contentful.service';
import {Entry} from 'contentful';
import {Promo} from './promo/promo.model';
import {Banner} from './banner/banner.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  private entries: Entry<any>[];
  private promos: Promo[];
  private banner: Banner;

  constructor (private contentfulService: ContentfulService) {
  }

  ngOnInit() {
    this.contentfulService.getItems()
      .then( () => {
        this.promos = this.contentfulService.getPromos();
        this.banner = this.contentfulService.getBanner();
        console.log('ngOnInit(): this.promos: ', this.promos);
        console.log('ngOnInit(): this.banner: ', this.banner);
      });
  }

}
