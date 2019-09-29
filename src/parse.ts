import pick from './pick';
import parseKey from './parse-key';
import merge from './utils/merge';
import getArrayIndex from './utils/get-array-index';
import { IKeySource } from './interfaces';

/**
 * Parse object from dot notation
 * @param {object} source - Dot notation object
 * @returns {object}
 */
const parse = (source: IKeySource): object =>
  Object.keys(source).reduce((acc, key) => {
    const isArray = getArrayIndex(key);

    if (isArray && isArray[1]) {
      const { 0: match, 1: idx } = isArray;
      const arrayPath = key.substring(0, getArrayIndex(key).index);
      const matrix = pick(arrayPath, acc);

      if (matrix && +idx > 0) {
        if (+idx > matrix.length) {
          throw new RangeError(
            `Expected array index for path "${arrayPath}${match}" to be "${matrix.length}" but found instead "${idx}"`,
          );
        }

        let path = key.substring(getArrayIndex(key).index + match.length);

        if (path.startsWith('.')) {
          path = path.substring(1);
        }

        if (!matrix[idx]) {
          matrix.push(parseKey(path, source[key]));
        } else {
          matrix[idx] = merge(matrix[idx], parseKey(path, source[key]));
        }
      }
    }

    return merge(acc, parseKey(key, source[key]));
  }, {});

export default parse;
