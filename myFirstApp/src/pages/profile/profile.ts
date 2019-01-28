import { IPic } from "./../../interfaces/pic";
import { User, Profile } from "./../../interfaces/User";
import { LoginRegisterPage } from "../login-register/login-register";
import { MediaProvider } from "../../providers/media/media";
import { HomePage } from "../home/home";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { DomSanitizer } from "@angular/platform-browser";

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider,
    public sanitizer: DomSanitizer
  ) {}
  user: Profile = { username: null, filename: null };
  picUrl = "http://media.mw.metropolia.fi/wbma/uploads/";

  ionViewDidLoad() {
    this.getUserData();
  }
  getUserData() {
    this.mediaProvider.getProfileData().subscribe(res => {
      this.user = res;
      console.log("user", this.user);
      this.mediaProvider.getProfilePic("profile").subscribe((res: any[]) => {
        console.log("images tagged with profile", res);
        res.forEach(element => {
          if (element.user_id === this.user.user_id) {
            this.picUrl += element.filename;
          }
        });
        console.log("user with filename", this.user);
      });
    });
  }

  getImg() {
    return this.sanitizer.bypassSecurityTrustUrl(this.picUrl);
  }

  logOut() {
    localStorage.clear();
    console.log(this.mediaProvider.loggedIn);
    this.mediaProvider.loggedIn = false;
    this.navCtrl.push(HomePage);
  }
}
