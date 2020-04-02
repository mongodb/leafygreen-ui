import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import IconButton from './IconButton';
import Icon from '@leafygreen-ui/icon';

afterAll(cleanup);

describe('packages/icon-button', () => {
  const onClick = jest.fn();
  const className = 'test-icon-button-class';
  const testId = 'test-icon-button-component';

  const { getByTestId, container } = render(
    <IconButton
      className={className}
      onClick={onClick}
      data-testid={testId}
      aria-label="Ellipsis"
    >
      <Icon glyph="Ellipsis" data-testid="icon-test-id" />
    </IconButton>,
  );

  const iconButton = getByTestId(testId);

  test(`renders ${className} in the classList`, () => {
    expect(iconButton.classList.contains(className)).toBe(true);
  });

  test('fires the onClick handler once when clicked', () => {
    fireEvent.click(iconButton);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('renders inside a button tag by default', () => {
    expect(iconButton.tagName.toLocaleLowerCase()).toBe('button');
  });

  const renderedIcon = getByTestId('icon-test-id');

  test('renders icon as button content', () => {
    expect(iconButton.contains(renderedIcon)).toBe(true);
  });

  test("the rendered icon doesn't include a title tag", () => {
    expect(
      renderedIcon.getElementsByTagName('title').length === 0,
    ).toBeTruthy();
  });

  const titleText = 'My title';

  test(`when '${titleText}' is set directly as the title child icon, the rendered icon includes a title tag with the text content, '${titleText}'`, () => {
    render(
      <IconButton
        className={className}
        onClick={onClick}
        data-testid={testId}
        aria-label="Ellipsis"
      >
        <Icon glyph="Ellipsis" data-testid="icon-test-id" title={titleText} />
      </IconButton>,
      { container },
    );

    expect(renderedIcon.getElementsByTagName('title')[0].textContent).toBe(
      titleText,
    );
  });

  describe('when href prop is supplied', () => {
    const testId = 'test-icon-button-component-with-href';

    const { getByTestId } = render(
      <IconButton
        data-testid={testId}
        href="mongodb.design"
        aria-label="Ellipsis"
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
