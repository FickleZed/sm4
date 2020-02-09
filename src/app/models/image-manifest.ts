export interface UrlImageManifest<T extends string> {
  key: T;
  type: "url";
  source: string;
}

export interface LocalImageManifest<T extends string> {
  key: T;
  type: "local";
  name: string;
}

export declare type ImageManifest<T extends string> = UrlImageManifest<T> | LocalImageManifest<T>;
