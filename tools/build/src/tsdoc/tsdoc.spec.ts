import child_process, { ChildProcess } from 'child_process';
import path from 'path';

import { parseTSDoc } from './tsdocParser';

const spawnSpy = jest.spyOn(child_process, 'spawn');
spawnSpy.mockImplementation((...args) => ({} as ChildProcess));

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
