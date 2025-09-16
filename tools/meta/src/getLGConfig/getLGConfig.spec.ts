import fsx from 'fs-extra';

import { getLGConfig } from '../getLGConfig';

// eslint-disable-next-line no-console
console.log = jest.fn();

describe('tools/meta/getLGConfig', () => {
  beforeEach(() => {
    fsx.ensureDirSync('./tmp/');
  });
  afterEach(() => {
    fsx.emptyDirSync('./tmp');
  });
  afterAll(() => {
    fsx.rmdirSync('./tmp/');
  });

  it('should throw an error if the lg property does not exist in the package.json file', () => {
    fsx.writeJSONSync('./tmp/package.json', {
      name: 'test',
    });

    expect(() => getLGConfig('./tmp')).toThrow();
  });

  it('should return the LG config object for the test repository', () => {
    fsx.writeJSONSync('./tmp/package.json', {
      lg: {
        scopes: {
          '@lg-test': 'test/',
        },
      },
    });

    const lgConfig = getLGConfig('./tmp');
    expect(lgConfig).toEqual({
      scopes: {
        '@lg-test': 'test/',
      },
    });
  });
});
