import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from "@angular/service-worker";
import { StoreModule, Action } from "@ngrx/store";

import { environment } from "../environments/environment";
import { AppComponent } from "./app.component";
import { INDEXED_DATABASE_FACTORY_TOKEN } from "./app.config";
import { HomeComponent } from "components/home/home.component";
import { LoadComponent } from "components/load/load.component";
import { LoadConfirmationComponent } from "components/load/load-confirmation.component";
import { SaveComponent } from "components/save/save.component";
import { SaveConfirmationComponent } from "components/save/save-confirmation.component";
import { SaveListComponent } from "components/save-list/save-list.component";
import { CommonModule } from "modules/common/common.module";
import { ExtensionsModule } from "modules/extensions/extensions.module";
import { GameModule } from "modules/game/game.module";
import { NewModule } from "modules/new-game/new-game.module";
import { AppState } from "store/app-state";
import * as fromSlaves from "store/slaves/slaves.reducers";
import * as fromGame from "store/game/game.reducers";
import * as fromRoute from "store/route/route.reducers";

@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,
    LoadComponent,
    LoadConfirmationComponent,
    SaveComponent,
    SaveConfirmationComponent,
    SaveListComponent
  ],
  entryComponents: [
    LoadConfirmationComponent,
    SaveConfirmationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register("ngsw-worker.js", { enabled: environment.production }),
    StoreModule.forRoot<AppState, Action>({
      route: fromRoute.reducer,
      game:  fromGame.reducer,
      slaves: fromSlaves.reducer
    }),
    CommonModule,
    ExtensionsModule,
    GameModule,
    NewModule
  ],
  providers: [
    { provide: INDEXED_DATABASE_FACTORY_TOKEN, useValue: window.indexedDB }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
