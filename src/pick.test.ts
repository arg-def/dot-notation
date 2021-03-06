import pick from './pick';
import { IKeySource } from './interfaces';

const source = {
  person: {
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    address: [
      {
        street: 'Infinite Loop',
        city: 'Cupertino',
        state: 'CA',
        postalCode: 95014,
        country: 'United States',
      },
      {
        street: '1600 Amphitheatre',
        city: 'Mountain View',
        state: 'CA',
        postalCode: 94043,
        country: 'United States',
      },
    ],
  },
};

describe('pick()', () => {
  it('should throw an error when no array index is present', () => {
    const path = 'person.address[].street';

    expect(() => pick<string>(path, source)).toThrow(SyntaxError);
  });

  it('should throw an error array index is lower than 0', () => {
    const path = 'person.address[-1].street';

    expect(() => pick<string>(path, source)).toThrow(RangeError);
  });

  it('should return undefined when dot notation is a typo or dont exists', () => {
    const pathDontExists = 'person.hobbies';
    const pathHasATypo = 'person.adddress';

    expect(pick<string>(pathDontExists, source)).toBe(undefined);
    expect(pick<string>(pathHasATypo, source)).toBe(undefined);
  });

  it('should return string value from correct dot notation path', () => {
    const paths: IKeySource<string | number> = {
      'person.name': source.person.name,
      'person.name.firstName': source.person.name.firstName,
      'person.address[0]': source.person.address[0],
      'person.address[0].postalCode': source.person.address[0].postalCode,
    };

    Object.keys(paths).forEach(key => {
      expect(pick<string | number>(key, source)).toStrictEqual(paths[key]);
    });
  });
});
