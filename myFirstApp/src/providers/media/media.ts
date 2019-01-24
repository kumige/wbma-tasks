import {
  User,
  LoginResponse,
  RegisterResponse,
  UserCheck
} from "./../../interfaces/User";
import { HttpClient, HttpHeaders } from "@angular/common/http";
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
  loggedIn = false;
  registerMode = false;

  constructor(public http: HttpClient) {}

  getAllMedia() {
    return this.http.get<IPic[]>("http://media.mw.metropolia.fi/wbma/media");
  }

  getSingleMedia(id) {
    return this.http.get<IPic[]>(
      "http://media.mw.metropolia.fi/wbma/media/" + id
    );
  }

  login(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.post<LoginResponse>(
      "http://media.mw.metropolia.fi/wbma/login",
      user,
      httpOptions
    );
  }

  register(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.post<RegisterResponse>(
      "http://media.mw.metropolia.fi/wbma/users",
      user,
      httpOptions
    );
  }

  userCheck(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.get<UserCheck>(
      "http://media.mw.metropolia.fi/wbma/users/username/" + user.username,
      httpOptions
    );
  }
}
