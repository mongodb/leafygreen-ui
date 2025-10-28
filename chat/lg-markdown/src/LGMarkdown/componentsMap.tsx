import React, { Children, ComponentPropsWithoutRef, ReactElement } from 'react';
import { Components as ReactMarkdownComponents } from 'react-markdown';

import { Code, Language } from '@leafygreen-ui/code';
import { BaseFontSize, FontWeight } from '@leafygreen-ui/tokens';
import {
  Body,
  H3,
  InlineCode,
  Link,
  Subtitle,
} from '@leafygreen-ui/typography';

import { ExtraProps } from './LGMarkdown.types';

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
  blockquote: ({
    children,
    node: _node,
    ...rest
  }: ComponentPropsWithoutRef<'blockquote'> & ExtraProps) => {
    return <blockquote {...rest}>{children}</blockquote>;
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
    return (
      <H3 as="h1" {...rest}>
        {children}
      </H3>
    );
  },
  h2: ({
    children,
    node: _node,
    ...rest
  }: ComponentPropsWithoutRef<'h2'> & ExtraProps) => {
    return (
      <Subtitle as="h2" {...rest}>
        {children}
      </Subtitle>
    );
  },
  h3: ({
    children,
    node: _node,
    ...rest
  }: ComponentPropsWithoutRef<'h3'> & ExtraProps) => {
    return (
      <Body
        as="h3"
        baseFontSize={BaseFontSize.Body2}
        weight={FontWeight.SemiBold}
        {...rest}
      >
        {children}
      </Body>
    );
  },
  h4: ({
    children,
    node: _node,
    ...rest
  }: ComponentPropsWithoutRef<'h4'> & ExtraProps) => {
    return (
      <Body as="h4" weight={FontWeight.SemiBold} {...rest}>
        {children}
      </Body>
    );
  },
  // h5 is intentionally not supported, so return the markdown syntax as-is
  h5: ({
    children,
    node: _node,
    ...rest
  }: ComponentPropsWithoutRef<'h5'> & ExtraProps) => {
    return <Body {...rest}>##### {children}</Body>;
  },
  // h5 is intentionally not supported, so return the markdown syntax as-is
  h6: ({
    children,
    node: _node,
    ...rest
  }: ComponentPropsWithoutRef<'h6'> & ExtraProps) => {
    return <Body {...rest}>###### {children}</Body>;
  },
  hr: ({
    node: _node,
    ...rest
  }: ComponentPropsWithoutRef<'hr'> & ExtraProps) => {
    return <hr {...rest} />;
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
