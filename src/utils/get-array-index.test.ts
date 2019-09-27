import getArrayIndex from './get-array-index';

describe('utils/getArrayIndex()', () => {
  it('should return array index', () => {
    const paths = ['address[]', 'address[0]'];

    paths.forEach(path => expect(getArrayIndex(path)).toBeTruthy());
  });

  it('should not return any value', () => {
    const paths = ['person', 'wrongArrayIndex[a]'];

    paths.forEach(path => expect(getArrayIndex(path)).toBeFalsy());
  });
});
