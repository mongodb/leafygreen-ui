import React, { Children, ComponentPropsWithoutRef, ReactElement } from 'react';
import {
  Components as ReactMarkdownComponents,
  ExtraProps,
} from 'react-markdown';

import Code, { Language } from '@leafygreen-ui/code';
import { Body, H1, H2, H3, InlineCode, Link } from '@leafygreen-ui/typography';

const componentsMap: ReactMarkdownComponents = {
  a: ({
    children,
    href,
    node: _node,
    ...rest
  }: ComponentPropsWithoutRef<'a'> & ExtraProps) => {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  },
  code: ({
    children,
    node: _node,
    ...rest
  }: ComponentPropsWithoutRef<'code'> & ExtraProps) => {
    return <InlineCode {...rest}>{children}</InlineCode>;
  },
  h1: ({
    children,
    node: _node,
    ...rest
  }: ComponentPropsWithoutRef<'h1'> & ExtraProps) => {
    return <H1 {...rest}>{children}</H1>;
  },
  h2: ({
    children,
    node: _node,
    ...rest
  }: ComponentPropsWithoutRef<'h2'> & ExtraProps) => {
    return <H2 {...rest}>{children}</H2>;
  },
  h3: ({
    children,
    node: _node,
    ...rest
  }: ComponentPropsWithoutRef<'h3'> & ExtraProps) => {
    return <H3 {...rest}>{children}</H3>;
  },
  li: ({
    children,
    node: _node,
    ...rest
  }: ComponentPropsWithoutRef<'li'> & ExtraProps) => {
    return (
      <Body as="li" {...rest}>
        {children}
      </Body>
    );
  },
  ol: ({
    children,
    node: _node,
    ...rest
  }: ComponentPropsWithoutRef<'ol'> & ExtraProps) => {
    return (
      <Body as="ol" {...rest}>
        {children}
      </Body>
    );
  },
  p: ({
    children,
    node: _node,
    ...rest
  }: ComponentPropsWithoutRef<'p'> & ExtraProps) => {
    return <Body {...rest}>{children}</Body>;
  },
  pre: ({
    children,
    node: _node,
    ...rest
  }: ComponentPropsWithoutRef<'pre'> & ExtraProps) => {
    /**
     * ReactMarkdown renders code blocks as:
     * <pre>
     *   <code class="language-xxx">...</code>
     * </pre>
     *
     * To extract the language and code content, we must:
     * 1. Get the first child of <pre> (the <code> element).
     * 2. Read its className for the language.
     * 3. Read its children for the code string.
     *
     * This is necessary because the <pre> element itself does not have the language or code content directly.
     */
    const codeElement = Children.toArray(children)[0] as ReactElement;
    const className = codeElement?.props?.className || '';
    const codeContent = codeElement?.props?.children || children;

    const codeString = Children.toArray(codeContent).join('\n');

    let language = className?.match(/language-(.+)/)?.[1] ?? 'none';

    const supportedLanguages = Object.values(Language);

    if (!supportedLanguages.includes(language as Language)) {
      console.warn(
        `Unknown code language: ${language}. Using the default language of "none" instead.`,
      );
      language = 'none';
    }

    return (
      <Code language={language as Language} {...rest}>
        {codeString}
      </Code>
    );
  },
  ul: ({
    children,
    node: _node,
    ...rest
  }: ComponentPropsWithoutRef<'ul'> & ExtraProps) => {
    return (
      <Body as="ul" {...rest}>
        {children}
      </Body>
    );
  },
};

export default componentsMap;
