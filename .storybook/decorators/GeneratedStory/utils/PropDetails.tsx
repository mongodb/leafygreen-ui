import React from 'react';
import { cx } from '@leafygreen-ui/emotion';
import isChromatic from 'chromatic';
import { PropsWithChildren } from 'react';
import {
  combinationClassName,
  combinationNameStylesCI,
  combinationStyles,
  combinationStylesCI,
} from '../GeneratedStory.styles';
import { valStr } from './valStr';

export function PropDetailsComponent({
  children,
  propName,
  val,
}: PropsWithChildren<{
  propName: string;
  val: any;
}>) {
  return (
    <details
      open
      id={`${propName}-${valStr(val)}`}
      className={cx(combinationClassName, combinationStyles, {
        [combinationStylesCI]: isChromatic(),
      })}
    >
      <summary
        className={cx({
          [combinationNameStylesCI]: isChromatic(),
        })}
      >
        {propName} = "{`${valStr(val)}`}"
      </summary>
      {children}
    </details>
  );
}
