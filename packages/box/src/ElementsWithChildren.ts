import React from 'react';

/**
 * A subset of JSX.IntrinsicElements that accept children
 */
export type IntrinsicElementsWithChildren = Omit<
  JSX.IntrinsicElements,
  // Excludes Void, Raw & Foreign elements
  // (https://html.spec.whatwg.org/multipage/syntax.html#void-elements)
  | 'object'
  | 'area'
  | 'base'
  | 'br'
  | 'col'
  | 'embed'
  | 'hr'
  | 'img'
  | 'input'
  | 'link'
  | 'meta'
  | 'source'
  | 'track'
  | 'wbr'
  | 'template'
  | 'script'
  | 'style'
  | 'title'
  | keyof React.ReactSVG
>;

export type IntrinsicElementTag = keyof IntrinsicElementsWithChildren
