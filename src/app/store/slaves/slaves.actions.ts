import { createAction, props } from "@ngrx/store";

export const addSlave = createAction(
  "[Slaves] Add Slave",
  props<{ slave: any }>()
);

export const removeSlave = createAction(
  "[Slaves] Remove Slave",
  props<{ slaveKey: string }>()
);

export const setCurrentSlave = createAction(
  "[Slaves] Set Current Slave",
  props<{ slaveKey: string }>()
);

export const adjustStat = createAction(
  "[Slaves] Adjust Stat",
  props<{ slaveKey: string, statKey: string, amount: number }>()
);

export type SlaveActions =
  | typeof addSlave
  | typeof removeSlave
  | typeof setCurrentSlave
  | typeof adjustStat;
