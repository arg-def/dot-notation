import parse from './parse';

describe('parse()', () => {
  it('should parse object', () => {
    const source = {
      'person.name.firstName': 'John',
      'person.name.lastName': 'Doe',
      'person.address[].street': 'Infinite Loop',
      'person.address[].city': 'Cupertino',
      'person.address[].postalCode': 95014,
    };

    expect(parse(source)).toStrictEqual({
      person: {
        name: {
          firstName: 'John',
          lastName: 'Doe',
        },
        address: [
          {
            street: 'Infinite Loop',
            city: 'Cupertino',
            postalCode: 95014,
          },
        ],
      },
    });
  });
});
