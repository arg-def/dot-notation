import merge from './merge';

describe('utils/merge()', () => {
  it('should return source element when its type is not an object', () => {
    const source = [1, 2, 3];
    const target = [4, 5, 6];

    expect(merge<number[]>(source, target)).toStrictEqual(source);
  });

  it('should merge simple object', () => {
    interface IMerge {
      name: string;
      lastName: string;
    }

    const source = { name: 'John' };
    const target = { lastName: 'Doe' };

    const expects = { ...source, ...target };

    expect(merge<IMerge>(source, target)).toStrictEqual(expects);
  });

  it('should merge deep object', () => {
    interface IMerge {
      earth: {
        human: {
          person: {
            name?: string;
            lastName?: string;
          };
        };
      };
    }

    const source: IMerge = { earth: { human: { person: { name: 'John' } } } };
    const target: IMerge = { earth: { human: { person: { lastName: 'Doe' } } } };

    const expects = { earth: { human: { person: { name: 'John', lastName: 'Doe' } } } };

    expect(merge<IMerge>(source, target)).toStrictEqual(expects);
  });

  it('should merge simple nested object array', () => {
    interface IMerge {
      name?: string;
      lastName?: string;
      hobbies: string[];
    }

    const source: IMerge = { name: 'John', hobbies: ['barbecue'] };
    const target: IMerge = { lastName: 'Doe', hobbies: ['movie'] };

    const expects: IMerge = { name: 'John', lastName: 'Doe', hobbies: ['barbecue', 'movie'] };

    expect(merge<IMerge>(source, target)).toStrictEqual(expects);
  });

  it('should merge complex nested object array', () => {
    interface IMerge {
      person: {
        name?: string;
        lastName?: string;
        random: (string | number | object | boolean)[];
      };
    }

    const source: IMerge = {
      person: { name: 'John', random: ['bacon', 1, { language: 'javascript' }, true] },
    };

    const target: IMerge = {
      person: { lastName: 'Doe', random: ['cheeseburger', 2, { ide: 'webstorm' }, false] },
    };

    const expects: IMerge = {
      person: {
        name: 'John',
        lastName: 'Doe',
        random: ['bacon', 'cheeseburger', 1, 2, { language: 'javascript', ide: 'webstorm' }, true, false],
      },
    };

    expect(merge<IMerge>(source, target)).toStrictEqual(expects);
  });

  it('should merge uneven objects', () => {
    interface IMerge {
      hobbies: string[];
    }

    const source: IMerge = {
      hobbies: ['barbecue'],
    };

    const target: IMerge = {
      hobbies: ['movie', 'coding'],
    };

    const expects: IMerge = {
      hobbies: ['barbecue', 'movie', 'coding'],
    };

    expect(merge<IMerge>(source, target)).toStrictEqual(expects);
  });
});
