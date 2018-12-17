
import {Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {ContentfulService} from './contentful.service';
import {Globals} from './app.globals';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  lang: string;
  modalRef: BsModalRef;

  constructor (private modalService: BsModalService, private contentfulService: ContentfulService) {
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      { backdrop: 'static', keyboard: true, class: 'modal-lg', animated: true });
  }

}





// openModel() {
//   this.myModal.nativeElement.className = 'modal fade show';
// }
