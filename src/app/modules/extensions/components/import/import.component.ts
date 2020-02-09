import { Component, ViewChild, ElementRef, Renderer2, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "sm4-import",
  styleUrls: ["./import.component.scss"],
  templateUrl: "./import.component.html",
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ImportComponent),
    multi: true
  }]
})
export class ImportComponent implements ControlValueAccessor {
  @ViewChild("fileInput", { static: true }) fileInput: ElementRef;

  public disabled = false;

  constructor(private renderer: Renderer2) { }

  public onChange = (_: FileList | null) => { };
  public onTouched = () => { };

  writeValue(value: null | undefined): void {
    if (value !== null && value !== undefined) {
      console.warn("Ignore setting non-null value to file input", value);
      return;
    }

    this.renderer.setProperty(this.fileInput.nativeElement, "files", value);
  }

  registerOnChange(fn: (files: FileList | null) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
