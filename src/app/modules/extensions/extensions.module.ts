import { NgModule } from "@angular/core";
import { CommonModule } from "modules/common/common.module";
import { ExtensionsComponent } from "./extensions.component";
import { AvatarExtensionsComponent } from "./components/avatar-extensions/avatar-extensions.component";
import { AvatarExtensionsImportComponent } from "./components/avatar-extensions/avatar-extensions-import.component";
import { FilesComponent } from "./components/file/files.component";
import { ImportComponent } from "./components/import/import.component";
import { SlaveExtensionsComponent } from "./components/slave-extensions/slave-extensions.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ExtensionsComponent,
    AvatarExtensionsComponent,
    AvatarExtensionsImportComponent,
    FilesComponent,
    ImportComponent,
    SlaveExtensionsComponent
  ],
  entryComponents: [
    AvatarExtensionsImportComponent
  ],
  exports: [
    ExtensionsComponent
  ]
})
export class ExtensionsModule { }
