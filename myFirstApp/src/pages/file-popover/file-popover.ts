import { MediaProvider } from "./../../providers/media/media";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  Events
} from "ionic-angular";
import { PlayerPage } from "../player/player";
import { ModifyPage } from "../modify/modify";

@IonicPage()
@Component({
  selector: "file-popover",
  templateUrl: "file-popover.html"
})
export class FilePopoverPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider,
    public viewCtrl: ViewController
  ) {}

  clickView() {
    const item = this.navParams.data.file;
    this.navCtrl.push(PlayerPage, {
      filename: item.filename,
      type: item.media_type,
      title: item.title,
      description: item.description,
      user_id: item.user_id
    });
    this.viewCtrl.dismiss();
  }
  clickDelete() {
    this.mediaProvider.deleteFile(this.navParams.data.file.file_id).subscribe();
    this.viewCtrl.dismiss();
  }
  clickModify() {
    const item = this.navParams.data.file;
    this.navCtrl.push(ModifyPage, {
      file_id: item.file_id,
      filename: item.filename,
      title: item.title,
      description: item.description,
      parentPage: this.navParams.data.parentPage
    });
    this.viewCtrl.dismiss();
  }
}
