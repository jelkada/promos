
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ContentfulService} from './contentful.service';
import {Entry} from 'contentful';
import {Promo} from './card/promo.model';
import {Banner} from './banner/banner.model';

const EN = 'English';
const FR = 'French';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  private entries: Entry<any>[];
  private promos: Promo[];
  private bannerParam: Banner;
  private lang: string;

  constructor (private contentfulService: ContentfulService) {
    this.lang = EN;
  }

  ngOnInit() {
    this.contentfulService.getItems()
      .then( () => {
        this.promos = this.contentfulService.getPromos();
        this.bannerParam = this.contentfulService.getBanner();
        console.log('ngOnInit(): this.promos: ', this.promos);
        console.log('ngOnInit(): this.banner: ', this.bannerParam);
      });
  }


  onClickLang() {
    console.log('lang >> ' + this.lang);
    if (this.lang === EN) {
      this.lang = FR;
    } else {
      this.lang = EN;
    }

  }


}
