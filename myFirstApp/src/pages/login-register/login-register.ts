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
import {
  Validators,
  FormGroup,
  FormControl,
  ValidatorFn,
  ValidationErrors
} from "@angular/forms";

@Component({
  selector: "page-login-register",
  templateUrl: "login-register.html"
})
export class LoginRegisterPage {
  user: User = { username: null };
  re_password;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider,
    public alertController: AlertController
  ) {}

  pwCheck: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    return this.user.password !== this.re_password ? { pwCheck: false } : null;
  };

  registerForm = new FormGroup({
    username: new FormControl(
      "",
      Validators.compose([Validators.required, Validators.minLength(3)])
    ),
    password: new FormControl(
      "",
      Validators.compose([Validators.required, Validators.minLength(5)])
    ),
    re_password: new FormControl("", { validators: this.pwCheck }),
    full_name: new FormControl(""),
    email: new FormControl(
      "",
      Validators.compose([Validators.required, Validators.email])
    )
  });

  ionViewDidLoad = () => {};

  validation_messages = {
    username: [
      { type: "required", message: "Username is required." },
      {
        type: "minlength",
        message: "Username must be at least 3 characters long."
      }
    ],
    password: [
      { type: "required", message: "Name is required." },
      {
        type: "minlength",
        message: "Password must be at least 5 characters long"
      }
    ],
    re_password: [
      { type: "required", message: "Please re-type your password" },
      {
        type: "pwCheck",
        message: "Passwords do not match."
      }
    ],
    email: [
      { type: "required", message: "Email is required" },
      {
        type: "pattern",
        message: "Please enter a valid email address."
      }
    ]
  };

  login = () => {
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
    this.registerForm.reset();
  };

  registerModeToggle() {
    this.mediaProvider.registerMode = !this.mediaProvider.registerMode;
  }

  register = () => {
    if (this.user.password !== this.re_password) {
      this.presentAlert("Passwords did not match");
    }
    if (
      this.mediaProvider.registerMode &&
      this.registerForm.status === "VALID"
    ) {
      this.mediaProvider.userCheck(this.user).subscribe(
        (res: UserCheck) => {
          console.log("register");
          if (res.available) {
            this.registerPost();
          } else {
            this.presentAlert("Username already taken");
          }
        },
        error => {
          console.log(error);
        }
      );
    }
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

  /*pwCheck: ValidationErrors = () => {
    let pwState = true;
    if (this.user.password !== this.re_password) {
      pwState = false;
      this.presentAlert("Passwords do not match");
    }
    console.log("pw validation");
    return this.user.password === this.re_password ? { pwCheck: false } : null;
  };*/

  blur() {
    if (this.mediaProvider.registerMode) {
      this.mediaProvider.userCheck(this.user).subscribe(res => {
        console.log(res);
        if (!res.available) {
          const username = document.getElementById("userLabel");
          username.innerHTML = "Username already taken";
        }
      });
    }
  }

  async presentAlert(alertMsg: string) {
    const alert = await this.alertController.create({
      message: alertMsg,
      buttons: ["OK"]
    });

    await alert.present();
  }
}
