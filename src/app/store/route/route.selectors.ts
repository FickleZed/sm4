import { createSelector } from "@ngrx/store";
import { AppState } from "store/app-state";

export const selectRoute = (state: AppState) => state.route.route;
