import { GameState } from "models/game-state";
import { SlavesState } from "./slaves/slaves-state";
import { RouteState } from "./route/route-state";

export interface AppState {
    route: RouteState;
    game: GameState;
    slaves: SlavesState;
}
