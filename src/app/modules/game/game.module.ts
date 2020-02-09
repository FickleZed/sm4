import { NgModule } from "@angular/core";
import { CommonModule } from "modules/common/common.module";
import { GameComponent } from "./game.component";
import { MorningComponent } from "./components/morning/morning.component";
import { ViewportComponent } from "./components/viewport/viewport.component";
import { SlaveStatsComponent } from "./components/slave-stats/slave-stats.component";
import { PlayerStatsComponent } from "./components/player-stats/player-stats.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GameComponent,
    MorningComponent,
    ViewportComponent,
    SlaveStatsComponent,
    PlayerStatsComponent
  ],
  exports: [
    GameComponent
  ]
})
export class GameModule { }
