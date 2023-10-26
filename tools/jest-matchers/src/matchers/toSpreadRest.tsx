import chalk from 'chalk';
import React from 'react';
import { render } from '@testing-library/react';
import { createMatcher } from '../utils/createMatcher';

/**
 * Tests whether a Component
 */
export const toSpreadRest = createMatcher(function _toSpreadRest(
  Component: React.ReactElement,
) {
  const rest = {
    'data-rest': 'value',
  };

  // @ts-expect-error Type of Component props is unknown
  const renderResult = render(<Component {...rest} />);
  const componentElement = renderResult.container.firstElementChild;

  const renderedAttributeKeys = componentElement?.getAttributeNames();

  const areAllRestPropsRendered = Object.keys(rest).every(prop =>
    renderedAttributeKeys?.includes(prop),
  );

  const areAllAttributeValuesCorrect =
    areAllRestPropsRendered &&
    Object.entries(rest).every(restProp => {
      const attr = componentElement?.getAttribute(restProp[0]);
      return attr === restProp[1];
    });

  const pass = areAllAttributeValuesCorrect;

  return {
    pass,
    message: () =>
      `Expected component to ${this.isNot ? 'not ' : ''}spread rest.\n` +
      chalk.bold.green(
        `Expected attributes:\n${Object.keys(rest).join(', ')}\n\n`,
      ) +
      chalk.bold.red(`Received props:\n${renderedAttributeKeys?.join(', ')}`),
  };
});
