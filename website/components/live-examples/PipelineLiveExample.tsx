import React from 'react';
import { css } from 'emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { Pipeline, Stage, Size } from '@leafygreen-ui/pipeline';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

const knobsConfig: KnobsConfigInterface<{ size: Size }> = {
  size: {
    type: 'select',
    options: Object.values(Size),
    default: Size.XSmall,
    label: 'Size',
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
  border: 1px solid ${uiColors.gray.light1};
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
