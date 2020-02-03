import { IKeySource } from '../interfaces';

const isObject = (obj: unknown): boolean => obj instanceof Object;

const merge = <T>(source: Partial<T>, target: Partial<T>): T => {
  if (!(isObject(source) || isObject(target))) {
    return source as T;
  }

  const result = target;

  Object.keys(source).forEach(key => {
    const sourceValue = (source as IKeySource<unknown>)[key];
    const targetValue = (target as IKeySource<unknown>)[key];

    if (Array.isArray(sourceValue) && Array.isArray(targetValue)) {
      (result as IKeySource<unknown>)[key] = [...sourceValue, ...targetValue.splice(sourceValue.length)].reduce(
        (acc, next, idx) => {
          if (isObject(next) && isObject(targetValue[idx])) {
            acc.push(merge(next, targetValue[idx]));

            return acc;
          }

          acc.push(next);

          if (idx < targetValue.length) {
            acc.push(targetValue[idx]);
          }

          return acc;
        },
        [] as Partial<T>[],
      );
    } else if (isObject(sourceValue) && isObject(targetValue)) {
      (result as IKeySource<unknown>)[key] = merge<T>({ ...(sourceValue as object) }, targetValue as object);
    } else {
      (result as IKeySource<unknown>)[key] = sourceValue;
    }
  });

  return result as T;
};

export default merge;
