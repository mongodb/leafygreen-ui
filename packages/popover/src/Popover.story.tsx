import React, { useState, useRef } from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean, number, text } from '@storybook/addon-knobs';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Popover, { Align, Justify } from '.';

const containerStyle = css`
  position: absolute;
  min-height: 50px;
  appearance: none;
  box-shadow: 0 0 4px #000;
  background-color: ${uiColors.gray.light1};
`;

const popoverStyle = css`
  border: 1px solid ${uiColors.gray.light1};
  text-align: center;
  padding: 20px;
  max-height: 100%;
  overflow: hidden;
  // Reset these properties since they'll be inherited
  // from the container element when not using a portal.
  font-size: initial;
  color: initial;
  background-color: initial;
`;

const referenceElPositions = {
  centered: css`
    position: relative;
    margin-bottom: 200vh;
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

const scrollableStyle = css`
  height: 200vh;
  padding-top: 50vh;
`;

function DefaultExample() {
  const [active, setActive] = useState(false);
  const exampleIsScrollable = boolean('Example page scrolling', false);

  return (
    <div className={cx({ [scrollableStyle]: exampleIsScrollable })}>
      <button
        onClick={() => setActive(!active)}
        className={cx(
          containerStyle,
          referenceElPositions[
            select(
              'Reference Element Position',
              ['centered', 'top', 'right', 'bottom', 'left'],
              'centered',
            )
          ],
        )}
      >
        {text('Button Content', 'Popover')}
        <Popover
          align={select('Align', Object.values(Align), 'top')}
          justify={select('justify', Object.values(Justify), 'start')}
          active={active}
          usePortal={boolean('usePortal', true)}
          spacing={number('spacing', 10)}
          adjustOnMutation={boolean('adjustOnMutation', false)}
        >
          <div className={popoverStyle}>Popover content</div>
        </Popover>
      </button>
    </div>
  );
}

function AdvancedExample() {
  const [active, setActive] = useState(false);
  const refEl = useRef(null);

  return (
    <>
      <button
        ref={refEl}
        onClick={() => setActive(!active)}
        className={cx(
          containerStyle,
          referenceElPositions[
            select(
              'Reference Element Position',
              ['centered', 'top', 'right', 'bottom', 'left'],
              'centered',
            )
          ],
        )}
      >
        {text('Button Content', 'Popover')}
      </button>

      <Popover
        align={select('Align', Object.values(Align), 'top')}
        justify={select('justify', Object.values(Justify), 'start')}
        active={active}
        usePortal={boolean('usePortal', true)}
        spacing={number('spacing', 10)}
        adjustOnMutation={boolean('adjustOnMutation', false)}
        popoverZIndex={number('popoverZIndex', 1)}
        refEl={refEl}
      >
        <div className={popoverStyle}>Popover content</div>
      </Popover>
    </>
  );
}

function ScrollExample() {
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(
    null,
  );
  const [active, setActive] = useState(false);
  const buttonRef = useRef(null);

  return (
    <>
      <div
        ref={el => setPortalContainer(el)}
        className={css`
          margin: 150px;
          width: 100%;
          overflow-y: auto;
          background-color: #eaeaea;
          max-height: calc(100vh - 200px);
          padding: 100px;
          position: relative;
        `}
      >
        <button
          ref={buttonRef}
          onClick={() => setActive(curr => !curr)}
          className={cx(
            containerStyle,
            referenceElPositions[
              select(
                'Reference Element Position',
                ['centered', 'top', 'right', 'bottom', 'left'],
                'centered',
              )
            ],
          )}
        >
          {text('Button Content', 'Popover')}
        </button>
      </div>

      <Popover
        align={select('Align', Object.values(Align), 'top')}
        justify={select('justify', Object.values(Justify), 'start')}
        spacing={number('spacing', 10)}
        adjustOnMutation={boolean('adjustOnMutation', false)}
        portalContainer={portalContainer}
        scrollContainer={portalContainer}
        active={active}
        refEl={buttonRef}
      >
        <div className={popoverStyle}>Popover content</div>
      </Popover>
    </>
  );
}

storiesOf('Packages/Popover', module)
  .add('Default', () => <DefaultExample />)
  .add('Advanced', () => <AdvancedExample />)
  .add('Scroll Container', () => <ScrollExample />);
