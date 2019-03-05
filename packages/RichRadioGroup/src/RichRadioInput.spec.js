import React from 'react';
import { render, cleanup } from 'react-testing-library';
import RichRadioInput from './RichRadioInput';

afterAll(cleanup);

describe('packages/Radio', () => {

  const className = 'test-rich-radio-input-class'
  const { container } = render(
    <RichRadioInput value='rich-radio-1' className={className} checked={false}>
      Rich Radio Input 1
    </RichRadioInput>
  );

  const testContainer = container.firstChild
  const radioInput = testContainer.firstChild 

  test('TEST BLAH', () => {
    console.log(container)
    console.log('---')
    console.log(radioInput)
  })
  // classname

  // disabled 

  // checked when prop is set

  // variant, size?
})