import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, from, merge } from "rxjs";
import { map, mergeMap, reduce, switchMap } from "rxjs/operators";
import { DatabaseService } from "./database.service";
import { AvatarImage } from "models/avatar-image";
import { AvatarAbstract } from "models/avatar-abstract";
import { AvatarManifest } from "models/avatar-manifest";
import { AvatarImageKey } from "models/avatar-image-key";
import { UrlImageManifest, LocalImageManifest } from "models/image-manifest";

@Injectable({
  providedIn: "root"
})
export class AvatarsService {
  private readonly DATABASE_NAME = "avatars";
  private readonly ABSTRACTS_STORE = "abstracts";
  private readonly IMAGES_STORE = "images";
  private readonly database = this.databaseService.getDatabase(this.DATABASE_NAME, [{
    name: this.ABSTRACTS_STORE,
    options: { keyPath: "key" }
  }, {
    name: this.IMAGES_STORE,
    options: { keyPath: ["key", "avatarKey"] },
    indexes: [{
      name: "avatarKey",
      keyPath: "avatarKey"
    }, {
      name: "type",
      keyPath: ["avatarKey", "type"]
    }]
  }]);

  constructor(
    private http: HttpClient,
    private databaseService: DatabaseService
  ) { }

  download(url: string): Observable<void> {
    return this.http.get<AvatarManifest>(url)
      .pipe(
        mergeMap((def) => this.loadExtension(def, { source: url }))
      );
  }

  import(files: FileList, imageFiles: FileList): Observable<void> {
    return from(files)
      .pipe(
        mergeMap((file) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (ev) => resolve((ev.target as FileReader).result as string);
            reader.onerror = (ev) => reject(ev);
            reader.readAsText(file);
          })
        ),
        map((json) => JSON.parse(json)),
        mergeMap((def) => this.loadExtension(def, { imageFiles: Array.from(imageFiles || []) }))
      );
  }

  private loadExtension(def: AvatarManifest, parameters: { source?: string, imageFiles?: File[] }): Observable<void> {
    const source = parameters.source;
    const imageFiles = parameters.imageFiles || [];
    const clearImages$ = from(this.databaseService.clearIndex(this.database, this.IMAGES_STORE, "avatarKey", def.key));

    const abstractPut$ = from(this.databaseService.put<AvatarAbstract>(this.database, this.ABSTRACTS_STORE, { key: def.key, description: def.description, source }));

    const urlImageSources = def.images
      .filter((image) => image.type === "url") as UrlImageManifest<AvatarImageKey>[];
    const urlImagePuts$ = from(urlImageSources)
      .pipe(
        mergeMap(({ key: imageKey, source: imageSource }) =>
          this.http.get(imageSource, { responseType: "blob" })
            .pipe(
              switchMap((blob) =>
                this.databaseService.put<AvatarImage>(this.database, this.IMAGES_STORE, { key: imageKey, avatarKey: def.key, source: imageSource, blob }))
            )
        )
      );

    const localImageSources = def.images
      .filter((imageSource) => imageSource.type === "local") as LocalImageManifest<AvatarImageKey>[];
    const localImagePuts$ = from(localImageSources)
      .pipe(
        mergeMap(({ key: imageKey, name }) => {
          const imageFile = imageFiles.find((file) => file.name === name);
          if (!imageFile) {
            console.warn(`Could not find image ${name}`);
            return;
          }

          return this.databaseService.put<AvatarImage>(this.database, this.IMAGES_STORE, { key: imageKey, avatarKey: def.key, source: null, blob: imageFile });
        })
      );

    return clearImages$
      .pipe(
        mergeMap(() => merge(abstractPut$, urlImagePuts$, localImagePuts$)),
        reduce(((acc, val) => acc))
      );
  }

  getAbstracts() {
    return this.databaseService.getAll<AvatarAbstract>(this.database, this.ABSTRACTS_STORE);
  }

  getImage(avatarKey: string, imageKey: AvatarImageKey) {
    return this.databaseService.get<AvatarImage>(this.database, this.IMAGES_STORE, [ imageKey, avatarKey ]);
  }

  delete(key: string) {
    return this.databaseService.clearIndex(this.database, this.IMAGES_STORE, "avatarKey", key)
      .then(() => this.databaseService.delete(this.database, this.ABSTRACTS_STORE, key));
  }
}
