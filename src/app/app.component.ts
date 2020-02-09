import { Component, OnDestroy, HostListener } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable, Subject, Subscription } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { SavesService } from "services/saves.service";
import { AppState } from "store/app-state";
import { setRoute } from "store/route/route.actions";
import * as fromGame from "store/game/game.selectors";
import * as fromRoute from "store/route/route.selectors";
import { Route } from "./route";

@Component({
  selector: "sm4-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnDestroy {
  route$ = this.store.pipe(select(fromRoute.selectRoute));
  gameState$ = this.store.pipe(select(fromGame.selectGame));

  private quicksaveSubject: Subject<void> = new Subject();
  private quicksave$ = this.quicksaveSubject
    .pipe(
      switchMap(() => this.savesService.save(0, "quicksave"))
    );

  private subscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private savesService: SavesService
  ) {
    this.subscription = this.quicksave$.subscribe();
  }

  getRouteClass(route: Route): Observable<string> {
    return this.route$
      .pipe(
        map((currentRoute) => currentRoute === route ? "text-accent" : "text-default")
      );
  }

  goto(route: Route) {
    this.store.dispatch(setRoute({ route }));
  }

  @HostListener("document:keydown.control.s", ["$event"])
  goToSave(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.goto("save");
  }

  @HostListener("document:keydown.control.l", ["$event"])
  goToLoad(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.goto("load");
  }

  @HostListener("document:keydown.f5", ["$event"])
  quickSave(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.quicksaveSubject.next();
  }

  @HostListener("document:keydown.f9", ["$event"])
  quickLoad(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.savesService.load(0);
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }
}
