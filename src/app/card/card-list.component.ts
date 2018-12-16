
import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {ContentfulService} from '../contentful.service';
import {Card} from './card.model';
import {Entry} from 'contentful';
import {Globals} from '../app.globals';



@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html'
})

export class CardListComponent implements OnInit, OnDestroy {

  cards: Card[];
  private lang = Globals.EN;
  private data: Entry<any>[] | Entry<any>;

  private loadedSubscription: Subscription;
  private langSubscription: Subscription;

  constructor(private contentfulService: ContentfulService) {
  }

  ngOnInit() {
    this.loadedSubscription = this.contentfulService.dataLoaded.subscribe(
      (response) => {
        if (response.type === Globals.PROMO_TYPE) {
          this.data = response.data;
          console.log('CardListComponent: data:', this.data);
          this.setCards();
        }
      });
    this.langSubscription = this.contentfulService.languageChanged.subscribe(
      lang => {
        lang === Globals.English ? this.lang = Globals.EN : this.lang = Globals.FR;
        this.setCards();
      });
  }

  setCards() {
    this.cards = [];
    for (const item of this.data) {
      const title = item['fields'].title[this.lang];
      let subtitle = '';
      if (item['fields'].subtitle) {
        subtitle = item['fields'].subtitle[this.lang];
      }
      const desc = item['fields'].desc[this.lang];
      const btnCopy = item['fields'].button[this.lang][0];
      const btnUrl = item['fields'].button[this.lang][1];
      let imgUrl = 'http:';
      if (item['fields'].image[this.lang]) {
        imgUrl += item['fields'].image[this.lang][0]['fields'].file[this.lang].url;
      } else {
        imgUrl += item['fields'].image[Globals.EN][0]['fields'].file[Globals.EN].url;
      }
      const card = new Card(title, subtitle, desc, imgUrl, btnCopy, btnUrl);
      this.cards.push(card);
    }
  }

  ngOnDestroy() {
    this.loadedSubscription.unsubscribe();
    this.langSubscription.unsubscribe();
  }
}



// console.log('~~~~~~~~~~~~~~~~~~~');
// console.log('title: ', title);
// console.log('subtitle: ', subtitle);
// console.log('desc: ', desc);
// console.log('btnCopy: ', btnCopy);
// console.log('btnUrl: ', btnUrl);
// console.log('imgUrl: ', imgUrl);
