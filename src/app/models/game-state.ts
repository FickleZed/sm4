import { Avatar } from "./avatar";

export interface GameState {
  avatar: Avatar;
  day: number;
  currency: number;
  stage: "morning" | "evening";
}
