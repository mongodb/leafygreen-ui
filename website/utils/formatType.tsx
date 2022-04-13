import React, { Fragment } from 'react';
import { InlineCode } from '@leafygreen-ui/typography';

// Takes a string of possible `type` values of a component's prop and separates them such that they are more readable.
// This is used in PropTables and PropDefintions
// formatType(`'primary', 'info'`)
// => <InlineCode>'primary'</InlineCode>, <InlineCode>'info'</InlineCode>
// formatType('Function')
// => <InlineCode>'Function'</InlineCode>
export default function formatType(
  typeString: string,
  linkURL: string | undefined = undefined,
  className?: string,
) {
  if (typeString === '') {
    return null;
  }

  const valueArray = typeString.split(', ');

  if (!valueArray) {
    return null;
  }

  if (valueArray.length > 1) {
    return valueArray.map((val, index) => {
      if (index === 0) {
        return (
          <InlineCode href={linkURL} key={val} className={className}>
            {val}
          </InlineCode>
        );
      }

      return (
        <Fragment key={val}>
          ,{' '}
          <InlineCode href={linkURL} className={className}>
            {val}
          </InlineCode>
        </Fragment>
      );
    });
  }

  return (
    <InlineCode href={linkURL} className={className}>
      {valueArray[0]}
    </InlineCode>
  );
}
