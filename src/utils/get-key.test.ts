import { IKeySource } from 'interfaces';

import getKey from './get-key';

describe('utils/getKey()', () => {
  it('should return the correct key, path and array flag', () => {
    const paths: IKeySource = {
      'person.name.firstName': {
        key: 'person',
        path: 'name.firstName',
        isArray: false,
      },
      'name.firstName': {
        key: 'name',
        path: 'firstName',
        isArray: false,
      },
      firstName: {
        key: 'firstName',
        path: '',
        isArray: false,
      },
    };

    Object.keys(paths).forEach((k: string) => {
      const { key, path, isArray } = paths[k];
      expect(getKey(k)).toStrictEqual({ key, path, isArray });
    });
  });

  it('should work with and without array index', () => {
    const paths = ['address[].street', 'address[0].street'];

    expect(getKey(paths[0])).toStrictEqual({
      key: paths[0].replace(/\[\d*].street/g, ''),
      path: 'street',
      isArray: true,
    });
  });
});
