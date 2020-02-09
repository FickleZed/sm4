import { Directive, OnInit, ElementRef } from "@angular/core";

@Directive({
    selector: "[autofocus]"
})
export class AutofocusDirective implements OnInit {
  constructor(private hostElement: ElementRef) { }

  ngOnInit() {
    this.hostElement.nativeElement.focus();
  }
}
