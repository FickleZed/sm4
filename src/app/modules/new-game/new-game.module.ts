import { NgModule } from "@angular/core";
import { CommonModule } from "modules/common/common.module";
import { NewGameComponent } from "./new-game.component";
import { AvatarSelectComponent } from "./components/avatar-select/avatar-select.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NewGameComponent,
    AvatarSelectComponent
  ],
  entryComponents: [
    AvatarSelectComponent
  ],
  exports: [
    NewGameComponent
  ]
})
export class NewModule { }
