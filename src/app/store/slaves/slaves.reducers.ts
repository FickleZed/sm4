import { createReducer, on } from "@ngrx/store";
import { SlavesState } from "./slaves-state";
import { addSlave, removeSlave, setCurrentSlave, adjustStat, SlaveActions } from "./slaves.actions";

export const initialState: SlavesState = {
  current: null,
  slaves: { }
 };

const slavesReducer = createReducer(
  initialState,
  on(addSlave, (state, { slave }) => ({ ...state, slaves: { ...state.slaves, [slave.key]: slave }})),
  on(removeSlave, (state, { slaveKey }) => {
    const slaves = Object.keys(state.slaves)
      .filter((key) => key !== slaveKey)
      .reduce((acc, key) => ({ ...acc, [key]: state.slaves[key] }), { });
    return { ...state, slaves };
  }),
  on(setCurrentSlave, (state, { slaveKey }) => ({ ...state, current: slaveKey })),
  on(adjustStat, (state, { slaveKey, statKey, amount }) => {
    const slave = state.slaves[slaveKey];
    slave.stats[statKey] += amount;
    return { ...state, [slaveKey]: slave };
  })
);

export function reducer(state: SlavesState | undefined, action: SlaveActions) {
  return slavesReducer(state, action);
}
