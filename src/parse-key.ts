import { IKeySource } from './interfaces';
import getKey from './utils/get-key';

/**
 * Parse object key from dot notation
 * @param {string} dotNotationPath - Dot notation object path
 * @param {any} value - Dot notation path value
 * @returns {object}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseKey = (dotNotationPath: string, value: any): IKeySource => {
  const { key, path, isArray } = getKey(dotNotationPath);
  const done = !path;
  const mountObject = (): object => (done ? value : parseKey(path, value));

  return {
    [key]: isArray ? [mountObject()] : mountObject(),
  };
};

export default parseKey;
