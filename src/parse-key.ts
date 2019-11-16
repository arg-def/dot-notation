import getKey from './utils/get-key';

/**
 * Parse object key from dot notation
 * @param {string} dotNotationPath - Dot notation object path
 * @param {any} value - Dot notation path value
 * @returns {object}
 */
const parseKey = <T, V>(dotNotationPath: string, value: V): T => {
  const { key, path, isArray } = getKey(dotNotationPath);
  const done = !path;
  const mountObject = (): Partial<T> => (done ? value : parseKey<T, V>(path, value));

  return ({
    [key]: isArray ? [mountObject()] : mountObject(),
  } as unknown) as T;
};

export default parseKey;
