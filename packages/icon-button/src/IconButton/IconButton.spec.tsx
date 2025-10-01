import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { axe } from 'jest-axe';

import EllipsisIcon from '@leafygreen-ui/icon/dist/Ellipsis';

import IconButton from '..';

const onClick = jest.fn();
const className = 'test-icon-button-class';
const iconChild = <EllipsisIcon data-testid="icon-test-id" />;
const titleText = 'My title';

function renderIconButton(props = {}) {
  const utils = render(
    <IconButton
      {...props}
      aria-label="Ellipsis"
      data-testid="icon-button-test"
    />,
  );
  const iconButton = utils.getByTestId('icon-button-test');
  const icon = utils.getByTestId('icon-test-id');
  return { ...utils, iconButton, icon };
}

describe('packages/icon-button', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderIconButton({ children: iconChild });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('when disabled', () => {
    test('does not call onClick when disabled', () => {
      const onClick = jest.fn();
      const { iconButton } = renderIconButton({
        disabled: true,
        onClick,
        children: iconChild,
      });
      fireEvent.click(iconButton);
      expect(onClick).not.toHaveBeenCalled();
    });

    test('renders aria-disabled', () => {
      const { iconButton } = renderIconButton({
        disabled: true,

        children: iconChild,
      });
      expect(iconButton.getAttribute('aria-disabled')).toBe('true');
    });
  });

  test(`renders ${className} in the classList`, () => {
    const { iconButton } = renderIconButton({ className, children: iconChild });
    expect(iconButton.classList.contains(className)).toBe(true);
  });

  test('fires the onClick handler when the IconButton is clicked', () => {
    const { iconButton } = renderIconButton({ onClick, children: iconChild });
    fireEvent.click(iconButton);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('renders inside a button tag by default', () => {
    const { iconButton } = renderIconButton({ children: iconChild });
    expect(iconButton.tagName.toLocaleLowerCase()).toBe('button');
  });

  test('renders icon as button content', () => {
    const { iconButton, icon } = renderIconButton({ children: iconChild });
    expect(iconButton.contains(icon)).toBe(true);
  });

  test('renders inside an anchor tag when the href prop is set', () => {
    const { iconButton } = renderIconButton({
      href: 'http://mongodb.design',
      children: iconChild,
    });
    expect(iconButton.tagName.toLowerCase()).toBe('a');
  });

  test(`when '${titleText}' is set directly as the title child icon, the rendered icon includes the title attribute, '${titleText}'`, () => {
    const iconWithTitle = (
      <EllipsisIcon data-testid="icon-test-id" title={titleText} />
    );
    const { icon } = renderIconButton({ children: iconWithTitle });

    expect(icon.getAttribute('title')).toBe(titleText);
  });

  /* eslint-disable jest/no-disabled-tests*/
  describe.skip('types behave as expected', () => {
    test('does not throw an error when no children are passed to the component', () => {
      <IconButton aria-label="button" onClick={() => {}} />;
    });

    test('requires either aria-label or aria-labelledby', () => {
      <IconButton />;
      <IconButton aria-label="button" />;
      <IconButton aria-labelledby="buttonId" />;
    });

    test('accepts anchor tag attributes', () => {
      <IconButton
        aria-label="button"
        href="http://mongodb.design"
        target="_blank"
        rel="noopener"
      />;
    });
  });
});
