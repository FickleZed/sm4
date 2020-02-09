import { Component, ChangeDetectionStrategy } from "@angular/core";
import { MatDialog } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import { Store } from "@ngrx/store";
import { Observable, Subject } from "rxjs";
import { distinctUntilChanged, filter, map, startWith, switchAll, switchMap } from "rxjs/operators";
import { Avatar } from "models/avatar";
import { AvatarAbstract } from "models/avatar-abstract";
import { Gender } from "models/gender";
import { Pronouns } from "models/pronouns";
import { AppState } from "store/app-state";
import { newGame } from "store/game/game.actions";
import { setRoute } from "store/route/route.actions";
import { AvatarSelectComponent } from "./components/avatar-select/avatar-select.component";
import { AvatarsService } from "services/avatars.service";

@Component({
  selector: "sm4-new-game",
  styleUrls: ["./new-game.component.scss"],
  templateUrl: "./new-game.component.html",
})
export class NewGameComponent {
  public avatar: Partial<Avatar> = { };

  private imageSetDialogClosed$Subject: Subject<Observable<{ abstract: AvatarAbstract, profileImageUrl: string }>> = new Subject();
  private imageSet$ = this.imageSetDialogClosed$Subject
    .pipe(
      switchAll(),
      filter((imageSet) => imageSet && true),
      distinctUntilChanged((a, b) => a.abstract.key === b.abstract.key),
      switchMap((imageSet) =>
        this.avatarsService.getImage(imageSet.abstract.key, "standard")
          .then((standardImage) => standardImage && this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(standardImage.blob)))
          .then((standardImageUrl) => ({ ...imageSet, standardImageUrl }))
      )
    );
  public dialogSelections$ = this.imageSet$
    .pipe(
      map((imageSet) => ({ imageSet })),
      startWith({ imageSet: null })
    );

  constructor(
    private dialog: MatDialog,
    private avatarsService: AvatarsService,
    private sanitizer: DomSanitizer,
    private store: Store<AppState>
  ) { }

  openImageSetDialog() {
    const dialogRef = this.dialog.open<AvatarSelectComponent, any, { abstract: AvatarAbstract, profileImageUrl: string }>(AvatarSelectComponent);
    this.imageSetDialogClosed$Subject.next(dialogRef.afterClosed());
  }

  create(avatar, { imageSet: { abstract } }: { imageSet: { abstract: AvatarAbstract }}) {
    this.store.dispatch(newGame({ avatar: { ...avatar, pronouns: this.getPronouns(avatar.gender), key: abstract.key } }));
    this.store.dispatch(setRoute({ route: "game" }));
  }

  private getPronouns(gender: Gender): Pronouns {
    switch (gender) {
      case "male":
        return "he";
      case "female":
      case "futanari":
        return "she";
    }
  }
}
