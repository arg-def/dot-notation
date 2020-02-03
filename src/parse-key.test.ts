import parseKey from './parse-key';

describe('parseKey()', () => {
  it('should parse path', () => {
    interface IPersonPath {
      person: { name: { firstName: string } };
    }

    const path = 'person.name.firstName';
    const value = 'John';
    const expects: IPersonPath = { person: { name: { firstName: value } } };

    expect(parseKey<IPersonPath>(path, value)).toStrictEqual(expects);
  });

  it('should parse path with array', () => {
    interface IPersonPathArray {
      person: { address: { street: string }[] };
    }

    const path = 'person.address[].street';
    const value = '1600 Amphitheatre';
    const expects: IPersonPathArray = { person: { address: [{ street: value }] } };

    expect(parseKey<IPersonPathArray>(path, value)).toStrictEqual(expects);
  });

  it('should parse path even with array index', () => {
    interface IPersonPathArray {
      person: { address: { street: string }[] };
    }

    const path = 'person.address[0].street';
    const value = '1600 Amphitheatre';
    const expects: IPersonPathArray = { person: { address: [{ street: value }] } };

    expect(parseKey<IPersonPathArray>(path, value)).toStrictEqual(expects);
  });

  it('should parse path even with weird key char', () => {
    interface IPersonPathArray {
      person: { 'address/': { street: string }[] };
    }

    const path = 'person.address/[].street';
    const value = '1600 Amphitheatre';
    const expects: IPersonPathArray = { person: { 'address/': [{ street: value }] } };

    expect(parseKey<IPersonPathArray>(path, value)).toStrictEqual(expects);
  });
});
