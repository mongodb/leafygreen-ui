import * as Context from './context';
import { within } from './context';

describe('Context', () => {
  describe('still calls `exit` when error is thrown', () => {
    test('with sync `enter` and `exit`', () => {
      const context = {
        [Context.enter]: jest.fn(),
        [Context.exit]: jest.fn(),
      };

      expect(() => {
        within(context, () => {
          throw Error('expected error');
        });
      }).toThrowError('expected error');

      expect(context[Context.enter]).toHaveBeenCalledTimes(1);
      expect(context[Context.exit]).toHaveBeenCalledTimes(1);
    });

    test('with async `enter`', async () => {
      const context = {
        [Context.enter]: jest.fn(() => Promise.resolve()),
        [Context.exit]: jest.fn(),
      };

      const result = within(context, () => {
        throw Error('expected error');
      });

      expect(context[Context.enter]).toHaveBeenCalledTimes(1);
      await expect(result).rejects.toThrowError('expected error');
      expect(context[Context.exit]).toHaveBeenCalledTimes(1);
    });

    test('with async `exit`', async () => {
      const context = {
        [Context.enter]: jest.fn(),
        [Context.exit]: jest.fn(() => Promise.resolve()),
      };

      const result = within(context, () => {
        throw Error('expected error');
      });

      expect(context[Context.enter]).toHaveBeenCalledTimes(1);
      await expect(result).rejects.toThrowError('expected error');
      expect(context[Context.exit]).toHaveBeenCalledTimes(1);
    });

    test('with async operation', async () => {
      const context = {
        [Context.enter]: jest.fn(),
        [Context.exit]: jest.fn(),
      };

      const result = within(context, async () => {
        throw Error('expected error');
      });

      expect(context[Context.enter]).toHaveBeenCalledTimes(1);
      await expect(result).rejects.toThrowError('expected error');
      expect(context[Context.exit]).toHaveBeenCalledTimes(1);
    });
  });

  describe('types', () => {
    let isNumber: number;
    let isPromise: PromiseLike<number>;

    test('with sync `enter`', async () => {
      const context = {
        [Context.enter]: () => {},
      };

      isNumber = within(context, () => 1);
      expect(isNumber).toEqual(1);

      isPromise = within(context, async () => 1);
      await expect(isPromise).resolves.toEqual(1);
    });

    test('with async `enter`', async () => {
      const context = {
        [Context.enter]: async () => {},
      };

      isPromise = within(context, () => 1);
      await expect(isPromise).resolves.toEqual(1);

      isPromise = within(context, async () => 1);
      await expect(isPromise).resolves.toEqual(1);
    });

    test('with sync `exit`', async () => {
      const context = {
        [Context.enter]: () => {},
        [Context.exit]: () => {},
      };

      isNumber = within(context, () => 1);
      expect(isNumber).toEqual(1);

      isPromise = within(context, async () => 1);
      await expect(isPromise).resolves.toEqual(1);
    });

    test('with async `exit`', async () => {
      const context = {
        [Context.enter]: () => {},
        [Context.exit]: async () => {},
      };

      isPromise = within(context, () => 1);
      await expect(isPromise).resolves.toEqual(1);

      isPromise = within(context, async () => 1);
      await expect(isPromise).resolves.toEqual(1);
    });

    test('with sync `enter` and `exit`', async () => {
      const context = {
        [Context.enter]: () => {},
        [Context.exit]: () => {},
      };

      isNumber = within(context, () => 1);
      expect(isNumber).toEqual(1);

      isPromise = within(context, async () => 1);
      await expect(isPromise).resolves.toEqual(1);
    });

    test('with async `enter` and `exit`', async () => {
      const context = {
        [Context.enter]: async () => {},
        [Context.exit]: async () => {},
      };

      isPromise = within(context, () => 1);
      await expect(isPromise).resolves.toEqual(1);

      isPromise = within(context, async () => 1);
      await expect(isPromise).resolves.toEqual(1);
    });

    // eslint-disable-next-line jest/no-disabled-tests
    test.skip('Missing `enter`', () => {
      within(
        // @ts-expect-error
        {},
        () => 1,
      );
      within(
        // @ts-expect-error
        {},
        async () => 1,
      );

      within(
        // @ts-expect-error
        {
          [Context.exit]: () => {},
        },
        () => 1,
      );
      within(
        // @ts-expect-error
        {
          [Context.exit]: () => {},
        },
        async () => 1,
      );

      within(
        // @ts-expect-error
        {
          [Context.exit]: async () => {},
        },
        () => 1,
      );
      within(
        // @ts-expect-error
        {
          [Context.exit]: async () => {},
        },
        async () => 1,
      );
    });

    // eslint-disable-next-line jest/no-disabled-tests
    describe.skip('Context handle types', () => {
      // eslint-disable-next-line jest/expect-expect
      test('are consistent', () => {
        within({ [Context.enter]: () => 'hello' }, (handle: string) => handle);
        within(
          { [Context.enter]: async () => 'hello' },
          (handle: string) => handle,
        );
        within(
          {
            [Context.enter]: () => 'hello',
            [Context.exit]: (handle: string) => handle,
          },
          (handle: string) => handle,
        );
        within(
          {
            [Context.enter]: () => 'hello',
            [Context.exit]: async (handle: string) => handle,
          },
          (handle: string) => handle,
        );
      });

      // eslint-disable-next-line jest/expect-expect
      test('error when `enter` and `exit` disagree', () => {
        within(
          {
            [Context.enter]: () => true,
            // @ts-expect-error
            [Context.exit]: (handle: string) => handle,
          },
          (handle: string) => handle,
        );

        within(
          {
            [Context.enter]: () => true,
            // @ts-expect-error
            [Context.exit]: (handle: string) => handle,
          },
          async (handle: string) => handle,
        );

        within(
          {
            [Context.enter]: () => 'hello',
            // @ts-expect-error
            [Context.exit]: (handle: boolean) => handle,
          },
          (handle: string) => handle,
        );

        within(
          {
            [Context.enter]: () => 'hello',
            // @ts-expect-error
            [Context.exit]: (handle: boolean) => handle,
          },
          async (handle: string) => handle,
        );
      });

      // eslint-disable-next-line jest/expect-expect
      test('error when `enter` and provided function disagree', () => {
        within(
          {
            [Context.enter]: () => {},
          },
          // @ts-expect-error
          (handle: string) => handle,
        );

        within(
          { [Context.enter]: async () => {} },
          // @ts-expect-error
          (handle: string) => handle,
        );

        within(
          { [Context.enter]: () => true },
          // @ts-expect-error
          (handle: string) => handle,
        );

        within(
          {
            [Context.enter]: () => 'hello',
            [Context.exit]: (handle: string) => handle,
          },
          // @ts-expect-error
          (handle: number) => handle,
        );

        within(
          {
            [Context.enter]: () => 'hello',
            [Context.exit]: (handle: string) => handle,
          },
          // @ts-expect-error
          async (handle: number) => handle,
        );
      });
    });
  });
});
