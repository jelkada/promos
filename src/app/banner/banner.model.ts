
export class Banner {
  public title: string;
  public subtitle: string;
  public imgDesktop: string;
  public imgMobile: string;
  //public imgUrl: string;

  constructor(title = '', subtitle = '', imgDesktop = '', imgMobile = '') {
    this.title = title;
    this.subtitle = subtitle;
    this.imgDesktop = imgDesktop;
    this.imgMobile = imgMobile;

  }
}
