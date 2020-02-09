import { Component } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Route } from "app/route";
import { AppState } from "store/app-state";
import { selectGame } from "store/game/game.selectors";
import { setRoute } from "store/route/route.actions";

@Component({
  selector: "sm4-home",
  templateUrl: "./home.component.html"
})
export class HomeComponent {
  public gameState$ = this.store.pipe(select(selectGame));

  constructor(
    private store: Store<AppState>
  ) { }

  goTo(route: Route) {
    this.store.dispatch(setRoute({ route }));
  }
}
