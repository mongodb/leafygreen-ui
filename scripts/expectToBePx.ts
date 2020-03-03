import diff from 'jest-diff';

expect.extend({
  toBePx(received, expected) {
    const options = {
      comment: `${expected} or "${expected}px"`,
      isNot: this.isNot,
      promise: this.promise,
    };

    const pass = received === expected || received === `${expected}px`;

    const message = pass
      ? () =>
          this.utils.matcherHint(
            '.toBePx',
            received.toString(),
            expected.toString(),
            options,
          ) +
          '\n\n' +
          `Expected: not ${this.utils.printExpected(
            expected,
          )} or ${this.utils.printExpected(`${expected}px`)}\n` +
          `Received: ${this.utils.printReceived(received)}`
      : () => {
          const diffString =
            typeof received === 'number'
              ? diff(expected, received, {
                  expand: this.expand,
                })
              : diff(`${expected}px`, received, { expand: this.expand });

          return (
            this.utils.matcherHint(
              '.toBePx',
              received.toString(),
              expected.toString(),
              options,
            ) +
            '\n\n' +
            (diffString && diffString.includes('- Expect')
              ? `Difference:\n\n${diffString}`
              : `Expected: ${this.utils.printExpected(
                  expected,
                )} or ${this.utils.printExpected(`${expected}px`)}\n` +
                `Received: ${this.utils.printReceived(received)}`)
          );
        };

    return { actual: received, message, pass };
  },
});
