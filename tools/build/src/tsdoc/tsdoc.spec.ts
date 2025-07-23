import xSpawn from 'cross-spawn';
import fsx from 'fs-extra';

import { parseTSDoc } from './tsdocParser';

const _testPackageJson = JSON.stringify(
  {
    name: 'test-package',
    version: '0.0.0',
    private: true,
  },
  null,
  2,
);
const _testComponentContents = `
interface TestProps {
  /** The title for a component */
  title: string;
  /** The component description */
  description?: string;
}

export const TestComponent = (_props: TestProps) => {};
`;

type SpawnType = ReturnType<typeof xSpawn.spawn>;
const spawnSpy = jest.spyOn(xSpawn, 'spawn');
spawnSpy.mockImplementation(() => ({} as SpawnType));

describe('tools/build/tsdoc', () => {
  describe('parser', () => {
    beforeAll(() => {
      fsx.emptyDirSync('./test-package');
      fsx.rmdirSync('./test-package/');
      fsx.mkdirSync('./test-package/');
      fsx.mkdirSync('./test-package/src');
      fsx.writeFileSync('./test-package/package.json', _testPackageJson);
      fsx.writeFileSync('./test-package/src/index.tsx', _testComponentContents);
    });

    afterAll(() => {
      fsx.emptyDirSync('./test-package');
      fsx.rmdirSync('./test-package/');
    });

    test('Parses TSDoc', () => {
      const tsdoc = parseTSDoc('./test-package');

      expect(tsdoc).not.toBeUndefined();
      expect(tsdoc).toHaveLength(1);
      expect(tsdoc).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            displayName: 'TestComponent',
            props: expect.objectContaining({
              TestProps: expect.objectContaining({
                title: expect.objectContaining({
                  name: 'title',
                  description: 'The title for a component',
                  required: true,
                }),
                description: expect.objectContaining({
                  name: 'description',
                  description: 'The component description',
                  required: false,
                }),
              }),
            }),
          }),
        ]),
      );
    });
  });
});
