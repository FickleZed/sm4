import { Component, Input, ViewChild, ElementRef, Renderer2, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

@Component({
  selector: "sm4-files",
  styleUrls: ["./files.component.scss"],
  templateUrl: "./files.component.html",
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FilesComponent),
    multi: true
  }]
})
export class FilesComponent implements ControlValueAccessor {
  @Input() accept: string;

  @ViewChild("fileInput", { static: true }) fileInput: ElementRef;

  public files: File[];
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
    this.onChange = (files) => {
      this.files = Array.from(files);
      fn(files);
    };
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
