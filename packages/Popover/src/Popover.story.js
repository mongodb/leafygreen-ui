import React, { Component } from 'react';
import Popover from './Popover';
import { storiesOf } from '@storybook/react';
import { select, boolean, number } from '@storybook/addon-knobs';
import { emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';

const { css } = emotion;

const containerStyle = css`
  position: relative;
`;

const popoverStyle = css`
  border: 1px solid ${colors.gray[5]};
  text-align: center;
  padding: 20px 20px;
  background-color: ${colors.mongodb.white};
`;

class Testing extends Component {
  state = { active: false };

  render() {
    return (
      <button
        className={containerStyle}
        onClick={() => this.setState({ active: !this.state.active })}
      >
        Popover
        <Popover
          align={select('Align', ['top', 'bottom', 'left', 'right'], 'bottom')}
          justify={select('justify', ['start', 'middle', 'end'], 'start')}
          active={this.state.active}
          usePortal={boolean('usePortal', true)}
          spacing={number('spacing', 10)}
        >
          <div className={popoverStyle}>Popover content</div>
        </Popover>
      </button>
    );
  }
}

storiesOf('Popover', module).add('Default', () => <Testing />);
