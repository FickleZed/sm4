import { FranchiseCharacter } from "./franchise-character";
import { ImageManifest } from "./image-manifest";
import { Slave } from "./slave";
import { Stats } from "./stats";
import { Version } from "./version";

export interface SlaveManifest {
  key: string;
  version: Version;
  contributors?: string[];
  franchise: FranchiseCharacter;
  slave: Slave;
  images: ImageManifest<string>[],
  introduction: string[];
  stats?: Stats;
}
