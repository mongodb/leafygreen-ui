import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { typeIs } from '@leafygreen-ui/lib';
import Icon from '@leafygreen-ui/icon';
import Button from './Button';

afterAll(cleanup);

describe('packages/Button', () => {
  const onClick = jest.fn();
  const className = 'test-button-class';
  const title = 'Test button title';
  const child = 'Button child';

  const renderedComponent = render(
    <Button className={className} title={title} onClick={onClick}>
      {child}
    </Button>,
  );

  const renderedButton = renderedComponent.container.firstChild;

  if (!typeIs.element(renderedButton)) {
    throw new Error('Button component failed to render');
  }

  test(`renders "${className}" in the button's classList`, () => {
    expect(renderedButton.classList.contains(className)).toBe(true);
  });

  test(`renders "${child}" as the button's textContent`, () => {
    expect(renderedButton.textContent).toBe(child);
  });

  test(`renders "${title}" as the button title`, () => {
    expect(renderedButton.title).toBe(title);
  });

  test('fires the onClick handler once when clicked', () => {
    fireEvent.click(renderedButton);
    expect(onClick.mock.calls.length).toBe(1);
  });

  test(`renders the disabled and aria-disabled attributes when disabled is set`, () => {
    renderedComponent.rerender(
      <Button
        className={className}
        title={title}
        onClick={onClick}
        disabled={true}
      >
        {child}
      </Button>,
    );

    if (!typeIs.button(renderedButton)) {
      throw new Error('Rendered element is not a button');
    }

    expect(renderedButton.disabled).toBe(true);
    expect(renderedButton.getAttribute('aria-disabled')).toBe('true');
  });

  test(`renders inside of a button tag by default`, () => {
    expect(renderedButton.tagName.toLowerCase()).toBe('button');
  });

  test(`renders a button with the "button" type by default`, () => {
    if (!typeIs.button(renderedButton)) {
      throw new Error('Rendered element is not a button');
    }

    expect(renderedButton.type).toBe('button');
  });

  test(`renders a button with the given type when one is set`, () => {
    const submitButton = render(<Button type="submit">My submit button</Button>)
      .container.firstChild;

    if (!typeIs.button(submitButton)) {
      throw new Error('Rendered element is not a button');
    }

    expect(submitButton.type).toBe('submit');
  });

  test(`renders component inside of a tag when "href" prop is set`, () => {
    const { container } = render(
      <Button href="http://mongodb.design">Click me!</Button>,
    );
    const buttonComponent = container.firstChild;

    if (!typeIs.element(buttonComponent)) {
      throw new Error('No element was rendered');
    }

    expect(buttonComponent.tagName.toLowerCase()).toBe('a');
  });

  test(`does not renders the disabled attributes when disabled is set and it's an anchor`, () => {
    const { container } = render(
      <Button href="http://mongodb.design" disabled>
        Click me!
      </Button>,
    );

    const buttonComponent = container.firstChild;

    if (!typeIs.element(buttonComponent)) {
      throw new Error('No element was rendered');
    }

    expect(buttonComponent.getAttribute('disabled')).toBeNull();
    expect(buttonComponent.getAttribute('aria-disabled')).toBe('true');
  });

  test(`renders component inside of a React Element/HTML tag based on as prop`, () => {
    const { container } = render(<Button as="div">Click me!</Button>);
    const buttonComponent = container.firstChild;

    if (!typeIs.element(buttonComponent)) {
      throw new Error('No element was rendered');
    }

    expect(buttonComponent.tagName.toLowerCase()).toBe('div');
  });

  test(`renders component inside of a React Element/HTML tag based on as prop, even when "href" is set`, () => {
    const { container } = render(
      <Button as="div" href="http://mongodb.design">
        Click me!
      </Button>,
    );
    const buttonComponent = container.firstChild;

    if (!typeIs.element(buttonComponent)) {
      throw new Error('No element was rendered');
    }

    expect(buttonComponent.tagName.toLowerCase()).toBe('div');
  });

  test(`renders a button with an arbitrary element passed in glyph prop`, () => {
    const buttonComponent = render(
      <Button glyph={<svg />}>My Trash Button</Button>,
    ).container.firstChild;

    if (!typeIs.element(buttonComponent)) {
      throw new Error('No element was rendered');
    }

    expect(buttonComponent.getAttribute('glyph')).not.toBe(null);
  });
});
