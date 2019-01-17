import { HttpClient } from "@angular/common/http";
import { IPic } from "./../../interfaces/pic";
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
    public photoViewer: PhotoViewer,
    public http: HttpClient
  ) {}

  ngOnInit() {
    this.getData();
  }
  picArray = [];

  pic: IPic;

  getData = () => {
    this.http.get<IPic>("./assets/test.json").subscribe(
      (res: IPic) => {
        console.log(res);
        this.picArray.push(res);
      },
      error => {
        console.log(error);
      }
    );
  };

  itemSelected(item) {
    this.photoViewer.show(item.original);
  }
}
