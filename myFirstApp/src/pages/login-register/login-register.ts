import { HomePage } from "./../home/home";
import {
  User,
  LoginResponse,
  RegisterResponse,
  UserCheck
} from "./../../interfaces/User";
import { MediaProvider } from "./../../providers/media/media";
import { Component } from "@angular/core";
import { NavController, NavParams, AlertController } from "ionic-angular";

@Component({
  selector: "page-login-register",
  templateUrl: "login-register.html"
})
export class LoginRegisterPage {
  user: User = { username: null };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider,
    public alertController: AlertController
  ) {}

  ionViewDidLoad = () => {
    let registerButton = document.getElementById("register");
    registerButton.addEventListener("click", this.register);
  };

  login = () => {
    console.log(this.mediaProvider.loggedIn);
    this.mediaProvider.login(this.user).subscribe(
      (res: LoginResponse) => {
        if (!this.mediaProvider.loggedIn) {
          this.mediaProvider.loggedIn = true;
          localStorage.setItem("token", res.token);
          this.navCtrl.push(HomePage);
        } else {
          this.navCtrl.push(HomePage);
        }
      },
      error => {
        console.log(error);
      }
    );
  };

  register = () => {
    if (this.mediaProvider.registerMode) {
      this.mediaProvider.userCheck(this.user).subscribe(
        (res: UserCheck) => {
          if (res.available) {
            this.registerPost();
          } else {
            this.presentAlert();
          }
        },
        error => {
          console.log(error);
        }
      );
    }
    this.mediaProvider.registerMode = true;
  };

  registerPost() {
    this.mediaProvider.register(this.user).subscribe(
      (res: RegisterResponse) => {
        this.login();
      },
      error => {
        console.log(error);
      }
    );
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      message: "Username taken",
      buttons: ["OK"]
    });

    await alert.present();
  }
}
