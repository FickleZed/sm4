import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Store, select } from "@ngrx/store";
import { SavesService } from "services/saves.service";
import { AppState } from "store/app-state";
import { SaveAbstract } from "models/save-abstract";

@Component({
  selector: "sm4-load-confirmation",
  templateUrl: "./load-confirmation.component.html"
})
export class LoadConfirmationComponent {
  public abstract = this.data.abstract;

  constructor(
    private dialogRef: MatDialogRef<LoadConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { abstract: SaveAbstract },
    private store: Store<AppState>,
    private savesService: SavesService
  ) { }

  load(slot: number) {
    return this.savesService.load(slot)
      .then(() => this.dialogRef.close());
  }

  cancel() {
    this.dialogRef.close();
  }
}
