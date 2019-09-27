import { IKeySource } from 'interfaces';

/* eslint-disable no-param-reassign */
const merge = (source: IKeySource, target: IKeySource): object => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isObject = (obj: any): boolean => obj instanceof Object;

  if (!(isObject(source) || isObject(target))) {
    return source;
  }

  Object.keys(source).forEach(key => {
    const sourceValue = source[key];
    const targetValue = target[key];

    if (Array.isArray(sourceValue) && Array.isArray(targetValue)) {
      target[key] = [...sourceValue, ...targetValue.splice(sourceValue.length)].reduce((acc, next, idx) => {
        if (isObject(next) && isObject(targetValue[idx])) {
          acc.push(merge(next, targetValue[idx]));

          return acc;
        }

        acc.push(next);

        if (idx < targetValue.length) {
          acc.push(targetValue[idx]);
        }

        return acc;
      }, []);
    } else if (isObject(sourceValue) && isObject(targetValue)) {
      target[key] = merge({ ...sourceValue }, targetValue);
    } else {
      target[key] = sourceValue;
    }
  });

  return target;
};

export default merge;
