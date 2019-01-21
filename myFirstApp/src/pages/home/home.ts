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
    this.mediaProvider.getAllMedia().subscribe(
      (res: IPic[]) => {
        this.picArray = res.map((pic: IPic) => {
          res.forEach(element => {
            this.mediaProvider.getSingleMedia(element);
          });
          return pic;
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  picArray = [];

  itemSelected(item) {
    this.photoViewer.show(item.original);
  }
}
