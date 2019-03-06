import React from 'react';
import { render, cleanup } from 'react-testing-library';
import RichRadioInput from './RichRadioInput';

afterAll(cleanup);

describe('packages/Radio', () => {
  const className = 'test-rich-radio-input-class'
  const { container } = render(
    <RichRadioInput value='rich-radio-1' className={className} checked={true}>
      Rich Radio Input 1
    </RichRadioInput>
  );

  const richRadioContainer = container.firstChild
  const richRadioInput = richRadioContainer.firstChild

  // classname
  test(`renders "${className}" in RichRadioInput's classList`, () => {
    expect(richRadioContainer.classList.contains(className)).toBe(true)
  })

  // checked when prop is set
  test('renders as checked, when the checked prop is set', () => {
    expect(richRadioInput.checked).toBe(true)
    expect(richRadioInput.getAttribute('aria-checked')).toBe('true')
  })

  // disabled 
  test('renders as disabled, when the disabled prop is set', () => {
    render(<RichRadioInput disabled={true}>Rich Radio Input 3</RichRadioInput>)
  })
})