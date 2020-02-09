import { Component, Input, ViewChild, HostListener, ElementRef } from "@angular/core";
import { Observable, Subject, ReplaySubject } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "sm4-viewport",
  templateUrl: "./viewport.component.html"
})
export class ViewportComponent {
  @Input() title: string;
  @Input() background: string;
  @Input() overlay: string;

  @ViewChild("imageContainer", { static: true }) private imageContainerRef: ElementRef;

  // TODO: Also resize after sidenav state changes
  private resizeSubject: Subject<void> = new ReplaySubject(1);
  public overlayHeight$: Observable<number> = this.resizeSubject
    .pipe(
      map(() => this.imageContainerRef && this.imageContainerRef.nativeElement.offsetHeight)
    );

  @HostListener("window:resize")
  resizeOverlay() {
    this.resizeSubject.next();
  }
}
