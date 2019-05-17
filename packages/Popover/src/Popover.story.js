import React, { useState } from 'react';
import Popover from './Popover';
import { storiesOf } from '@storybook/react';
import { select, boolean, number } from '@storybook/addon-knobs';
import { emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';

const { css, cx } = emotion;

const containerStyle = css`
  position: absolute;
`;

const popoverStyle = css`
  border: 1px solid ${colors.gray[5]};
  text-align: center;
  padding: 20px 20px;
  background-color: ${colors.mongodb.white};
`;

const referenceElPositions = {
  centered: css`
    position: relative;
  `,
  top: css`
    top: 0;
  `,
  right: css`
    right: 0;
  `,
  bottom: css`
    bottom: 0;
  `,
  left: css`
    left: 0;
  `,
};

function Example() {
  const [active, setActive] = useState(false);

  return (
    <button
      onClick={() => setActive(!active)}
      className={cx(
        containerStyle,
        referenceElPositions[
          select(
            'Reference Element Position',
            ['center', 'top', 'right', 'bottom', 'left'],
            'center',
          )
        ],
      )}
    >
      Popover
      <Popover
        align={select('Align', ['top', 'right', 'bottom', 'left'], 'top')}
        justify={select('justify', ['start', 'middle', 'end'], 'start')}
        active={active}
        usePortal={boolean('usePortal', true)}
        spacing={number('spacing', 10)}
      >
        <div className={popoverStyle}>Popover content</div>
      </Popover>
    </button>
  );
}

storiesOf('Popover', module).add('Default', () => <Example />);
