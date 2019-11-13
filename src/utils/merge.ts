import { IKeySource } from '../interfaces';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isObject = (obj: any): boolean => obj instanceof Object;

/* eslint-disable no-param-reassign */
const merge = <T>(source: Partial<T>, target: Partial<T>): T => {
  if (!(isObject(source) || isObject(target))) {
    return source as T;
  }

  Object.keys(source).forEach(key => {
    const sourceValue = (source as IKeySource)[key];
    const targetValue = (target as IKeySource)[key];

    if (Array.isArray(sourceValue) && Array.isArray(targetValue)) {
      (target as IKeySource)[key] = [...sourceValue, ...targetValue.splice(sourceValue.length)].reduce(
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
        [],
      );
    } else if (isObject(sourceValue) && isObject(targetValue)) {
      (target as IKeySource)[key] = merge<T>({ ...sourceValue }, targetValue);
    } else {
      (target as IKeySource)[key] = sourceValue;
    }
  });

  return target as T;
};

export default merge;
