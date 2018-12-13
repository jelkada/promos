
import { Injectable } from '@angular/core';
import {createClient, Entry} from 'contentful';
import {Promo} from './card/promo.model';
import {Banner} from './banner/banner.model';


const CONFIG = {
  space: 'xbz2r8b6q09c',
  accessToken: 'a59ba3760cbd6b8f77670a16fdae3753eb4c2eddf4334497dbde53373b26bcb7'
  // contentType: 'promoCard'
}

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {

  private entries: Entry<any>[];
  private promos: Promo[];
  private banner: Banner;
  // const CMS_ID = 'sys.contentType.sys.id';

  private cdaClient = createClient({
    space: CONFIG.space,
    accessToken: CONFIG.accessToken
  });

  constructor() { }

  getItems(): Promise<void> {
    return this.cdaClient.getEntries()
      .then((res) => {
        this.entries = res.items;
        console.log('getEntries(): this.entries: ', this.entries);
        console.log('getEntries(): this.entries: ', this.entries[0].sys.contentType.sys.id);

        let promoEntries: Entry<any>[];
        promoEntries = this.entries.filter(obj => obj.sys.contentType.sys.id === 'promoCard');
        this.promos = promoEntries.map(obj => obj['fields']);
        console.log('getEntries(): this.promos: ', this.promos);

        let bannerEntry: Entry<any>;
        bannerEntry = this.entries.find(obj => obj.sys.contentType.sys.id === 'promoHero');
        this.banner = bannerEntry['fields'];
        console.log('getEntries(): this.banner: ', this.banner);
      });
  }

  getPromos() {
    return this.promos;
  }

  getBanner() {
    return this.banner;
  }

  getOffers() {

  }

  // getItems(query?: object): Promise<Entry<any>[]> {
  //   return this.cdaClient.getEntries(Object.assign({content_type: CONFIG.contentType}, query))
  //           .then(res => res.items);
  // }

}
