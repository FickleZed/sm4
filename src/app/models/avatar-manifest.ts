import { AvatarImageKey } from "./avatar-image-key";
import { ImageManifest } from "./image-manifest";

export interface AvatarManifest {
  key: string;
  description: string;
  images: ImageManifest<AvatarImageKey>[];
}
