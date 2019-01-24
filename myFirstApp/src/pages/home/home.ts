import { MediaProvider } from "./../../providers/media/media";
import { IPic } from "./../../interfaces/pic";
import { HttpClient } from "@angular/common/http";
import { PhotoViewer } from "@ionic-native/photo-viewer";
import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
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
    this.mediaProvider.getAllMedia().subscribe((res: IPic[]) => {
      res.forEach((pic: IPic) => {
        this.mediaProvider
          .getSingleMedia(pic.file_id)
          .subscribe((file: IPic[]) => {
            this.picArray.push(file);
          });
      });
    });
  }

  picArray = [];

  itemSelected(item) {
    this.photoViewer.show(item.original);
  }
}
