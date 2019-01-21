import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IPic } from "./../../interfaces/pic";

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {
  constructor(public http: HttpClient) {}

  getAllMedia() {
    return this.http.get<IPic[]>("http://media.mw.metropolia.fi/wbma/media");
  }

  getSingleMedia(id) {
    const fileNames = id.filename.split(".");
    id.thumbnails = {
      "160": fileNames[0] + "-tn160.png",
      "320": fileNames[0] + "-tn320.png",
      "640": fileNames[0] + "-tn640.png"
    };
    return id.thumbnails;
  }
}
