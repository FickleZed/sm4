import { createSelector } from "@ngrx/store";
import { Avatar } from "models/avatar";
import { GameState } from "models/game-state";
import { AppState } from "store/app-state";

export const selectGame = (state: AppState) => state.game;

export const selectStage = createSelector(
  selectGame,
  (game: GameState) => game.stage
);

export const selectDay = createSelector(
  selectGame,
  (game: GameState) => game.day
);

export const selectCurrency = createSelector(
  selectGame,
  (game: GameState) => game.currency
);

export const selectAvatar = createSelector(
  selectGame,
  (game: GameState) => game.avatar
);

export const selectGivenName = createSelector(
  selectAvatar,
  (avatar: Avatar) => avatar.givenName
);

export const selectSurname = createSelector(
  selectAvatar,
  (avatar: Avatar) => avatar.surname
);

export const selectFullName = createSelector(
  selectAvatar,
  (avatar: Avatar) => `${avatar.givenName} ${avatar.surname}`
);
