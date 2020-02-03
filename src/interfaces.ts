export interface IKeyFromPathResult {
  key: string;
  path: string;
  isArray: boolean;
}

export interface IKeySource<T> {
  [index: string]: T | IKeySource<T>;
}
