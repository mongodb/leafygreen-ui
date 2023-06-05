import React, { PropsWithChildren, ReactElement } from 'react';
import { Args, StoryFn } from '@storybook/react';
import { css, cx } from '@leafygreen-ui/emotion';
import { GeneratedStoryConfig } from '@leafygreen-ui/lib';
import { Polymorph } from '@leafygreen-ui/polymorphic';

import {
  combinationStyles,
  combinationStylesDarkMode,
  combinationStylesDarkModeProp,
  instanceStyles,
  propWrapperStyles,
  propWrapperStylesDarkModeProp,
} from '../PropCombinations.styles';
import { shouldExcludePropCombo, valStr } from '../utils';
import { entries } from 'lodash';

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
  variables: Array<[string, Array<any>]>;
  args: Args;
  exclude: GeneratedStoryConfig<T>['excludeCombinations'];
  decorator: GeneratedStoryConfig<T>['decorator'];
}): ReactElement<any> {
  let comboCount = 0;

  const [lastPropName, lastPropVals] = variables[variables.length - 1];

  const AllCombinations = RecursiveCombinations({}, [...variables]);

  console.log(
    `Rendering ${comboCount} prop combinations for component: ${component.displayName}`,
  );

  return AllCombinations;

  /**
   * Recursively loop through all prop combinations defined in `variables` and render them
   */
  function RecursiveCombinations(
    props: Record<string, any>,
    vars: Array<[string, Array<any>]>,
  ): ReactElement<any> {
    // If this is the last variable, this is our base case
    if (vars.length === 0) {
      comboCount += 1;
      return <Instance instanceProps={props} />;
    } else {
      const [propName, propValues] = vars.shift()!;
      const isDarkModeProp = propName === 'darkMode';
      const isLastProp = propName === lastPropName;

      const polyProps = (isDarkModeProp || isLastProp) && {
        className: cx(propWrapperStyles, {
          [propWrapperStylesDarkModeProp]: isDarkModeProp,
        }),
        id: propName,
      };

      if (propValues) {
        return (
          <Polymorph
            as={isDarkModeProp ? 'table' : isLastProp ? 'tr' : React.Fragment}
            {...polyProps}
          >
            {isLastProp && <PropLabels instanceProps={props} />}
            {propValues.map(val => (
              <PropDetailsComponent propName={propName} val={val}>
                {isDarkModeProp && <TableHeader vars={vars} />}
                {RecursiveCombinations({ [propName]: val, ...props }, [
                  ...vars,
                ])}
              </PropDetailsComponent>
            ))}
          </Polymorph>
        );
      } else {
        return <div>No Prop Values</div>;
      }
    }

    /** Scoped to `RecursiveCombinations` closure */
    function PropDetailsComponent({
      children,
      propName,
      val,
    }: PropsWithChildren<{
      propName: string;
      val: any;
    }>) {
      const shouldRender = !shouldExcludePropCombo<T>({
        propName,
        val,
        props,
        exclude,
      });

      const isDarkModeProp = propName === 'darkMode';

      const polyProps = isDarkModeProp && {
        id: `${propName}-${val}`,
        className: cx(combinationStyles, {
          [combinationStylesDarkModeProp]: isDarkModeProp,
          [combinationStylesDarkMode]: isDarkModeProp && val,
        }),
        darkMode: isDarkModeProp && val,
      };

      return shouldRender ? (
        <Polymorph
          as={isDarkModeProp ? 'table' : React.Fragment}
          {...polyProps}
        >
          {children}
        </Polymorph>
      ) : (
        <></>
      );
    }
  }

  /** Scoped to PropCombinations */
  function Instance({ instanceProps }: { instanceProps: Record<string, any> }) {
    return (
      <td
        className={cx(instanceStyles)}
        data-props={JSON.stringify(instanceProps)}
      >
        {decorator(
          (extraArgs: typeof args) =>
            React.createElement(component, {
              ...extraArgs,
              ...args,
              ...instanceProps,
            }),
          { args: { ...instanceProps, ...args } },
        )}
      </td>
    );
  }

  /** Scoped to PropCombinations */
  function PropLabels({
    instanceProps,
  }: {
    instanceProps: Record<string, any>;
  }) {
    const propsToLabel = entries(instanceProps).filter(
      ([p]) => p !== 'darkMode',
    );
    propsToLabel.reverse();

    return (
      <>
        {propsToLabel.map(([_, v]) => (
          <td>{valStr(v)}</td>
        ))}
      </>
    );
  }

  /** Scoped to PropCombinations */
  function TableHeader({ vars }: { vars: Array<[string, any]> }) {
    const headerCellStyles = css`
      text-align: left;
    `;

    const varNames = vars.filter(([v]) => v !== lastPropName).map(([v]) => v);

    return (
      <thead>
        <tr>
          <th colSpan={varNames.length} />
          <th className={headerCellStyles} colSpan={lastPropVals.length}>
            <b>{lastPropName}</b>
          </th>
        </tr>
        <tr>
          {varNames.map(name => (
            <th className={headerCellStyles}>{name}</th>
          ))}
          {lastPropVals?.map(val => (
            <th className={headerCellStyles}>{valStr(val)}</th>
          ))}
        </tr>
      </thead>
    );
  }
}
