import { UploadPage } from "./../upload/upload";
import { MediaProvider } from "./../../providers/media/media";
import { IPic } from "./../../interfaces/pic";
import { HttpClient } from "@angular/common/http";
import { PhotoViewer } from "@ionic-native/photo-viewer";
import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { PlayerPage } from "../player/player";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  picArray: Observable<IPic[]>;

  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public photoViewer: PhotoViewer,
    public mediaProvider: MediaProvider
  ) {}

  ionViewDidEnter() {
    this.getFiles();
  }

  getFiles() {
    this.picArray = this.mediaProvider.getAllMedia();
  }

  itemSelected(item) {
    console.log(item);
    this.navCtrl.push(PlayerPage, {
      filename: item.filename,
      type: item.media_type,
      title: item.title,
      description: item.description,
      user_id: item.user_id
    });
  }

  navUpload() {
    this.navCtrl.push(UploadPage);
  }
}
