import { IKeySource } from 'interfaces';

import parseKey from './parse-key';
import merge from './utils/merge';

/**
 * Parse object from dot notation
 * @param {object} source - Dot notation object
 * @returns {object}
 */
const parse = (source: IKeySource): object =>
  Object.keys(source).reduce((acc, key) => {
    return merge(acc, parseKey(key, source[key]));
  }, {});

export default parse;
