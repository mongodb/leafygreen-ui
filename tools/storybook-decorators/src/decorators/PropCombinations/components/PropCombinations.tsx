/* eslint-disable no-console */
import React, { ReactElement } from 'react';
import { Args, StoryFn } from '@storybook/react';
import { entries } from 'lodash';

import { cx } from '@leafygreen-ui/emotion';
import { GeneratedStoryConfig } from '@leafygreen-ui/lib';

import {
  cellStyles,
  combinationDarkModeStyles,
  combinationRowStyles,
  generatedStoryWrapper,
  instanceCellStyles,
  tableStyles,
} from '../PropCombinations.styles';
import { type PropCombination, valStr } from '../utils';
import { RecursiveCombinations } from '../utils/RecursiveCombinations';
import { PropName } from '../utils/types';

import { Instance } from './Instance';

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

  const tables = allCombinations.reduce(
    (t, combo) => {
      const mode = combo.darkMode ? 'dark' : 'light';
      t[mode].push(combo);
      return t;
    },
    { light: [], dark: [] } as Record<
      'light' | 'dark',
      Array<PropCombination<T>>
    >,
  );

  return (
    <div className={generatedStoryWrapper}>
      {entries(tables).map(([mode, combos]) => (
        <table key={mode} className={tableStyles}>
          <tbody>
            {combos.map(combo => (
              <tr
                key={JSON.stringify(combo)}
                className={cx(combinationRowStyles, {
                  [combinationDarkModeStyles]: combo.darkMode || args.darkMode,
                })}
              >
                <td className={cellStyles}>
                  <pre>
                    {entries(combo).map(([n, v]) => (
                      <div key={n + v}>
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
          </tbody>
        </table>
      ))}
    </div>
  );
}
