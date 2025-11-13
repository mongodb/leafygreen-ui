import { FileObject } from './prebuild.types';

export async function indexTemplate(svgFiles: Array<FileObject>) {
  const imports = svgFiles
    .map(({ name }) => `import ${name} from './${name}.svg';`)
    .join('\n');

  const glyphsList = svgFiles.map(({ name }) => `${name}`).join(',\n    ');

  return `
    // Glyphs
    ${imports}

    export const glyphs = {
      ${glyphsList}
    } as const;

    export type GlyphName = keyof typeof glyphs;
  `;
}

export async function generatedIndexTemplate(svgFiles: Array<FileObject>) {
  const exports = svgFiles
    .map(({ name }) => `export { default as ${name} } from './${name}';`)
    .join('\n');

  return `/**
 * This is a generated file. Do not modify it manually.
 *
 * @script packages/icon/scripts/prebuild/index.ts
 */

${exports}
`;
}
