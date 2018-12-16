
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ContentfulService} from './contentful.service';
import {Globals} from './app.globals';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  lang: string;

  constructor (private contentfulService: ContentfulService) {
    this.lang = Globals.English;
  }

  ngOnInit() {
    this.contentfulService.getItems();
  }

  onClickLang() {
    if (this.lang === Globals.English) {
      this.lang = Globals.French;
    } else {
      this.lang = Globals.English;
    }
    // console.log('AppComponent: emitting: this.lang: ' + this.lang);
    this.contentfulService.languageChanged.next(this.lang);
  }


}
