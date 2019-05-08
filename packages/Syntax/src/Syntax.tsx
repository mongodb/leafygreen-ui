import React, { Component } from 'react';
import PropTypes from 'prop-types';
import highlight from 'highlight.js'
import hljs from 'highlight.js/lib/highlight';
import SyntaxTheme from './SyntaxTheme'

const supportedLanguages = [
	'javascript',
	'typescript',
	'cal', // C/AL
	'csp', // C#
	'cpp', // C++
	'go',
	'java',
	'perl',
	'php',
	'python',
	'ruby',
	'scala',
	'bash',
	'shell',
	'sql',
	'yaml',
	'json',
]

const languages = supportedLanguages.reduce((acc, val) => {
  const language = require(`highlight.js/lib/languages/${val}`)
	return {
    ...acc,
    [val]: language,
  }
}, {})

export default class Syntax extends Component {
  static displayName = 'Syntax';

  static propTypes = {
    children: PropTypes.string,
  };

  componentDidMount() {
    Object.keys(languages).forEach((language) => {
    	hljs.registerLanguage(language, languages[language]);
    })

    hljs.configure({
      languages: Object.keys(languages),
      classPrefix: 'lg-highlight-',
    })

    this.highlightContent()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.children !== this.props.children) {
      this.highlightContent()
    }
  }

  highlightContent() {
    const container = this.rootRef.current

    if (container instanceof HTMLElement) {
      hljs.highlightBlock(container);
    }
  }

  rootRef = React.createRef<HTMLDivElement>();

  render() {
    const { children } = this.props;

    return (
      <>
        <code ref={this.rootRef}>{children}</code>
        <SyntaxTheme />
      </>
    );
  }
}
