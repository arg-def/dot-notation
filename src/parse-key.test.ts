import parseKey from './parse-key';

describe('parseKey()', () => {
  it('should parse path', () => {
    const path = 'person.name.firstName';
    const value = 'John';
    const expects = { person: { name: { firstName: value } } };

    expect(parseKey(path, value)).toStrictEqual(expects);
  });

  it('should parse path with array', () => {
    const path = 'person.address[].street';
    const value = '1600 Amphitheatre';
    const expects = { person: { address: [{ street: value }] } };

    expect(parseKey(path, value)).toStrictEqual(expects);
  });

  it('should parse path even with array index', () => {
    const path = 'person.address[0].street';
    const value = '1600 Amphitheatre';
    const expects = { person: { address: [{ street: value }] } };

    expect(parseKey(path, value)).toStrictEqual(expects);
  });

  it('should parse path even with weird key char', () => {
    const path = 'person.address/[].street';
    const value = '1600 Amphitheatre';
    const expects = { person: { 'address/': [{ street: value }] } };

    expect(parseKey(path, value)).toStrictEqual(expects);
  });
});
