import React from 'react';
import { InlineCode } from '@leafygreen-ui/typography';

export const formatType = (
  string: string | undefined,
  href: string | undefined = undefined,
) => {
  const valueArray = string?.split(',');

  if (!valueArray) {
    return;
  }

  if (valueArray.length > 1) {
    return valueArray.map((val, index) => {
      if (index === 0) {
        return <InlineCode key={val}>{val.replace(/ /g, '')}</InlineCode>;
      }

      return (
        <>
          , <InlineCode key={val}>{val.replace(/ /g, '')}</InlineCode>
        </>
      );
    });
  }

  return <InlineCode href={href}>{valueArray[0]}</InlineCode>;
};
