import React, { Component } from 'react';
import Portal from './Portal';
import { storiesOf } from '@storybook/react';
import { emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';

const { css } = emotion;

const portalChildrenStyle = css`
  text-align: center;
`;

class Control extends Component {
  state = { on: false, text: 'scarlett', container: document.getElementsByClassName('Pane1')[0] };

  componentDidMount = () => {
    if (document.getElementById('root')) {
      this.setState({ on: true})
    }
  }

  handleClick = () => {
    const root = document.getElementById('root')
    this.setState({ container: root })
  }

  render() {
    return (
      <div>
        <div id="poop" />
        <button
          size="small"
          onClick={this.handleClick}
        >
          Toggle Portal
        </button>
        {this.state.on && (
          <Portal container={this.state.container}>
            <div className={portalChildrenStyle}>
              {this.state.text}
            </div>
          </Portal>
        )}
      </div>
    );
  }
}

storiesOf('Portal', module).add('Default', () => (
  <section className="storybook-container">
    <Portal>
      <div className={portalChildrenStyle}>
        Portals transport their children to a <code>div</code> that is appended to the end of the <code>documet.body</code> to or a <code>node</code> that can be specified with a <code>container</code> prop.
      </div>
    </Portal>
  </section>
))
.add('test', () => (
  <section className="storybook-container">
    <div>
      <Control />
    </div>
  </section>
));
