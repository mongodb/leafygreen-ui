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

  // const [firstPropName] =
  //   variables.length > 1
  //     ? variables.find(([propName]) => propName !== 'darkMode')!
  //     : [undefined];

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
            as={isDarkModeProp ? 'div' : isLastProp ? 'tr' : React.Fragment}
            {...polyProps}
          >
            {isLastProp && <td>{}</td>}
            {propValues.map(val => (
              <PropDetailsComponent propName={propName} val={val}>
                {isDarkModeProp && <TableHeader />}
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
    return decorator(
      (extraArgs: typeof args) => (
        <td
          className={cx(instanceStyles)}
          data-props={JSON.stringify(instanceProps)}
        >
          {React.createElement(component, {
            ...extraArgs,
            ...args,
            ...instanceProps,
          })}
        </td>
      ),
      { args: { ...instanceProps, ...args } },
    );
  }

  /** Scoped to PropCombinations */
  function TableHeader() {
    const headerCellStyles = css`
      text-align: left;
    `;

    return (
      <thead>
        <tr>
          <th colSpan={lastPropVals.length}>{lastPropName}</th>
        </tr>
        <tr>
          {lastPropVals?.map(val => (
            <th className={headerCellStyles}>{valStr(val)}</th>
          ))}
        </tr>
      </thead>
    );
  }
}
