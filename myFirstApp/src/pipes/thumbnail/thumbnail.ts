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
  /**
   * Takes a value and makes it lowercase.
   */
  transform(id: number, ...args) {
    /*if (id !== this.cachedId) {
      console.log("pipe", id);
      this.cachedId = id;
      this.mediaProvider.getSingleMedia(id).subscribe((file: IPic) => {
        switch (args[0]) {
          case "large":
            this.thumbnail = file.thumbnails.w640;
            break;
          case "medium":
            this.thumbnail = file.thumbnails.w320;
            break;
          case "small":
            this.thumbnail = file.thumbnails.w160;
            break;
          case "screenshot":
            this.thumbnail = file.screenshot;
            break;
          default:
            this.thumbnail = file.thumbnails.w160;
            break;
        }
      });
          return this.thumbnail;
*/
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
