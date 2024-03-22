/* eslint-disable no-console */
import React, { ReactElement } from 'react';
import { GeneratedStoryConfig } from '@lg-tools/storybook-utils';
import { Args, StoryFn } from '@storybook/react';
import entries from 'lodash/entries';
import values from 'lodash/values';

import { cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Theme } from '@leafygreen-ui/lib';

import {
  cellStyles,
  combinationDarkModeStyles,
  combinationRowStyles,
  generatedStoryWrapper,
  instanceCellStyles,
  tableStyles,
} from '../PropCombinations.styles';
import { valStr } from '../utils';
import { RecursiveCombinations } from '../utils/RecursiveCombinations';
import { PropName } from '../utils/types';

import { Instance } from './Instance';

interface PropCombinationTableProps<T extends React.ComponentType<any>> {
  component: T;
  variables: Array<[PropName<T>, Array<any> | undefined]>;
  args: Args;
  exclude: GeneratedStoryConfig<T>['excludeCombinations'];
  decorator: GeneratedStoryConfig<T>['decorator'];
}

/**
 * Generates all combinations of each variable
 */
export function PropCombinations<T extends React.ComponentType<any>>({
  component,
  variables,
  args,
  exclude,
  decorator = (SFn: StoryFn) => <SFn />,
}: PropCombinationTableProps<T>): ReactElement<any> {
  const allCombinations = RecursiveCombinations({}, [...variables], exclude);

  const comboCount = allCombinations.length;
  console.info(
    `Rendering ${comboCount} prop combinations for component: ${component.displayName}`,
  );

  return (
    <div className={generatedStoryWrapper}>
      {values(Theme).map(theme => (
        <LeafyGreenProvider key={theme} darkMode={theme === Theme.Dark}>
          <table className={tableStyles}>
            <tbody>
              {allCombinations.map(combo => (
                <tr
                  key={JSON.stringify(combo)}
                  className={cx(combinationRowStyles, {
                    [combinationDarkModeStyles]: theme === Theme.Dark,
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
        </LeafyGreenProvider>
      ))}
    </div>
  );
}
