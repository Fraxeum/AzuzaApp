import { Component, ViewChild } from '@angular/core';
import { IonicPage, Slides, NavController, MenuController } from 'ionic-angular';

@IonicPage({
  name: 'page-initial',
  segment: 'initial',
  priority: 'high'
})

@Component({
  selector: 'page-initial',
  templateUrl: 'initial.html',
})

export class InitialPage {
  counter: number = parseInt(localStorage.getItem('state'));
  @ViewChild(Slides) slides: Slides;
  showSkip = true;
  dir: string = 'ltr';
  client_name: any;
  txt: string = "";
  slideList: Array<any> = [];

  showLoginButton: boolean = false;

  private labels: {};



  constructor(public navCtrl: NavController, public menu: MenuController) {

      this.labels = this.setTranslation();
     
      this.slideList = [

        {
          title: this.labels["Initial-page-1"].slideList.title1,
          description: this.labels["Initial-page-1"].slideList.description1,
          image: this.labels["Initial-page-1"].slideList.icon1,
          id: 0
        },
        {
          title: this.labels["Initial-page-1"].slideList.title2,
          description: this.labels["Initial-page-1"].slideList.description2,
          image: this.labels["Initial-page-1"].slideList.icon2,
          id: 1
        },
        {
          title: this.labels["Initial-page-1"].slideList.title3,
          description: this.labels["Initial-page-1"].slideList.description3,
          image: this.labels["Initial-page-1"].slideList.icon3,
          id: 2
        },
        {
          title: this.labels["Initial-page-1"].slideList.title4,
          description: this.labels["Initial-page-1"].slideList.description4,
          image: this.labels["Initial-page-1"].slideList.icon4,
          id: 3
        },
        {
          title: this.labels["Initial-page-1"].slideList.title5,
          description: this.labels["Initial-page-1"].slideList.description5,
          image: this.labels["Initial-page-1"].slideList.icon5,
          id: 4
        }
      ];



    this.menu.swipeEnable(true);
    this.menu.enable(false);
  }

  onSlideNext() {
    if (this.slides.isEnd()) {
      this.onLastSlide();
      return;
    }

    this.slides.slideNext(300);

    if (this.slides.isEnd()) {
      this.showLoginButton = true;
    }

  }

  onSlidePrev(fab: any = false) {

    if (this.slides.isEnd()) {
      this.showLoginButton = false;
    }

    if (fab) {
      fab.close();
    }
    this.slides.slidePrev(300)
  }

  onLastSlide() {
    //this.slides.slideTo(5, 300)
    this.openAuthPage();
  }

  skipForward() {
    this.openAuthPage();
  }

  openHomePage() {
    //this.navCtrl.setRoot('page-home1');
    this.navCtrl.setRoot('page-auth');
  }

  openAuthPage() {
    this.navCtrl.setRoot('page-auth');
  }

  openRegisterPage() {
    this.navCtrl.setRoot('page-auth', { "currentPage": 'register' });
  }

  ionViewDidLoad() {

  }

  setTranslation() {
    var eng_lang_items = {
      "header-image": "assets/img/azuza_logo_w_250x47.png",
      "Initial-page-1": {
        "skip_btn": "Skip",
        "get_started_btn": "Get started",
        "next_btn": "Next",
        "logo-250": "assets/img/azuza_logo_w_250x47.png",
        "slide_title_real": "",
        "log_in_register_btn": "Register | Log In",
        "property_market": "Checkout AZUZA Projects",
        "slideList": {
          "title1": "Welcome to <strong>AZUZA</strong>",
          "description1": "<h3>Ever wanted to be a shareholder in an exciting startup?</h3><p>AZUZA let's you create wealth by investing in a selection of hand-picked startups.</p>",
          "icon1": "assets/img/azuza_logo_w_250x47.png",
          "title2": "What is Affordable Wealth?",
          "description2": "<h3>AZUZA makes wealth creation affordable!</h3> <p>Every person should have the opportunity to create their own wealth. With affordable investment options in lucrative startups, you <i>can</i> grow your personal wealth.</p>",
          "icon2": "assets/img/azuza_logo_w_250x47.png",
          "title3": "Ecofriendly Investment",
          "description3": "<h3>Grow your wealth responsibly.</h3><p>You will get the opportunity to own shares in cutting edge startups that care as much for the environment as they do about generating profit. </p>",
          "icon3": "assets/img/azuza_logo_w_250x47.png",
          "title4": "Legal Status",
          "description4": "<h3>AZUZA is regulated and authentic.</h3><p class='text-white'>AZUZA Wealth is a licensed FSP (31263). Our team consists of highly skilled accountants, entrepreneurs and investment professionals all focussed on building consumer wealth.</p>",
          "icon4": "assets/img/azuza_logo_w_250x47.png",
          "title5": "What's Next",
          "description5": "<h3>Start today!</h3><p  class='text-white'>Join the AZUZA Wealth community today. Make your first investment and start tracking your wealth as it grows from month to month.</p>",
          "icon5": "assets/img/azuza_logo_w_250x47.png"
        }
      }
    };

    return eng_lang_items;
  }

}
