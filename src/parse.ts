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
const parse = <T>(source: IKeySource<unknown>): T =>
  Object.keys(source).reduce((acc: T, key: string) => {
    const isArray = getArrayIndex(key);

    if (isArray && isArray[1]) {
      const { 0: match, 1: idx } = isArray;
      const arrayPath = key.substring(0, getArrayIndex(key).index);
      const matrix = pick<unknown[]>(arrayPath, (acc as unknown) as IKeySource<T>);

      if (matrix && +idx > 0) {
        if (+idx > matrix.length) {
          throw new RangeError(
            `Expected array index for path "${arrayPath}${match}" to be 
              "${matrix.length}" but found instead "${idx}"`,
          );
        }

        let path = key.substring(getArrayIndex(key).index + match.length);

        if (path.startsWith('.')) {
          path = path.substring(1);
        }

        if (!matrix[+idx]) {
          matrix.push(parseKey(path, source[key]));
        } else {
          matrix[+idx] = merge<T>(matrix[+idx] as T, parseKey(path, source[key]));
        }
      }
    }

    return merge<T>(acc, parseKey(key, source[key]));
  }, {} as T) as T;

export default parse;
