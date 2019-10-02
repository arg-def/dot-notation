import merge from './merge';

describe('utils/merge()', () => {
  it('should return source element when its type is not an object', () => {
    const source = [1, 2, 3];
    const target = [4, 5, 6];

    expect(merge(source, target)).toStrictEqual(source);
  });

  it('should merge simple object', () => {
    const source = { name: 'John' };
    const target = { lastName: 'Doe' };

    const expects = { ...source, ...target };

    expect(merge(source, target)).toStrictEqual(expects);
  });

  it('should merge deep object', () => {
    const source = { earth: { human: { person: { name: 'John' } } } };
    const target = { earth: { human: { person: { lastName: 'Doe' } } } };

    const expects = { earth: { human: { person: { name: 'John', lastName: 'Doe' } } } };

    expect(merge(source, target)).toStrictEqual(expects);
  });

  it('should merge simple nested object array', () => {
    const source = { name: 'John', hobbies: ['barbecue'] };
    const target = { lastName: 'Doe', hobbies: ['movie'] };

    const expects = { name: 'John', lastName: 'Doe', hobbies: ['barbecue', 'movie'] };

    expect(merge(source, target)).toStrictEqual(expects);
  });

  it('should merge complex nested object array', () => {
    const source = {
      person: { name: 'John', random: ['bacon', 1, { language: 'javascript' }, true] },
    };
    const target = {
      person: { lastName: 'Doe', random: ['cheeseburger', 2, { ide: 'webstorm' }, false] },
    };

    const expects = {
      person: {
        name: 'John',
        lastName: 'Doe',
        random: ['bacon', 'cheeseburger', 1, 2, { language: 'javascript', ide: 'webstorm' }, true, false],
      },
    };

    expect(merge(source, target)).toStrictEqual(expects);
  });

  it('should merge uneven objects', () => {
    const source = {
      hobbies: ['barbecue'],
    };
    const target = {
      hobbies: ['movie', 'coding'],
    };

    const expects = {
      hobbies: ['barbecue', 'movie', 'coding'],
    };

    expect(merge(source, target)).toStrictEqual(expects);
  });
});
