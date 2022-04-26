import React from 'react';
import { storiesOf } from '@storybook/react';
import { array, select } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';

import { Pipeline, Stage, Size } from '.';

const containerStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  resize: horizontal;
  padding: 2rem;
  margin: 2rem;
  border: 1px solid ${uiColors.gray.light1};
  min-width: 180px;
  width: 320px;
`;

function DefaultExample() {
  // Configure knobs
  const defaultStages = [
    '$match',
    '$group',
    '$project',
    '$addFields',
    '$limit',
  ];

  const stages = array('Pipeline Stages', defaultStages).filter(Boolean);
  const size = select('Size', Object.values(Size) as Array<Size>, Size.XSmall);

  return (
    <div className={containerStyle}>
      <Pipeline size={size}>
        {stages.map((stage, index) => (
          <Stage key={`${stage}-${index}`}>{stage}</Stage>
        ))}
      </Pipeline>
    </div>
  );
}

storiesOf('Packages/Pipeline', module).add('Default', () => <DefaultExample />);
