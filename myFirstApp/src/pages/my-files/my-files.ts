import { FilePopoverPage } from "./../file-popover/file-popover";
import { IPic } from "./../../interfaces/pic";
import { MediaProvider } from "./../../providers/media/media";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  PopoverController,
  Popover
} from "ionic-angular";
import { Observable } from "rxjs/Observable";

/**
 * Generated class for the MyFilesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-my-files",
  templateUrl: "my-files.html"
})
export class MyFilesPage {
  picArray: Observable<IPic[]>;
  popOver: Popover;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider,
    public popoverController: PopoverController
  ) {}

  ionViewWillEnter() {
    console.log("paska");
    this.getFiles();
  }

  getFiles() {
    this.picArray = this.mediaProvider.getUserMedia();
  }

  async presentPopover(ev: any) {
    this.popOver = this.popoverController.create(FilePopoverPage, {
      file: ev,
      parentPage: this
    });
    this.popOver.present({
      ev: event
    });
  }
}
