import { MediaProvider } from "./../../providers/media/media";
import { IPic } from "./../../interfaces/pic";
import { HttpClient } from "@angular/common/http";
import { PhotoViewer } from "@ionic-native/photo-viewer";
import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { Observable } from "rxjs/Observable";

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

  ngOnInit() {
    this.getFiles();
  }

  getFiles() {
    this.picArray = this.mediaProvider.getAllMedia();
  }

  itemSelected(item) {
    this.photoViewer.show(item.original);
  }
}
