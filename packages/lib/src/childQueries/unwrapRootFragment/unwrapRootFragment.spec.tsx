import React, { Fragment } from 'react';

import { unwrapRootFragment } from './unwrapRootFragment';

describe('packages/lib/unwrapRootFragment', () => {
  test('returns a single child that is not a Fragment', () => {
    const unwrapped = unwrapRootFragment(<div></div>);
    expect(unwrapped).toHaveLength(1);
  });

  test('returns children unchanged when it is an array', () => {
    const unwrapped = unwrapRootFragment([
      <div key="1"></div>,
      <div key="2"></div>,
    ]);
    expect(unwrapped).toHaveLength(2);
  });

  test("returns a single Fragment's children", () => {
    const unwrapped = unwrapRootFragment(
      <Fragment>
        <div />
        <div />
      </Fragment>,
    );
    expect(unwrapped).toHaveLength(2);
  });

  test('only unwraps a single layer of Fragments', () => {
    const unwrapped = unwrapRootFragment(
      <Fragment>
        <Fragment>
          <div />
          <div />
        </Fragment>
      </Fragment>,
    );
    expect(unwrapped).toHaveLength(1);
  });

  test('returns an empty array children has no length', () => {
    const unwrapped = unwrapRootFragment([]);
    expect(unwrapped).toBeDefined();
    expect(unwrapped).toHaveLength(0);
  });

  test('returns undefined if no children are provided', () => {
    const unwrapped = unwrapRootFragment(undefined);
    expect(unwrapped).not.toBeDefined();
  });
});
