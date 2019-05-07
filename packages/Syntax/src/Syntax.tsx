import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hljs from 'highlight.js/lib/highlight';

// const supportedLanguages = [
// 	'javascript',
// 	'typescript',
// 	'cal', // C/AL
// 	'csp', // C#
// 	'cpp', // C++
// 	'go',
// 	'java',
// 	'perl',
// 	'php',
// 	'python',
// 	'ruby',
// 	'scala',
// 	'bash',
// 	'shell',
// 	'sql',
// 	'yaml',
// 	'json',
// ]

// const languages = supportedLanguages.reduce((acc, val) => {
// 	return acc[val] = require(`highlight.js/lib/languages/${val}`)
// }, {})

export default class Syntax extends Component {
  static displayName = 'Syntax';

  static propTypes = {
    children: PropTypes.string,
  };

  componentDidMount() {
    // Object.keys(languages).forEach((language) => {
    // 	hljs.registerLanguage(language, languages[language]);
    // })

    hljs.initHighlightingOnLoad();

    const rootRef = this.rootRef.current;

    if (rootRef instanceof HTMLElement) {
      hljs.highlightBlock(rootRef);
    } else {
      debugger; // eslint-disable-line
    }
  }

  rootRef = React.createRef<HTMLDivElement>();

  render() {
    const { children } = this.props;

    return <div ref={this.rootRef}>{children}</div>;
  }
}
