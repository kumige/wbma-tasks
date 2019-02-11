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

@Injectable()
export class MediaProvider {
  loggedIn = false;
  registerMode = false;

  constructor(public http: HttpClient) {}

  getAllMedia() {
    return this.http.get<IPic[]>("http://media.mw.metropolia.fi/wbma/media");
  }

  getSingleMedia(id) {
    return this.http.get<IPic>(
      "http://media.mw.metropolia.fi/wbma/media/" + id
    );
  }

  getProfilePic(tag: string) {
    return this.http.get("http://media.mw.metropolia.fi/wbma/tags/" + tag);
  }

  getProfileData() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      })
    };
    return this.http.get<User>(
      "http://media.mw.metropolia.fi/wbma/users/user",
      httpOptions
    );
  }

  getUserData(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        "x-access-token": localStorage.getItem("token")
      })
    };
    return this.http.get<User>(
      "http://media.mw.metropolia.fi/wbma/users/" + id,
      httpOptions
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

  upload(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        "x-access-token": localStorage.getItem("token")
      })
    };
    return this.http.post(
      "http://media.mw.metropolia.fi/wbma/media",
      data,
      httpOptions
    );
  }

  addTag(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        "x-access-token": localStorage.getItem("token")
      })
    };
    return this.http.post(
      "http://media.mw.metropolia.fi/wbma/tags",
      data,
      httpOptions
    );
  }

  getTags(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        "x-access-token": localStorage.getItem("token")
      })
    };
    return this.http.post(
      "http://media.mw.metropolia.fi/wbma/tags/file/" + id,
      httpOptions
    );
  }
}
