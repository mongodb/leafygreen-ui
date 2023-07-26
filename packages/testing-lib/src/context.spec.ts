import * as Context from './context';
import { EnterException, ExitException, within } from './context';

describe('Context', () => {
  describe('still calls `exit` when operation throws exception', () => {
    test('with sync `enter` and `exit`', () => {
      const context = {
        [Context.enter]: jest.fn(),
        [Context.exit]: jest.fn(),
      };

      expect(() => {
        within(context, () => {
          throw Error('expected error');
        });
      }).toThrow('expected error');

      expect(context[Context.enter]).toHaveBeenCalledTimes(1);
      expect(context[Context.exit]).toHaveBeenCalledTimes(1);
    });

    test('with async `enter`', async () => {
      const context = {
        [Context.enter]: jest.fn(async () => {}),
        [Context.exit]: jest.fn(),
      };

      const result = within(context, () => {
        throw Error('expected error');
      });

      expect(context[Context.enter]).toHaveBeenCalledTimes(1);
      await expect(result).rejects.toThrow('expected error');
      expect(context[Context.exit]).toHaveBeenCalledTimes(1);
    });

    test('with async `exit`', async () => {
      const context = {
        [Context.enter]: jest.fn(),
        [Context.exit]: jest.fn(async () => {}),
      };

      const promise = within(context, () => {
        throw Error('expected error');
      });

      expect(context[Context.enter]).toHaveBeenCalledTimes(1);
      await expect(promise).rejects.toThrow('expected error');
      expect(context[Context.exit]).toHaveBeenCalledTimes(1);
    });

    test('with async operation', async () => {
      const context = {
        [Context.enter]: jest.fn(),
        [Context.exit]: jest.fn(),
      };

      const promise = within(context, async () => {
        throw Error('expected error');
      });

      expect(context[Context.enter]).toHaveBeenCalledTimes(1);
      await expect(promise).rejects.toThrow('expected error');
      expect(context[Context.exit]).toHaveBeenCalledTimes(1);
    });
  });

  describe('operation and `exit` not called if `enter` throws exception', () => {
    test('with sync `enter` and `exit`', () => {
      const context = {
        [Context.enter]: () => {
          throw Error('expected error');
        },
        [Context.exit]: jest.fn(),
      };
      const operation = jest.fn();

      let exception: unknown;

      try {
        within(context, operation);
        throw Error('unreachable');
      } catch (error) {
        expect(error).toBeInstanceOf(EnterException);
        ({ exception } = error);
      }

      expect(exception).toEqual(Error('expected error'));
      expect(operation).not.toHaveBeenCalled();
      expect(context[Context.exit]).not.toHaveBeenCalled();
    });

    test('with async `enter`', async () => {
      const context = {
        [Context.enter]: jest.fn(async () => {
          throw Error('expected error');
        }),
        [Context.exit]: jest.fn(),
      };
      const operation = jest.fn();

      const promise = within(context, operation);
      expect(context[Context.enter]).toHaveBeenCalledTimes(1);

      let exception: unknown;

      try {
        await promise;
        throw Error('unreachable');
      } catch (error) {
        expect(error).toBeInstanceOf(EnterException);
        ({ exception } = error);
      }

      expect(exception).toEqual(Error('expected error'));
      expect(operation).not.toHaveBeenCalled();
      expect(context[Context.exit]).not.toHaveBeenCalled();
    });

    test('with async `exit`', () => {
      const context = {
        [Context.enter]: () => {
          throw Error('expected error');
        },
        [Context.exit]: jest.fn(async () => {}),
      };
      const operation = jest.fn();

      // It would be nice if we were able to return a rejected promise
      // instead of throwing, but we have no way of knowing whether we
      // should do so without being able to call `exit`.
      let exception: unknown;

      try {
        within(context, operation);
        throw Error('unreachable');
      } catch (error) {
        expect(error).toBeInstanceOf(EnterException);
        ({ exception } = error);
      }

      expect(exception).toEqual(Error('expected error'));
      expect(operation).not.toHaveBeenCalled();
      expect(context[Context.exit]).not.toHaveBeenCalled();
    });

    test('with async operation', async () => {
      const context = {
        [Context.enter]: () => {
          throw Error('expected error');
        },
        [Context.exit]: jest.fn(),
      };
      const operation = jest.fn(async () => {});

      // It would be nice if we were able to return a rejected promise
      // instead of throwing, but we have no way of knowing whether we
      // should do so without being able to call the operation.
      let exception: unknown;

      try {
        within(context, operation);
        throw Error('unreachable');
      } catch (error) {
        expect(error).toBeInstanceOf(EnterException);
        ({ exception } = error);
      }

      expect(exception).toEqual(Error('expected error'));
      expect(operation).not.toHaveBeenCalled();
      expect(context[Context.exit]).not.toHaveBeenCalled();
    });
  });

  describe('when `exit` throws exception', () => {
    test('with sync `enter` and `exit`', () => {
      const context = {
        [Context.enter]: jest.fn(),
        [Context.exit]: () => {
          throw Error('expected error');
        },
      };

      let exception: unknown;
      let result: ExitException<number>['result'];

      try {
        within(context, () => 1);
        throw Error('unreachable');
      } catch (error) {
        expect(error).toBeInstanceOf(ExitException);
        ({ exception, result } = error);
      }

      expect(context[Context.enter]).toHaveBeenCalledTimes(1);
      expect(exception).toEqual(Error('expected error'));
      expect(result).toEqual({ value: 1 });
    });

    test('with async `enter`', async () => {
      const context = {
        [Context.enter]: jest.fn(async () => {}),
        [Context.exit]: () => {
          throw Error('expected error');
        },
      };

      const promise = within(context, () => 1);
      expect(context[Context.enter]).toHaveBeenCalledTimes(1);

      let exception: unknown;
      let result: ExitException<number>['result'];

      try {
        await promise;
        throw Error('unreachable');
      } catch (error) {
        expect(error).toBeInstanceOf(ExitException);
        ({ exception, result } = error);
      }

      expect(exception).toEqual(Error('expected error'));
      expect(result).toEqual({ value: 1 });
    });

    test('with async `exit`', async () => {
      const context = {
        [Context.enter]: jest.fn(),
        [Context.exit]: async () => {
          throw Error('expected error');
        },
      };

      const promise = within(context, () => 1);
      expect(context[Context.enter]).toHaveBeenCalledTimes(1);

      let exception: unknown;
      let result: ExitException<number>['result'];

      try {
        await promise;
        throw Error('unreachable');
      } catch (error) {
        expect(error).toBeInstanceOf(ExitException);
        ({ exception, result } = error);
      }

      expect(exception).toEqual(Error('expected error'));
      expect(result).toEqual({ value: 1 });
    });

    test('with async operation', async () => {
      const context = {
        [Context.enter]: jest.fn(),
        [Context.exit]: () => {
          throw Error('expected error');
        },
      };

      const promise = within(context, async () => 1);
      expect(context[Context.enter]).toHaveBeenCalledTimes(1);

      let exception: unknown;
      let result: ExitException<number>['result'];

      try {
        await promise;
        throw Error('unreachable');
      } catch (error) {
        expect(error).toBeInstanceOf(ExitException);
        ({ exception, result } = error);
      }

      expect(exception).toEqual(Error('expected error'));
      expect(result).toEqual({ value: 1 });
    });
  });

  describe('when operation and `exit` throws exception', () => {
    test('with sync `enter` and `exit`', () => {
      const context = {
        [Context.enter]: jest.fn(),
        [Context.exit]: () => {
          throw Error('expected error');
        },
      };

      let exception: unknown;
      let result: ExitException<number>['result'];

      try {
        within(context, () => {
          throw Error('operation error');
        });
        throw Error('unreachable');
      } catch (error) {
        expect(error).toBeInstanceOf(ExitException);
        ({ exception, result } = error);
      }

      expect(context[Context.enter]).toHaveBeenCalledTimes(1);
      expect(exception).toEqual(Error('expected error'));
      expect(result).toEqual({ exception: Error('operation error') });
    });

    test('with async `enter`', async () => {
      const context = {
        [Context.enter]: jest.fn(async () => {}),
        [Context.exit]: () => {
          throw Error('expected error');
        },
      };

      const promise = within(context, () => {
        throw Error('operation error');
      });
      expect(context[Context.enter]).toHaveBeenCalledTimes(1);

      let exception: unknown;
      let result: ExitException<number>['result'];

      try {
        await promise;
        throw Error('unreachable');
      } catch (error) {
        expect(error).toBeInstanceOf(ExitException);
        ({ exception, result } = error);
      }

      expect(exception).toEqual(Error('expected error'));
      expect(result).toEqual({ exception: Error('operation error') });
    });

    test('with async `exit`', async () => {
      const context = {
        [Context.enter]: jest.fn(),
        [Context.exit]: async () => {
          throw Error('expected error');
        },
      };

      const promise = within(context, () => {
        throw Error('operation error');
      });
      expect(context[Context.enter]).toHaveBeenCalledTimes(1);

      let exception: unknown;
      let result: ExitException<number>['result'];

      try {
        await promise;
        throw Error('unreachable');
      } catch (error) {
        expect(error).toBeInstanceOf(ExitException);
        ({ exception, result } = error);
      }

      expect(exception).toEqual(Error('expected error'));
      expect(result).toEqual({ exception: Error('operation error') });
    });

    test('with async operation', async () => {
      const context = {
        [Context.enter]: jest.fn(),
        [Context.exit]: () => {
          throw Error('expected error');
        },
      };

      const promise = within(context, async () => {
        throw Error('operation error');
      });
      expect(context[Context.enter]).toHaveBeenCalledTimes(1);

      let exception: unknown;
      let result: ExitException<number>['result'];

      try {
        await promise;
        throw Error('unreachable');
      } catch (error) {
        expect(error).toBeInstanceOf(ExitException);
        ({ exception, result } = error);
      }

      expect(exception).toEqual(Error('expected error'));
      expect(result).toEqual({ exception: Error('operation error') });
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

    /* eslint-disable jest/expect-expect, jest/no-disabled-tests */
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

    describe.skip('Context handle types', () => {
      test('are consistent', () => {
        within(
          {
            [Context.enter]: () => 'hello',
          },
          (handle: string) => handle,
        );
        within(
          {
            [Context.enter]: async () => 'hello',
          },
          (handle: string) => handle,
        );
        within(
          {
            [Context.enter]: () => 'hello',
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            [Context.exit]: (handle: string) => {},
          },
          (handle: string) => handle,
        );
        within(
          {
            [Context.enter]: () => 'hello',
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            [Context.exit]: async (handle: string) => {},
          },
          (handle: string) => handle,
        );
      });

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

      test('error when `enter` and provided function disagree', () => {
        within(
          {
            [Context.enter]: () => {},
          },
          // @ts-expect-error
          (handle: string) => handle,
        );

        within(
          {
            [Context.enter]: async () => {},
          },
          // @ts-expect-error
          (handle: string) => handle,
        );

        within(
          {
            [Context.enter]: () => true,
          },
          // @ts-expect-error
          (handle: string) => handle,
        );

        within(
          {
            [Context.enter]: () => 'hello',
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            [Context.exit]: (handle: string) => {},
          },
          // @ts-expect-error
          (handle: number) => handle,
        );

        within(
          {
            [Context.enter]: () => 'hello',
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            [Context.exit]: (handle: string) => {},
          },
          // @ts-expect-error
          async (handle: number) => handle,
        );
      });
    });
    /* eslint-enable jest/expect-expect, jest/no-disabled-tests */
  });
});
