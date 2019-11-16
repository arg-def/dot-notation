import parse from './parse';

interface IParse {
  person: {
    name: {
      firstName: string;
      lastName: string;
    };
    address: {
      street: string;
      city: string;
      postalCode: number;
    }[];
  };
}

describe('parse()', () => {
  it('should throw an error when array index jumps place', () => {
    const source = {
      'person.name.firstName': 'John',
      'person.name.lastName': 'Doe',
      'person.address[0].street': 'Infinite Loop',
      'person.address[1].city': 'Cupertino',
      'person.address[4].postalCode': 95014,
    };

    expect(() => parse<IParse>(source)).toThrow(RangeError);
  });
  it('should parse object', () => {
    const source = {
      'person.name.firstName': 'John',
      'person.name.lastName': 'Doe',
      'person.address[].street': 'Infinite Loop',
      'person.address[].city': 'Cupertino',
      'person.address[].postalCode': 95014,
    };

    expect(parse<IParse>(source)).toStrictEqual({
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
    } as IParse);
  });

  it('should parse object with array indexes', () => {
    const source = {
      'person.name.firstName': 'John',
      'person.name.lastName': 'Doe',
      'person.address[0].street': 'Infinite Loop',
      'person.address[0].city': 'Cupertino',
      'person.address[0].postalCode': 95014,
      'person.address[1].street': '1600 Amphitheatre',
      'person.address[1].city': 'Mountain View',
      'person.address[1].postalCode': 94043,
    };

    expect(parse<IParse>(source)).toStrictEqual({
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
          {
            street: '1600 Amphitheatre',
            city: 'Mountain View',
            postalCode: 94043,
          },
        ],
      },
    } as IParse);
  });
});
