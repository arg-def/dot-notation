export interface IKeyFromPathResult {
  key: string;
  path: string;
  isArray: boolean;
}

export interface IKeySource {
  [index: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
