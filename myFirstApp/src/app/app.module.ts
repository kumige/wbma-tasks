import { PipesModule } from "./../pipes/pipes.module";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { PhotoViewer } from "@ionic-native/photo-viewer";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { MediaProvider } from "../providers/media/media";
import { LoginRegisterPage } from "../pages/login-register/login-register";
import { ProfilePage } from "../pages/profile/profile";
import { MenuPage } from "./../pages/menu/menu";

@NgModule({
  declarations: [MyApp, HomePage, MenuPage, LoginRegisterPage, ProfilePage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, MenuPage, LoginRegisterPage, ProfilePage],
  providers: [
    StatusBar,
    SplashScreen,
    PhotoViewer,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MediaProvider
  ]
})
export class AppModule {}
