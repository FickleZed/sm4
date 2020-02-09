import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";
import { SaveAbstract } from "models/save-abstract";
import { SaveConfirmationComponent } from "./save-confirmation.component";

@Component({
  selector: "sm4-save",
  templateUrl: "./save.component.html"
})
export class SaveComponent {
  constructor(private dialog: MatDialog) { }
  save(abstract: SaveAbstract) {
    this.dialog.open(SaveConfirmationComponent, { data: { abstract } });
  }
}
