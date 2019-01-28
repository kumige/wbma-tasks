import { MediaProvider } from "./../../providers/media/media";
import { ProfilePage } from "../profile/profile";
import { LoginRegisterPage } from "./../login-register/login-register";
import { HomePage } from "./../home/home";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-menu",
  templateUrl: "menu.html"
})
export class MenuPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider
  ) {}

  tab1Root = HomePage;
  tab2Root = LoginRegisterPage;
  tab3Root = ProfilePage;

  ionViewDidLoad() {
    console.log("ionViewDidLoad MenuPage");
  }

  mode() {
    this.mediaProvider.registerMode = false;
  }
}
