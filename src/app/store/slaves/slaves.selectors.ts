import { createSelector } from "@ngrx/store";
import { AppState } from "store/app-state";
import { SlavesState, SlaveState } from "./slaves-state";

export const selectSlaves = (state: AppState) => state.slaves;

export const selectCurrentSlave = createSelector(
  selectSlaves,
  (state: SlavesState) => state[state.current]
);

export const selectSlaveStat = createSelector(
  selectCurrentSlave,
  (state: SlaveState, { statKey }: { statKey: string }) => state.stats[statKey]
);
