import { FileObject } from './prebuild.types';

export async function indexTemplate(svgFiles: Array<FileObject>) {
  const imports = svgFiles
    .map(({ name }) => `import ${name} from '../generated/${name}';`)
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
