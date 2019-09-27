import pick from './pick';
import { IKeySource } from 'interfaces';

const source: IKeySource = {
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

    expect(() => pick(path, source)).toThrow();
  });

  it('should return undefined when dot notation is a typo or dont exists', () => {
    const pathDontExists = 'person.hobbies';
    const pathHasATypo = 'person.adddress';

    expect(pick(pathDontExists, source)).toBe(undefined);
    expect(pick(pathHasATypo, source)).toBe(undefined);
  });

  it('should return string value from correct dot notation path', () => {
    const paths: IKeySource = {
      'person.name': source.person.name,
      'person.name.firstName': source.person.name.firstName,
      'person.address[0]': source.person.address[0],
      'person.address[0].postalCode': source.person.address[0].postalCode,
    };

    Object.keys(paths).forEach(key => {
      expect(pick(key, source)).toStrictEqual(paths[key]);
    });
  });
});
