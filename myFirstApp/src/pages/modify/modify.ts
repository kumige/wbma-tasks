import { MediaProvider } from "./../../providers/media/media";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-modify",
  templateUrl: "modify.html"
})
export class ModifyPage {
  fileTitle: string;
  fileDesc: string;
  fileData: string;
  file: File;
  fileBlob: Blob;
  brightness = 100;
  contrast = 100;
  saturation = 100;
  sepia = 0;
  mediaUrl = "http://media.mw.metropolia.fi/wbma/uploads/";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider
  ) {}

  ionViewDidLoad() {
    this.loadData();
  }

  ionViewWillLeave() {
    this.navParams.data.parentPage.getFiles();
  }

  loadData() {
    this.fileTitle = this.navParams.data.title;
    this.fileDesc = this.navParams.data.description;
    this.fileData = this.mediaUrl + this.navParams.data.filename;
  }

  getFilters() {
    let filters = {
      filter: `brightness(${this.brightness * 0.01}) contrast(${this.contrast *
        0.01}) saturate(${this.saturation * 0.01}) sepia(${this.sepia * 0.01})`
    };

    return filters;
  }

  resetForm() {
    this.fileTitle = "";
    this.fileDesc = "";
    this.brightness = 100;
    this.contrast = 100;
    this.saturation = 100;
    this.sepia = 0;
  }

  modify() {
    const data = {
      title: this.fileTitle,
      description: this.fileDesc
    };
    this.mediaProvider
      .updateFile(this.navParams.data.file_id, data)
      .subscribe(res => {
        this.navCtrl.pop().catch();
      });
  }
}
