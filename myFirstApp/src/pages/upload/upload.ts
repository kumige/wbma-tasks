import { MediaProvider } from "./../../providers/media/media";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import { CssSelector } from "@angular/core/src/render3/interfaces";

@IonicPage()
@Component({
  selector: "page-upload",
  templateUrl: "upload.html"
})
export class UploadPage {
  fileTitle: string;
  fileDesc: string;
  fileData: string;
  file: File;
  brightness = 100;
  contrast = 100;
  saturation = 100;
  sepia = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider,
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad UploadPage");
  }

  handleChange(fileInput) {
    console.log(fileInput);
    this.file = fileInput.srcElement.files[0];
    this.showPreview();
  }

  showPreview() {
    const reader = new FileReader();
    reader.onloadend = evt => {
      this.fileData = reader.result.toString();
    };
    reader.readAsDataURL(this.file);
  }

  getFilters() {
    let filters = {
      filter: `brightness(${this.brightness * 0.01}) contrast(${this.contrast *
        0.01}) saturate(${this.saturation * 0.01}) sepia(${this.sepia * 0.01})`
    };

    return filters;
  }

  upload() {
    const spinner = this.loadingCtrl.create();
    spinner.present();
    const fd = new FormData();
    fd.append("file", this.file);
    fd.append("title", this.fileTitle);
    fd.append("description", this.fileDesc);
    this.mediaProvider.upload(fd).subscribe((res: any) => {
      console.log(res);
      this.addFilterTag(res.file_id);
      setTimeout(() => {
        this.navCtrl.pop().catch();
        spinner.dismiss();
      }, 2000);
    });
  }

  addFilterTag(fileId) {
    const filters = this.getFilters();
    const payload = {
      file_id: fileId,
      tag: JSON.stringify(filters)
    };
    this.mediaProvider.addTag(payload).subscribe(res => {
      console.log(res);
    });
  }
}
