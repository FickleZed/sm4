import { Component, OnDestroy } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { AvatarsService } from "services/avatars.service";
import { Subject, Subscription } from "rxjs";
import { mergeMap, tap } from "rxjs/operators";

@Component({
  selector: "sm4-avatar-extensions-import",
  templateUrl: "./avatar-extensions-import.component.html"
})
export class AvatarExtensionsImportComponent implements OnDestroy {
  public manifestFiles: FileList;
  public imageFiles: FileList;

  private readonly downloadSubject: Subject<string> = new Subject();
  private download$ = this.downloadSubject
    .pipe(
      mergeMap((url) => this.avatarsService.download(url)),
      tap(() => this.dialogRef.close())
    );

  private readonly importSubject: Subject<{ manifestFiles: FileList, imageFiles: FileList }> = new Subject();
  // TODO: Read files to objects early; present user with imageFiles select for each manifest needing local files
  private import$ = this.importSubject
    .pipe(
      mergeMap(({manifestFiles, imageFiles}) => this.avatarsService.import(manifestFiles, imageFiles)),
      tap(() => this.dialogRef.close())
    );

  private subscription: Subscription;

  constructor(
    private dialogRef: MatDialogRef<AvatarExtensionsImportComponent>,
    private avatarsService: AvatarsService
  ) {
    this.subscription = this.import$.subscribe();
  }

  import(manifestFiles: FileList, imageFiles: FileList) {
    this.importSubject.next({ manifestFiles, imageFiles });
  }

  cancel() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }
}
