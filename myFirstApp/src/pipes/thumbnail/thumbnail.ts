import { HttpClient } from "@angular/common/http";
import { MediaProvider } from "./../../providers/media/media";
import { Pipe, PipeTransform } from "@angular/core";
import { IPic } from "../../interfaces/pic";

/**
 * Generated class for the ThumbnailPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: "thumbnail"
})
export class ThumbnailPipe implements PipeTransform {
  private cachedId;
  private thumbnail;
  constructor(public mediaProvider: MediaProvider) {}

  transform(id: number, ...args) {
    return new Promise((resolve, reject) => {
      this.mediaProvider.getSingleMedia(id).subscribe((response: IPic) => {
        console.log(response.thumbnails.w320);
        switch (args[0]) {
          case "large":
            resolve(response.thumbnails.w640);
            break;
          case "medium":
            resolve(response.thumbnails.w320);
            break;
          case "screenshot":
            resolve(response.screenshot);
            break;
          default:
            resolve(response.thumbnails.w160);
        }
      });
    });
  }
}
