import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
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

    expect(renderedButton.disabled).toBe(true);
    expect(renderedButton.getAttribute('aria-disabled')).toBe('true');
  });

  test(`renders inside of a button tag when "href" prop is not set and no as prop is passed`, () => {
    expect(renderedButton.tagName.toLowerCase()).toBe('button');
  });

  test(`renders component inside of a tag when "href" prop is set`, () => {
    const { container } = render(
      <Button href="http://mongodb.design">Click me!</Button>,
    );
    const buttonComponent = container.firstChild;
    expect(buttonComponent.tagName.toLowerCase()).toBe('a');
  });

  test(`renders component inside of a React Element/HTML tag based on as prop`, () => {
    const { container } = render(<Button as="div">Click me!</Button>);
    const buttonComponent = container.firstChild;
    expect(buttonComponent.tagName.toLowerCase()).toBe('div');
  });

  test(`renders component inside of a React Element/HTML tag based on as prop, even when "href" is set`, () => {
    const { container } = render(
      <Button as="div" href="http://mongodb.design">
        Click me!
      </Button>,
    );
    const buttonComponent = container.firstChild;
    expect(buttonComponent.tagName.toLowerCase()).toBe('div');
  });
});
