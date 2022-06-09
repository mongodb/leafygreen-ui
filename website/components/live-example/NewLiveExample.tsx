// eslint complaining that we don't have propType definitions for NewLiveExample component
/* eslint react/prop-types: 0 */

import React, { useState } from 'react';
import { transparentize } from 'polished';
import { cx, css } from '@leafygreen-ui/emotion';
import Card from '@leafygreen-ui/card';
import { spacing } from '@leafygreen-ui/tokens';
import { palette } from '@leafygreen-ui/palette';
import { mq } from 'utils/mediaQuery';
import { pageContainerWidth } from 'styles/constants';
import NewKnob from './NewKnob';
import { NewLiveExampleInterface, PropsType } from './types';

const baseBoxShadow = `0 4px 10px -4px ${transparentize(0.7, palette.black)}`;

const backdrop = css`
  background-color: ${palette.gray.light3};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;

const previewStyle = css`
  display: flex;
  flex-direction: column;
  margin-top: ${spacing[4]}px;

  ${mq({
    boxShadow: ['none', baseBoxShadow],
    borderRadius: ['0px', '7px'],
    marginLeft: ['-24px', 'unset'],
    marginRight: ['-24px', 'unset'],
    width: [
      'inherit',
      'inherit',
      'inherit',
      `${pageContainerWidth.dataGraphic}px`,
    ],
  })}
`;

const componentContainer = css`
  padding: ${spacing[6]}px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  min-height: 400px;

  ${mq({
    padding: [`${spacing[4]}px`, `${spacing[6]}px`],
    minHeight: ['200px', '400px'],
  })}
`;

const componentContainerDarkMode = css`
  border-bottom: 1px solid ${palette.gray.dark2};
`;

function NewLiveExample({ Meta, StoryFn }: NewLiveExampleInterface) {
  const propTypes = Meta.component.propTypes;
  console.log(propTypes);
  const storyArgs: any = { ...Meta.args, ...StoryFn.args };
  const storyArgTypes: any = { ...Meta.argTypes, ...StoryFn.argTypes };
  const [props, setProps] = useState<any>(storyArgs);

  const onChange = <T extends PropsType['default']>(
    prop: string,
    value?: T,
  ) => {
    setProps({ ...props, [prop]: value });
  };

  return (
    <div>
      <div className={backdrop} />
      <Card
        darkMode={props?.darkMode}
        className={cx(previewStyle, {
          [css`
            background-color: ${palette.gray.dark3};
          `]: !!props.darkMode,
        })}
      >
        <div
          className={cx(componentContainer, {
            [componentContainerDarkMode]: !!props.darkMode,
          })}
        >
          <StoryFn {...storyArgs} {...props} />
        </div>
        {/* @ts-ignore */}
        {Object.entries(propTypes).map(([propName, { info }]) => (
          <NewKnob
            value={props[propName]}
            label={storyArgTypes[propName]?.label || propName}
            onChange={onChange}
            propName={propName}
            propInfo={info}
            darkMode={props.darkMode ? props.darkMode : false}
            isRequired={propTypes[propName].info.isRequired}
          />
        ))}
      </Card>
    </div>
  );
}

NewLiveExample.displayName = 'NewLiveExample';

export default NewLiveExample;
