import { createGlyphComponent } from '../createGlyphComponent';
import { LGGlyph } from '../types';

type GlyphObjectValue = React.ComponentType<
  React.SVGProps<SVGSVGElement> & {
    title?: string | null;
    role?: 'img' | 'presentation';
  }
>;

const requireContext = (require as any).context('./', false, /\.svg$/);
const svgFiles = requireContext.keys();

const svgImports: Record<string, GlyphObjectValue> = svgFiles.reduce(
  (acc: any, file: any) => {
    const fileName: string = file.replace('./', '').replace('.svg', '');
    acc[fileName] = requireContext(file).default;
    return acc;
  },
  {},
);

const _glyphs = svgImports;
export type GlyphName = keyof typeof _glyphs;

const glyphKeys = Object.keys(_glyphs) as Array<GlyphName>;

export const glyphs = glyphKeys.reduce((acc, name) => {
  acc[name] = createGlyphComponent(name, _glyphs[name]);

  return acc;
}, {} as Record<GlyphName, LGGlyph.Component>);
