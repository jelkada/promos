
import {Injectable} from '@angular/core';
import {createClient, Entry} from 'contentful';
import {Subject} from 'rxjs';


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
  // const CMS_ID = 'sys.contentType.sys.id';
  dataLoaded  = new Subject<{type: string, data: Entry<any>[] | Entry<any>}>();
  languageChanged  = new Subject<string>();

  private cdaClient = createClient({
    space: CONFIG.space,
    accessToken: CONFIG.accessToken
  });

  constructor() {
  }

  getItems() {
    this.cdaClient.getEntries({locale: '*'})
      .then((res) => {
        this.entries = res.items;
        console.log('ContentfulService: getItems(): getEntries(): this.entries: ', this.entries);
        const promoEntries = this.entries.filter(obj => obj.sys.contentType.sys.id === 'promoCard');
        this.dataLoaded.next({type: 'promos', data: promoEntries});
        const bannerEntry = this.entries.find(obj => obj.sys.contentType.sys.id === 'promoHero');
        this.dataLoaded.next({type: 'banner', data: bannerEntry});
      });
  }
}
