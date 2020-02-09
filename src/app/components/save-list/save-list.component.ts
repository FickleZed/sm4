import { Component, Output, EventEmitter, Input } from "@angular/core";
import { Observable, from } from "rxjs";
import { map, startWith, switchMap } from "rxjs/operators";
import { SaveAbstract } from "models/save-abstract";
import { SavesService } from "services/saves.service";

@Component({
  selector: "sm4-save-list",
  templateUrl: "./save-list.component.html"
})
export class SaveListComponent {
  public existingOnly: boolean;
  @Input("existingOnly") set existingOnlySetter(value: boolean | "") {
    this.existingOnly = value === "" || value;
  }

  @Output("select") selectEmitter: EventEmitter<SaveAbstract> = new EventEmitter();

  private readonly SLOT_COUNT = 11;

  public saves$: Observable<(SaveAbstract)[]> = this.savesService.saveComplete$
    .pipe(
      startWith(null),
      switchMap(() => from(this.savesService.list())),
      map((saves) => new Array(this.SLOT_COUNT)
        .fill(null)
        .map((_, index) => index)
        .map((slot) => saves.find((save) => save.slot === slot) || { slot, label: "---" })
      )
    );

  constructor(private savesService: SavesService) { }

  select(saveAbstract: SaveAbstract) {
    this.selectEmitter.emit(saveAbstract);
  }
}
