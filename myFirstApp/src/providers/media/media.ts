import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IPic } from "./../../interfaces/pic";
import { IThumbnail } from "./../../interfaces/pic";

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
    return this.http.get<IPic[]>(
      "http://media.mw.metropolia.fi/wbma/media/" + id
    );
  }
}
