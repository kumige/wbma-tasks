import { MediaProvider } from "./../../providers/media/media";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { DescriptionPipe } from "../../pipes/description/description";

/**
 * Generated class for the PlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-player",
  templateUrl: "player.html"
})
export class PlayerPage {
  videoContent = false;
  audioContent = false;
  imageContent = false;
  username: string;
  description: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider
  ) {
    this.navParams.get("filename");
  }

  ionViewDidLoad() {
    this.loadMedia();
  }

  getFilters() {
    const pattern = "\\[f\\](.*?)\\[\\/f\\]";
    const re = new RegExp(pattern);
    const value = this.navParams.data.description;
    try {
      const imageFilters = JSON.parse(re.exec(value)[1]);
      const filters = {
        filter: `brightness(${imageFilters.brightness *
          0.01}) contrast(${imageFilters.contrast *
          0.01}) saturate(${imageFilters.saturation *
          0.01}) sepia(${imageFilters.warmth * 0.01})`
      };
      return filters;
    } catch (e) {
      return {
        brightness: 100,
        contrast: 100,
        warmth: 0,
        saturation: 100
      };
    }
  }

  loadMedia() {
    this.mediaProvider
      .getUserData(this.navParams.data.user_id)
      .subscribe(res => {
        this.username = res.username;
        switch (this.navParams.data.type) {
          case "video":
            this.videoContent = true;
            break;

          case "audio":
            this.audioContent = true;

            break;
          case "image":
            this.imageContent = true;

            break;

          default:
            this.imageContent = true;

            break;
        }
      });
  }
}
