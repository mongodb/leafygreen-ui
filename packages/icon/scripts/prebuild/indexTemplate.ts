import { FileObject } from './prebuild.types';

export async function indexTemplate(svgFiles: Array<FileObject>) {
  const imports = svgFiles
    .map(({ name }) => `import ${name} from './${name}.svg';`)
    .join('\n');

  const _glyphs = `{
    ${svgFiles.map(({ name }) => `${name}`).join(',\n')}
  }`;

  return `
    import { createGlyphComponent } from '../createGlyphComponent';
    import { LGGlyph } from '../types';

    // Glyphs
    ${imports}

    const _glyphs = ${_glyphs} as const;

    export type GlyphName = keyof typeof _glyphs;
    
    const glyphKeys = Object.keys(_glyphs) as Array<GlyphName>;
    
    export const glyphs = glyphKeys.reduce((acc, name) => {
      acc[name] = createGlyphComponent(name, _glyphs[name]);
    
      return acc;
    }, {} as Record<GlyphName, LGGlyph.Component>);
  `;
}
