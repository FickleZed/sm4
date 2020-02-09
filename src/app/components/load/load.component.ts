import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";
import { SaveAbstract } from "models/save-abstract";
import { LoadConfirmationComponent } from "./load-confirmation.component";

@Component({
  selector: "sm4-load",
  templateUrl: "./load.component.html"
})
export class LoadComponent {
  constructor(private dialog: MatDialog) { }

  load(abstract: SaveAbstract) {
    const dialogRef = this.dialog.open<LoadConfirmationComponent, any, number>(LoadConfirmationComponent, {
      data: { abstract }
    });
  }
}
