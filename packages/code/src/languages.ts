import bash from 'highlight.js/lib/languages/bash';
import c from 'highlight.js/lib/languages/c';
import cpp from 'highlight.js/lib/languages/cpp';
import csharp from 'highlight.js/lib/languages/csharp';
import dart from 'highlight.js/lib/languages/dart';
import diff from 'highlight.js/lib/languages/diff';
import go from 'highlight.js/lib/languages/go';
import http from 'highlight.js/lib/languages/http';
import ini from 'highlight.js/lib/languages/ini';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import kotlin from 'highlight.js/lib/languages/kotlin';
import objectivec from 'highlight.js/lib/languages/objectivec';
import perl from 'highlight.js/lib/languages/perl';
import php from 'highlight.js/lib/languages/php';
import properties from 'highlight.js/lib/languages/properties';
import python from 'highlight.js/lib/languages/python';
import ruby from 'highlight.js/lib/languages/ruby';
import rust from 'highlight.js/lib/languages/rust';
import scala from 'highlight.js/lib/languages/scala';
import shell from 'highlight.js/lib/languages/shell';
import sql from 'highlight.js/lib/languages/sql';
import swift from 'highlight.js/lib/languages/swift';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';

export const languageParsers = {
  javascript,
  typescript,
  c,
  cpp,
  csharp,
  go,
  http,
  ini,
  java,
  perl,
  php,
  properties,
  python,
  ruby,
  rust,
  scala,
  swift,
  kotlin,
  objectivec,
  dart,
  bash,
  shell,
  sql,
  yaml,
  json,
  diff,
  xml,
} as const;

export const SupportedLanguages = {
  JavaScript: 'javascript',
  JS: 'js', // Javascript alias
  TypeScript: 'typescript',
  TS: 'ts', // Typescript alias
  C: 'c',
  Cpp: 'cpp',
  Csharp: 'csharp',
  Cs: 'cs', // C# alias
  Go: 'go',
  Html: 'xml', // HTML alias
  Http: 'http',
  Ini: 'ini',
  Java: 'java',
  Perl: 'perl',
  Php: 'php',
  Properties: 'properties',
  Python: 'python',
  Ruby: 'ruby',
  Rust: 'rust',
  Scala: 'scala',
  Swift: 'swift',
  Kotlin: 'kotlin',
  ObjectiveC: 'objectivec',
  Dart: 'dart',
  Bash: 'bash',
  Shell: 'shell',
  Sql: 'sql',
  Yaml: 'yaml',
  Json: 'json',
  Graphql: 'graphql',
  Diff: 'diff',
  Xml: 'xml',
} as const;

export type SupportedLanguages =
  (typeof SupportedLanguages)[keyof typeof SupportedLanguages];
