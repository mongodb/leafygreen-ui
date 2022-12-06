import React from 'react';

import LiveExample, { KnobsConfigInterface } from 'components/live-example';

import { palette } from '@leafygreen-ui/palette';
import { Pipeline, Size,Stage } from '@leafygreen-ui/pipeline';

import { css } from '@emotion/css';

const knobsConfig: KnobsConfigInterface<{ size: Size; darkMode: boolean }> = {
  size: {
    type: 'select',
    options: Object.values(Size),
    default: Size.XSmall,
    label: 'Size',
  },
  darkMode: {
    type: 'boolean',
    default: false,
    label: 'Dark Mode',
  },
};

const containerStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  resize: horizontal;
  padding: 2rem;
  margin: 2rem;
  border: 1px solid ${palette.gray.light1};
  min-width: 180px;
  width: 320px;
`;

function DefaultExample(props: { size: Size }) {
  const defaultStages = [
    '$match',
    '$group',
    '$project',
    '$addFields',
    '$limit',
  ];

  return (
    <div className={containerStyle}>
      <Pipeline {...props}>
        {defaultStages.map((stage, index) => (
          <Stage key={`${stage}-${index}`}>{stage}</Stage>
        ))}
      </Pipeline>
    </div>
  );
}

export default function PipelineLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <DefaultExample {...props} />}
    </LiveExample>
  );
}
