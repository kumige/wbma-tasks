import { IPic } from "./../../interfaces/pic";
import { HttpClient } from "@angular/common/http";
import { PhotoViewer } from "@ionic-native/photo-viewer";
import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { getScrollData } from "ionic-angular/umd/components/input/input";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public photoViewer: PhotoViewer
  ) {}

  ngOnInit() {
    this.getData();
  }

  pic: IPic;

  getData = () => {
    this.http.get<IPic[]>("http://media.mw.metropolia.fi/wbma/media").subscribe(
      (res: IPic[]) => {
        this.picArray = res;
      },
      error => {
        console.log(error);
      }
    );
  };

  picArray = [];

  itemSelected(item) {
    this.photoViewer.show(item.original);
  }
}
