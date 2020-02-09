export interface Stats {
  [ key: string ]: {
    name: string;
    description: string;
    hints?: StatHint[];
  }
}

export interface StatHint {
  upperBound?: number;
  description: string;
}
