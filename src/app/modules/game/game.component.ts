import { Component, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { AppState } from "store/app-state";
import { selectStage, selectGame, selectFullName, selectDay, selectCurrency } from "store/game/game.selectors";

@Component({
  selector: "sm4-game",
  styleUrls: ["./game.component.scss"],
  templateUrl: "./game.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent {
  @Output("openSidenav") openSidenavEmitter: EventEmitter<void> = new EventEmitter();

  public gameState$ = this.store.pipe(select(selectGame));
  public stage$ = this.store.pipe(select(selectStage));
  public avatarName$ = this.store.pipe(select(selectFullName));
  public day$ = this.store.pipe(select(selectDay));
  public currency$ = this.store.pipe(select(selectCurrency));

  constructor(private store: Store<AppState>) { }

  openSidenav() {
    this.openSidenavEmitter.emit();
  }
}
