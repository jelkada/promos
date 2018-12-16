
export class Card {

  public title: string;
  public subtitle: string;
  public desc: string;
  public imgUrl: string;
  public btnCopy: string;
  public btnUrl: string;

  constructor(title: string, subtitle: string, desc: string,
              imgUrl: string, btnCopy: string, btnUrl: string) {
    this.title = title;
    this.subtitle = title;
    this.desc = desc;
    this.imgUrl = imgUrl;
    this.btnCopy = btnCopy;
    this.btnUrl = btnUrl;
  }

}
