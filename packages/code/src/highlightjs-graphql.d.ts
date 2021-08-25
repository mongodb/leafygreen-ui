interface HLJSGraphQLDefinition {
  aliases: Array<string>;
  keywords: {
    keyword: string;
    literal: string;
    variable: string;
  };
  contains: Array<any>;
  illegal: RegExp;
}

declare module 'highlightjs-graphql' {
  import { HLJSApi } from 'highlight.js';
  export default function hljsDefineGraphQL(
    hljs: HLJSApi,
  ): HLJSGraphQLDefinition;
}
