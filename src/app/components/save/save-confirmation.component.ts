import { Component, OnDestroy, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Store, select } from "@ngrx/store";
import { Subject, Subscription, merge } from "rxjs";
import { first, switchMap, tap } from "rxjs/operators";
import { SaveAbstract } from "models/save-abstract";
import { SavesService } from "services/saves.service";
import { AppState } from "store/app-state";
import * as fromGame from "store/game/game.selectors";

@Component({
  selector: "sm4-save-confirmation",
  templateUrl: "./save-confirmation.component.html"
})
export class SaveConfirmationComponent implements OnDestroy {
  public abstract: SaveAbstract = this.data.abstract;

  public label: string;

  private saveSubject: Subject<{ slot: number, label: string }> = new Subject();

  private subscription: Subscription;

  constructor(
    private dialogRef: MatDialogRef<SaveConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { abstract: SaveAbstract },
    private store: Store<AppState>,
    private savesService: SavesService
  ) {
    const label$ = this.store
      .pipe(
        select(fromGame.selectFullName),
        first(),
        tap((fullName) => {
          this.label = fullName || "";
        })
      );

    const save$ = this.saveSubject
      .pipe(
        switchMap(({ slot, label }) => this.savesService.save(slot, label)),
        tap(() => this.dialogRef.close())
      );

    this.subscription = merge(label$, save$).subscribe();
  }

  save(slot: number, label: string) {
    this.saveSubject.next({ slot, label });
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }
}
