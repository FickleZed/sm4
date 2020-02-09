import { Component, ChangeDetectionStrategy, OnDestroy } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Observable, Subject, Subscription, merge } from "rxjs";
import { mergeMap, startWith, switchAll, switchMap, tap } from "rxjs/operators";
import { AvatarsService } from "services/avatars.service";
import { MatDialog } from "@angular/material";
import { AvatarExtensionsImportComponent } from "./avatar-extensions-import.component";

@Component({
  selector: "sm4-avatar-extensions",
  templateUrl: "./avatar-extensions.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarExtensionsComponent {
  public avatarUrl: string;

  private loadAvatarsSubject: Subject<void> = new Subject();
  private importDialogClosed$Subject: Subject<Observable<void>> = new Subject();
  public avatars$ = merge(this.loadAvatarsSubject, this.importDialogClosed$Subject.pipe(switchAll()))
    .pipe(
      startWith(null),
      switchMap(() => this.avatarsService.getAbstracts()),
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
    private dialog: MatDialog
  ) { }

  openImportDialog() {
    const dialogRef = this.dialog.open(AvatarExtensionsImportComponent);
    this.importDialogClosed$Subject.next(dialogRef.afterClosed());
  }

  getProfileImage(key: string) {
    return this.avatarsService.getImage(key, "profile")
      .then((image) => image && this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(image.blob)));
  }

  remove(key: string) {
    return this.avatarsService.delete(key)
      .then(() => this.loadAvatarsSubject.next());
  }
}
