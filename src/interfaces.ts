export interface IKeyFromPathResult {
  key: string;
  path: string;
  isArray: boolean;
}

export interface IKeySource {
  [index: string]: any | ThisType<IKeySource>; // eslint-disable-line @typescript-eslint/no-explicit-any
}
