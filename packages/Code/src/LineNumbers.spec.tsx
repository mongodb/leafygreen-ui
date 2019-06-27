import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { typeIs } from '@leafygreen-ui/lib';
import LineNumbers from './LineNumbers';

afterAll(cleanup);

const className = 'test-class';
const codeSnippet = `
const greeting = "Hello";\rgreeting += ", world!";
console.log(greeting);
`;

describe('packages/Syntax', () => {
	const { container } = render(
		<LineNumbers content={codeSnippet} className={className} />,
	);

	const rootElement = container.firstChild as HTMLElement;

	if (!rootElement || !typeIs.element(rootElement)) {
    throw new Error('Code element not found');
	}

	test(`renders "${className}" in the root element's classList`, () => {
    expect(rootElement.classList.contains(className)).toBe(true);
  });
	
	test('renders a number for each new line in string', () => {
		expect(rootElement.children.length).toBe(3)
	})
})
