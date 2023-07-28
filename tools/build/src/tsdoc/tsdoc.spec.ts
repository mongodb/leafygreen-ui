import xSpawn from 'cross-spawn';
import path from 'path';

import { parseTSDoc } from './tsdocParser';

type SpawnType = ReturnType<typeof xSpawn.spawn>;

const spawnSpy = jest.spyOn(xSpawn, 'spawn');
spawnSpy.mockImplementation((...args) => ({} as SpawnType));

describe('tools/build/tsdoc', () => {
  describe('parser', () => {
    test('Parses TSDoc', () => {
      const tsdoc = parseTSDoc(path.resolve(__dirname, 'test-package'));

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
