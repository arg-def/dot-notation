import getKey from './utils/get-key';

/**
 * Parse object key from dot notation
 * @param {string} dotNotationPath - Dot notation object path
 * @param {any} value - Dot notation path value
 * @returns {object}
 */
const parseKey = <T>(dotNotationPath: string, value: unknown): T => {
  const { key, path, isArray } = getKey(dotNotationPath);
  const done = !path;
  const mountObject = (): Partial<T> => (done ? (value as T) : parseKey<T>(path, value));

  return ({
    [key]: isArray ? [mountObject()] : mountObject(),
  } as unknown) as T;
};

export default parseKey;
