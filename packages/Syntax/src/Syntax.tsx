import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hljs from 'highlight.js/lib/highlight';
import SyntaxTheme from './SyntaxTheme'

export enum SupportedLanguages {
  javascript = 'javascript',
  typescript = 'typescript',
  cal = 'cal', // C/AL
  csp = 'csp', // C#
  cpp = 'cpp', // C++
  go = 'go',
  java = 'java',
  perl = 'perl',
  php = 'php',
  python = 'python',
  ruby = 'ruby',
  scala = 'scala',
  bash = 'bash',
  shell = 'shell',
  sql = 'sql',
  yaml = 'yaml',
  json = 'json',
}

const languages = Object.keys(SupportedLanguages).reduce((acc, val) => {
  const language = require(`highlight.js/lib/languages/${val}`)
	return {
    ...acc,
    [val]: language,
  }
}, {})

interface Props {
  lang: SupportedLanguages | 'auto',
}

export default class Syntax extends Component<Props> {
  static displayName = 'Syntax';

  static propTypes = {
    children: PropTypes.string,
  };

  static defaultProps = {
    lang: 'auto',
  }

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

  componentDidUpdate() {
    // We need to do this any time the component re-renders
    this.highlightContent()
  }

  highlightContent() {
    const container = this.rootRef.current

    if (container instanceof HTMLElement) {
      hljs.highlightBlock(container);
    }
  }

  rootRef = React.createRef<HTMLDivElement>();

  render() {
    const { children, lang } = this.props;

    return (
      <>
        <code ref={this.rootRef} className={lang && SupportedLanguages[lang]}>{children}</code>
        <SyntaxTheme />
      </>
    );
  }
}
