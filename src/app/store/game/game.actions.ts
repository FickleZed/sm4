import { createAction, props } from "@ngrx/store";
import { Avatar } from "models/avatar";
import { GameState } from "models/game-state";

export const loadGame = createAction(
    "[Game] Load Game State",
    props<{ loadState: GameState }>()
);

export const newGame = createAction(
    "[Game] New Game",
    props<{ avatar: Avatar }>()
);

export const updateCurrency = createAction(
    "[Game] Update Currency",
    props<{ amount: number }>()
);

export type GameActions = typeof loadGame | typeof newGame | typeof updateCurrency;
