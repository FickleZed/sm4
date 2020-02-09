import { createReducer, on } from "@ngrx/store";
import { GameState } from "models/game-state";
import { GameActions, loadGame, newGame, updateCurrency } from "./game.actions";

export const initialState: GameState = {
  avatar: null,
  day: 1,
  currency: 500,
  stage: "morning"
};

const gameReducer = createReducer(
  null,
  on(loadGame, (state, { loadState }) => loadState),
  on(newGame, (state, { avatar }) => ({ ...initialState, avatar })),
  on(updateCurrency, (state, { amount }) => ({ ...state, currency: state.currency + amount }))
);

export function reducer(state: GameState | undefined, action: GameActions) {
  return gameReducer(state, action);
}
