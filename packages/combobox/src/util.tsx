import React from 'react';

/**
 *
 * Wraps the first instance of `wrap` found in `str` within the provided `element`.
 *
 * E.g. `wrapJSX('Apple', 'ap', 'em') => <><em>Ap</em>ple</>`
 *
 * @param str
 * @param wrap
 * @param element
 * @returns `JSX.Element`
 */
export const wrapJSX = (
  str: string,
  wrap?: string,
  element?: string,
): JSX.Element => {
  if (wrap && element) {
    const regex = new RegExp(wrap, 'gi');
    const startIndex = str.search(regex);
    const endIndex = startIndex + wrap.length;
    const nameArr = str.split('');
    const start = nameArr.slice(0, startIndex).join('');
    const end = nameArr.slice(endIndex).join('');
    const match = nameArr.slice(startIndex, endIndex).join('');
    const matchEl = React.createElement(element, null, match);
    return (
      <>
        {start}
        {matchEl}
        {end}
      </>
    );
  }

  return <>{str}</>;
};
