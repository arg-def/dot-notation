import { IKeyFromPathResult } from 'interfaces';

import replace from './replace';
import getArrayIndex from './get-array-index';

/**
 * GetKeyFromPath
 * @description returns first key defined in dot notation and the remaining path
 * @param {string} path
 * @returns {object} - returns key, remaining dot notation path and isArray,
 */
const getKey = (path: string): IKeyFromPathResult => {
  let key = path.indexOf('.') >= 0 ? path.substring(0, path.indexOf('.')) : path;
  const isArray = getArrayIndex(key);
  const searchValues = [path.indexOf('.') > -1 ? `${key}.` : key];

  if (isArray) {
    key = replace(key, [isArray[0]], '');
    searchValues.push(isArray[0]);
  }

  return {
    key,
    path: replace(path, searchValues, ''),
    isArray: Boolean(isArray),
  };
};

export default getKey;
