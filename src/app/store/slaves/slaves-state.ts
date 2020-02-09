export interface SlavesState {
  current: string;
  slaves: { [key: string]: SlaveState };
}

export interface SlaveState {
  key: string;
  acquiredDay: number;
  inTraining: boolean;
  stats: { [key: string]: number };
}
