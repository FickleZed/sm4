import { Component } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Store, select } from "@ngrx/store";
import { map, shareReplay, switchMap } from "rxjs/operators";
import { AvatarsService } from "services/avatars.service";
import { AppState } from "store/app-state";
import { selectAvatar, selectFullName } from "store/game/game.selectors";

@Component({
  selector: "sm4-player-stats",
  templateUrl: "./player-stats.component.html"
})
export class PlayerStatsComponent {
  public avatarName$ = this.store.pipe(select(selectFullName));

  public standardImageUrl$ = this.store
    .pipe(
      select(selectAvatar),
      switchMap((avatar) => avatar.key && this.avatarService.getImage(avatar.key, "standard")),
      map((image) => image && this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(image.blob))),
      shareReplay(1)
    );

  public alternateImageUrl$ = this.store
    .pipe(
      select(selectAvatar),
      switchMap((avatar) => avatar.key && this.avatarService.getImage(avatar.key, "profile")),
      map((image) => image && this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(image.blob)))
    );

  constructor(
    private store: Store<AppState>,
    private avatarService: AvatarsService,
    private sanitizer: DomSanitizer
  ) { }
}