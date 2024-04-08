import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import NextLink from 'next/link';

import { BoxProps } from '@leafygreen-ui/box';
import { Spinner } from '@leafygreen-ui/loading-indicator';

import { ButtonProps } from '../types';
import { getTestUtils } from '../utils/getTestUtils';
import Button from '..';

const className = 'test-button-class';
const title = 'Test button title';
const child = 'Button child';

function renderButton(props: BoxProps<'button', ButtonProps> = {}) {
  const utils = render(<Button {...props} data-testid="button-id" />);
  const { getButton, isDisabled } = getTestUtils();
  const button = getButton();
  return { ...utils, button, isDisabled };
}

describe('packages/button', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues when rendered as a button', async () => {
      const { container } = renderButton({ children: child });
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    test('does not have basic accessibility issues when rendered as an anchor tag', async () => {
      const { container } = renderButton({
        href: 'https://mongodb.design',
        children: child,
      });
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    test(`renders "${className}" in the component's markup`, () => {
      const { button } = renderButton({
        className,
      });

      expect(button.closest(`.${className}`)).toBeVisible();
    });

    test(`renders "${child}" as the button's textContent`, () => {
      const { button } = renderButton({
        children: child,
      });
      expect(button.textContent).toBe(child);
    });

    test(`renders spinner when isLoading is true`, () => {
      const { getByTestId } = renderButton({
        isLoading: true,
        loadingIndicator: <Spinner />,
      });
      expect(getByTestId('lg-button-spinner')).toBeVisible();
    });

    test(`does not loadingText when isLoading is false`, () => {
      const loadingText = 'loading text';
      const { queryByText } = renderButton({
        isLoading: false,
        loadingText,
      });
      expect(queryByText(loadingText)).toBeNull();
    });

    test(`renders loadingText when isLoading is true`, () => {
      const loadingText = 'loading text';
      const { getByText } = renderButton({
        isLoading: true,
        loadingIndicator: <Spinner />,
        loadingText,
      });
      expect(getByText(loadingText)).toBeVisible();
    });

    test(`renders "${title}" as the button title`, () => {
      const { button } = renderButton({
        title,
      });
      expect(button.title).toBe(title);
    });

    test(`renders with aria-disabled attribute but not disabled attribute when disabled prop is set`, () => {
      const { button, isDisabled } = renderButton({
        disabled: true,
      });
      expect(isDisabled()).toBeTruthy();
      expect(button.getAttribute('disabled')).toBeFalsy();
    });

    test(`renders a button with the "button" type by default`, () => {
      const { button } = renderButton();
      expect((button as HTMLButtonElement).type).toBe('button');
    });

    test(`renders a button with the given type when one is set`, () => {
      const { button } = renderButton({
        type: 'submit',
      });
      expect((button as HTMLButtonElement).type).toBe('submit');
    });

    test(`renders inside of a \`button\` tag by default`, () => {
      const { button } = renderButton();
      expect(button.tagName.toLowerCase()).toBe('button');
    });

    test(`renders component inside of an \`a\` tag when "href" prop is set`, () => {
      const { button } = renderButton({
        href: 'http://mongodb.design',
      });
      expect(button.tagName.toLowerCase()).toBe('a');
    });

    test(`renders component inside of \`button\` tag when "href" prop is undefined`, () => {
      const { button } = renderButton({
        href: undefined,
      });
      expect(button.tagName.toLowerCase()).toBe('button');
    });

    test(`renders component inside of \`div\` tag when "href" prop is set, but "disabled" is true`, () => {
      const { button } = renderButton({
        href: 'http://mongodb.design',
        disabled: true,
      });
      expect(button.tagName.toLowerCase()).toBe('button');
    });

    test(`renders a button as another HTML element if the "as" prop is set`, () => {
      const { container, button } = renderButton({
        as: 'div',
      });
      expect(container.querySelector('button')).not.toBeInTheDocument();
      expect(button.tagName.toLowerCase()).toBe('div');
    });

    test(`renders a when passing in a NextJS Link wrapper`, () => {
      // eslint-disable-next-line react/prop-types
      const Linker = ({ href, children, ...props }: any) => (
        <NextLink href={href} {...props}>
          {children}
        </NextLink>
      );

      const { container, button } = renderButton({
        href: 'https://mongodb.design',
        as: Linker,
      });

      expect(container.querySelector('button')).not.toBeInTheDocument();
      expect(button.tagName.toLowerCase()).toBe('a');
    });

    test(`renders a when passing in a legacy NextJS Link wrapper`, () => {
      // eslint-disable-next-line react/prop-types
      const Linker = ({ href, children, ...props }: any) => (
        <NextLink legacyBehavior href={href}>
          <a {...props}>{children}</a>
        </NextLink>
      );

      const { container, button } = renderButton({
        href: 'https://mongodb.design',
        as: Linker,
      });

      expect(container.querySelector('button')).not.toBeInTheDocument();
      expect(button.tagName.toLowerCase()).toBe('a');
    });

    test(`does not render the disabled attribute for a disabled link`, () => {
      const { button, isDisabled } = renderButton({
        href: 'http://mongodb.design',
        disabled: true,
      });
      expect(button).not.toHaveAttribute('disabled');
      expect(isDisabled()).toBe(true);
    });

    test('renders additional attributes not explicitly defined in props', () => {
      const { button } = renderButton({
        tabIndex: 0,
      });

      expect(button).toHaveAttribute('tabindex', '0');
    });
  });

  describe('interaction', () => {
    test('fires the onClick handler once when clicked', () => {
      const onClick = jest.fn();
      const { button } = renderButton({
        onClick,
      });
      fireEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    test('does not fire onClick handler when disabled', () => {
      const onClick = jest.fn();
      const { button } = renderButton({
        disabled: true,
        onClick,
      });
      fireEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(0);
    });

    test('does not fire onClick handler with ENTER key after focusing when disabled', () => {
      const onClick = jest.fn();
      const { button } = renderButton({
        disabled: true,
        onClick,
      });
      button.focus();
      userEvent.keyboard('[Enter]');
      expect(onClick).toHaveBeenCalledTimes(0);
    });

    test('does not fire onClick handler with SPACE bar after focusing when disabled', () => {
      const onClick = jest.fn();
      const { button } = renderButton({
        disabled: true,
        onClick,
      });
      button.focus();
      userEvent.keyboard('[Space]');
      expect(onClick).toHaveBeenCalledTimes(0);
    });

    test('does not fire onClick handler when loading', () => {
      const onClick = jest.fn();
      const { button } = renderButton({
        isLoading: true,
        onClick,
      });
      fireEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(0);
    });

    test('does not fire onClick handler on disabled anchor', () => {
      const onClick = jest.fn();
      const { button } = renderButton({
        disabled: true,
        as: 'a',
        onClick,
      });
      fireEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(0);
    });

    test('does not fire onClick handler on disabled anchor set by "href"', () => {
      const onClick = jest.fn();
      const href = 'https://mongodb.design';
      const { button } = renderButton({
        disabled: true,
        href,
        onClick,
      });
      fireEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(0);
    });

    test('href attribute exists on a link', () => {
      const href = 'https://mongodb.design';
      const { button } = renderButton({
        href,
      });
      expect(button).toHaveAttribute('href', href);
    });

    test('does not invoke a forms submit handler when disabled', () => {
      const onSubmit = jest.fn();

      render(
        <form onSubmit={onSubmit}>
          <Button disabled type="submit">
            Submit
          </Button>
        </form>,
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  /* eslint-disable jest/no-disabled-tests, jest/expect-expect*/
  describe.skip('types behave as expected', () => {
    test('does not throw an error when no children are passed to the component', () => {
      <Button onClick={() => {}} />;
    });

    test('accepts anchor tag attributes', () => {
      <Button href="http://mongodb.design" target="_blank" rel="noopener" />;
    });

    test('accepts a string as `as`', () => {
      <Button as="div" />;
    });

    test('accepts a component as `as`', () => {
      <Button as={() => <>JSX</>} />;
    });
  });
});
