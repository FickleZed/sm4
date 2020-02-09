import { AvatarImageKey } from "./avatar-image-key";

export interface AvatarImage {
  key: AvatarImageKey;
  avatarKey: string;
  source: string;
  blob: Blob;
}
