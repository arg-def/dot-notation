import { IKeySource } from 'interfaces';

import getArrayIndex from './utils/get-array-index';

/**
 * Pick
 * @description Reads value from object using dot notation path as key
 * @param {string} path
 * @param {object} source
 * @returns {*} value
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pick = (path: string, source: IKeySource): any =>
  path.split('.').reduce((acc, key) => {
    const match = getArrayIndex(key);

    if (match) {
      const { 0: value, 1: index } = match;

      if (!index) {
        throw new SyntaxError(`An array index was expected but nothing was found at "${path}"`);
      }

      const k = key.replace(value, '');
      return acc[k][index];
    }

    if (!acc) return acc;

    return acc[key];
  }, source);

export default pick;
