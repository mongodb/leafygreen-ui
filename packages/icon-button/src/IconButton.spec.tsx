import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import IconButton from './IconButton';
import Icon from '@leafygreen-ui/icon';

afterAll(cleanup);

describe('packages/icon-button', () => {
  const onClick = jest.fn();
  const className = 'test-icon-button-class';
  const testId = 'test-icon-button-component';

  const { getByTestId, getAllByTestId } = render(
    <IconButton
      className={className}
      onClick={onClick}
      data-testid={testId}
      ariaLabel="Ellipsis"
    >
      <Icon glyph="Ellipsis" data-testid="icon-test-id" />
    </IconButton>,
  );

  const iconButton = getByTestId(testId);

  test(`renders ${className} in the classList`, () => {
    expect(iconButton.classList.contains(className)).toBe(true);
  });

  test(`renders icon as button content`, () => {
    const renderedIcon = getAllByTestId('icon-test-id')[0];
    expect(iconButton.contains(renderedIcon)).toBe(true);
  });

  test('fires the onClick handler once when clicked', () => {
    fireEvent.click(iconButton);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('renders inside a button tag by default', () => {
    expect(iconButton.tagName.toLocaleLowerCase()).toBe('button');
  });

  describe('when href prop is supplied', () => {
    const testId = 'test-icon-button-component-with-href';

    const { getByTestId } = render(
      <IconButton
        data-testid={testId}
        href="mongodb.design"
        ariaLabel="Ellipsis"
        size="large"
      >
        <Icon glyph="Ellipsis" size="large" />
      </IconButton>,
    );

    const iconButton = getByTestId(testId);

    test('renders inside an a tag when href prop is supplied', () => {
      expect(iconButton.tagName.toLowerCase()).toBe('a');
    });
  });
});
