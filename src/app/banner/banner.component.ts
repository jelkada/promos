
import {Component, OnInit, OnDestroy} from '@angular/core';
import {Banner} from './banner.model';
import {Entry} from 'contentful';
import {Subscription} from 'rxjs';
import {ContentfulService} from '../contentful.service';
import {Globals} from '../app.globals';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})

export class BannerComponent implements OnInit, OnDestroy {

  private banner = new Banner();
  private lang = Globals.EN;

  private data: Entry<any>[] | Entry<any>;
  private loadedSubscription: Subscription;
  private langSubscription: Subscription;

  constructor(private contentfulService: ContentfulService) {
  }

  ngOnInit() {
    this.loadedSubscription = this.contentfulService.dataLoaded.subscribe(
      (response) => {
        if (response.type === Globals.BANNER_TYPE) {
          this.data = response.data;
          console.log('BannerComponent: data:', this.data);
          this.setBanner();
        }
      });
    this.langSubscription = this.contentfulService.languageChanged.subscribe(
      lang => {
        lang === Globals.English ? this.lang = Globals.EN : this.lang = Globals.FR;
        this.setBanner();
      });
  }

  setBanner() {
    // console.log('Banner: setBanners()');
    const title = this.data['fields'].title[this.lang];
    const subtitle = this.data['fields'].subtitle[this.lang];
    // set desktop and mobile image (use EN if FR does not exist)
    let imgDesktop: string;
    let imgMobile: string;
    if (this.data['fields'].img[this.lang]) {
      imgDesktop = 'http:' + this.data['fields'].img[this.lang][0]['fields'].file[this.lang].url;
      imgMobile  = 'http:' + this.data['fields'].img[this.lang][1]['fields'].file[this.lang].url;
    } else {
      imgDesktop = 'http:' + this.data['fields'].img[Globals.EN][0]['fields'].file[Globals.EN].url;
      imgMobile  = 'http:' + this.data['fields'].img[Globals.EN][1]['fields'].file[Globals.EN].url;
    }
    this.banner = new Banner(title, subtitle, imgDesktop, imgMobile);
  }

  ngOnDestroy() {
    this.loadedSubscription.unsubscribe();
    this.langSubscription.unsubscribe();
  }

}


// console.log('** ', this.data['fields'].img[this.lang][0]['fields'].file[this.lang].url);
