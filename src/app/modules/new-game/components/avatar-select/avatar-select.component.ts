import { Component, ChangeDetectionStrategy } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import { from } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { AvatarAbstract } from "models/avatar-abstract";
import { AvatarsService } from "services/avatars.service";

@Component({
  selector: "sm4-avatar-select",
  templateUrl: "./avatar-select.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarSelectComponent {
  public avatars$ = from(this.avatarsService.getAbstracts())
    .pipe(
      mergeMap((abstracts) => {
        const promises = abstracts.map((abstract) => {
          return this.avatarsService.getImage(abstract.key, "profile")
            .then((profileImage) => profileImage && this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(profileImage.blob)))
            .then((profileImageUrl) => ({ abstract, profileImageUrl }));
        });
        return Promise.all(promises);
      })
    );

  constructor(
    private avatarsService: AvatarsService,
    private sanitizer: DomSanitizer,
    private dialogRef: MatDialogRef<AvatarSelectComponent, { abstract: AvatarAbstract, profileImageUrl: string }>
  ) { }

  select(avatar: { abstract: AvatarAbstract, profileImageUrl: string }) {
    this.dialogRef.close(avatar);
  }
}
