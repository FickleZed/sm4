import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable, Subject, of, EMPTY } from "rxjs";
import { catchError, filter, mergeMap, tap, withLatestFrom } from "rxjs/operators";
import { DatabaseService } from "./database.service";
import { SaveAbstract } from "models/save-abstract";
import { AppState } from "store/app-state";
import { loadGame } from "store/game/game.actions";
import * as fromGame from "store/game/game.selectors";
import { setRoute } from "store/route/route.actions";
import { GameState } from "models/game-state";

@Injectable({
  providedIn: "root"
})
export class SavesService {
  private readonly DATABASE_NAME = "saves";
  private readonly STATES_STORE = "states";
  private readonly LABELS_STORE = "labels";

  private readonly database = this.databaseService.getDatabase(this.DATABASE_NAME, [{
    name: this.STATES_STORE
  }, {
    name: this.LABELS_STORE,
    options: { keyPath: "slot" }
  }]);

  private readonly saveCompleteSubject: Subject<void> = new Subject();
  public readonly saveComplete$: Observable<void> = this.saveCompleteSubject.asObservable();

  constructor(
    private databaseService: DatabaseService,
    private store: Store<AppState>
  ) { }

  save(slot: number, label: string): Observable<void> {
    return of<SaveAbstract>({ slot, label, date: new Date() })
      .pipe(
        withLatestFrom(this.store.pipe(select(fromGame.selectGame))),
        tap(([_, gameState]) => {
          if (!gameState) {
            throw new Error("No game found");
          }
        }),
        filter(([_, gameState]) => gameState && true),
        mergeMap(([saveAbstract, gameState]) => {
          const savePromise = this.databaseService.put<GameState>(this.database, this.STATES_STORE, gameState, saveAbstract.slot);
          const labelPromise = this.databaseService.put<SaveAbstract>(this.database, this.LABELS_STORE, saveAbstract);
          return Promise.all([savePromise, labelPromise])
            // force return void
            .then(() => { });
        }),
        tap(() => {
          this.saveCompleteSubject.next();
        }),
        catchError((error) => {
          console.warn("Failed to save", error);
          // TODO: Notify user
          return EMPTY;
        })
      );
  }

  list(): Promise<SaveAbstract[]> {
    return this.databaseService.getAll<SaveAbstract>(this.database, this.LABELS_STORE);
  }

  load(slot: number): Promise<void> {
    return this.databaseService.get<GameState>(this.database, this.STATES_STORE, slot)
      .then((gameState) => {
        if (!gameState) {
          throw new Error(`No save in slot ${slot}`);
        }

        this.store.dispatch(loadGame({ loadState: gameState }));
      })
      .then(() => {
        this.store.dispatch(setRoute({ route: "game" }));
      });
  }
}
