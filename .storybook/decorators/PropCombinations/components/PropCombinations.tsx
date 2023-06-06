import React, { ReactElement } from 'react';
import { entries } from 'lodash';
import { Args, StoryFn } from '@storybook/react';

import { cx } from '@leafygreen-ui/emotion';
import { GeneratedStoryConfig } from '@leafygreen-ui/lib';

import { PropCombination, PropName } from '../utils/types';
import { RecursiveCombinations } from '../utils/RecursiveCombinations';
import { valStr } from '../utils';
import {
  cellStyles,
  combinationDarkModeStyles,
  combinationRowStyles,
  instanceCellStyles,
  tableStyles,
} from '../PropCombinations.styles';

/**
 * Generates all combinations of each variable
 */
export function PropCombinations<T extends React.ComponentType<any>>({
  component,
  variables,
  args,
  exclude,
  decorator = (SFn: StoryFn) => <SFn />,
}: {
  component: T;
  variables: Array<[PropName<T>, Array<any> | undefined]>;
  args: Args;
  exclude: GeneratedStoryConfig<T>['excludeCombinations'];
  decorator: GeneratedStoryConfig<T>['decorator'];
}): ReactElement<any> {
  const allCombinations = RecursiveCombinations({}, [...variables], exclude);

  const comboCount = allCombinations.length;
  console.info(
    `Rendering ${comboCount} prop combinations for component: ${component.displayName}`,
  );

  return (
    <table className={tableStyles}>
      {allCombinations.map(combo => (
        <tr
          className={cx(combinationRowStyles, {
            [combinationDarkModeStyles]: combo.darkMode === true,
          })}
        >
          <td className={cellStyles}>
            <pre>
              {entries(combo).map(([n, v]) => (
                <div>
                  <b>{n}:</b> {valStr(v)}
                </div>
              ))}
            </pre>
          </td>
          <td className={cx(cellStyles, instanceCellStyles)}>
            <Instance
              component={component}
              instanceProps={{ ...args, ...combo }}
              decorator={decorator}
            />
          </td>
        </tr>
      ))}
    </table>
  );
}

function Instance<T extends React.ComponentType<any>>({
  component,
  instanceProps,
  decorator,
}: {
  component: T;
  instanceProps: PropCombination<T>;
  decorator: Required<GeneratedStoryConfig<T>>['decorator'];
}): ReactElement<any> {
  return decorator(
    (extraArgs: Args) =>
      React.createElement(component, {
        ...instanceProps,
        ...extraArgs,
      }),
    { args: { ...instanceProps } },
  );
}
