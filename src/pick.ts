import { IKeySource } from './interfaces';
import getArrayIndex from './utils/get-array-index';

/**
 * Pick
 * @description Reads value from object using dot notation path as key
 * @param {string} path
 * @param {object} source
 * @returns {*} value
 */
export const pick = <T>(path: string, source: IKeySource<unknown>): T =>
  path.split('.').reduce((acc: IKeySource<T>, key: string) => {
    if (!acc) return acc;
    const match = getArrayIndex(key);

    if (match) {
      const { 0: value, 1: index } = match;

      if (!index) {
        throw new SyntaxError(`An array index was expected but nothing was found at "${path}"`);
      }

      if (+index < 0) {
        throw new RangeError(`Array index must equal or higher than 0, but instead got "${index}"`);
      }

      const k = key.replace(value, '');
      return ((acc[k] as unknown) as [])[+index];
    }

    return acc[key];
  }, source as IKeySource<T>) as T;

export default pick;
