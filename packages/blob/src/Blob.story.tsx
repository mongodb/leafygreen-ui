import React, { useState } from 'react';
import { cloneDeep } from 'lodash';
import { Meta, Story } from '@storybook/react';
import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { Description, H1, H2 } from '@leafygreen-ui/typography';
import Button from '@leafygreen-ui/button';
import Code, { Language, LanguageOption } from '@leafygreen-ui/code';
import Blob from '.';
import { generateBlobPath } from './generateBlobPath';
import {
  blobCode,
  BlobProps,
  Coordinate,
  isCharEmpty,
  isCharLarge,
} from './types';

export default {
  title: 'Components/Blob',
  component: Blob,
  parameters: {
    controls: {
      exclude: ['children', 'className'],
    },
  },
} as Meta<Blob>;

const Template: Story<BlobProps> = ({ shape }: BlobProps) => (
  <Blob shape={shape} />
);

export const Basic = Template.bind({});
Basic.args = {
  shape: [
    ['o', ' ', ' ', ' '],
    [' ', 'o', ' ', ' '],
    [' ', 'o', 'o', ' '],
    ['o', ' ', ' ', 'o'],
  ],
};

export const WithLarge = Template.bind({});
WithLarge.args = {
  shape: [
    ['O', 'O', ' ', ' '],
    ['O', 'O', 'O', 'O'],
    [' ', ' ', 'O', 'O'],
    [' ', ' ', 'o', ' '],
  ],
};

export const Interactive = () => {
  const [shape, setShape] = useState<blobCode>([
    ['o', ' ', ' ', ' '],
    [' ', 'o', ' ', ' '],
    [' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' '],
  ]);

  const handleClick = (
    e: React.MouseEvent<SVGCircleElement, MouseEvent>,
    [r, c]: Coordinate,
  ) => {
    const current = shape[r][c];
    const newShape = cloneDeep(shape);

    if (isCharLarge(current) && r < 3 && c < 3) {
      // zero out this and relevant adjacencies
      newShape[r][c] = ' ';
      newShape[r + 1][c] = ' ';
      newShape[r][c + 1] = ' ';
      newShape[r + 1][c + 1] = ' ';
    } else if (e.shiftKey && r < 3 && c < 3) {
      // Set this and relevant adjacencies to "O"
      newShape[r][c] = 'O';
      newShape[r + 1][c] = 'O';
      newShape[r][c + 1] = 'O';
      newShape[r + 1][c + 1] = 'O';
    } else {
      const next = isCharEmpty(current) ? 'o' : ' ';
      newShape[r][c] = next;
    }
    setShape(newShape);
  };

  const languageOptions = [
    {
      displayName: 'React',
      language: Language.JavaScript,
    },
    {
      displayName: 'SVG',
      language: Language.Xml,
    },
  ];

  const [language, setLanguage] = useState<LanguageOption>(languageOptions[0]);

  const handleLangChange = (languageObject: LanguageOption) => {
    setLanguage(languageObject);
  };

  const path = generateBlobPath(shape);
  const blobcode = `<Blob \n  shape={${JSON.stringify(shape)
    .replace(/\[\[/g, '[\n  [')
    .replace(/]]/g, ']\n  ]')
    .replace(/\["/g, '  ["')
    .replace(/],/g, '],\n  ')}}\n/>`;
  const svgCode = `<svg viewBox="0 0 8 8><path d="${JSON.stringify(
    path,
    null,
    2,
  )}" fill={${palette.green.base}}/></svg>`
    .replace(/>/g, '>\n')
    .replace('<path', '  <path');

  return (
    <div
      className={css`
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        width: 100%;
        top: 0;
        left: 0;
        padding: 72px;
      `}
    >
      <div>
        <H1>MongoDB Brand Shape Generator</H1>
        <H2>Click to add or remove a circle.</H2>
        <H2>Shift-click to add a large (2x2) circle.</H2>
      </div>
      <div
        className={css`
          display: flex;
          flex-direction: row;
          gap: 32px;
          align-items: center;
        `}
      >
        <Blob
          shape={shape}
          mode="interactive"
          onGridCircleClick={handleClick}
          className={css`
            width: 512px;
          `}
        />
        <div
          className={css`
            width: 256px;
          `}
        >
          <Code
            language={language.displayName}
            onChange={handleLangChange}
            languageOptions={languageOptions}
          >
            {language.language === 'javascript' ? blobcode : svgCode}
          </Code>
        </div>
      </div>
      <div
        className={css`
          display: flex;
          gap: 16px;
          align-items: baseline;
        `}
      >
        <Description>
          Red circles mean there&apos;s likely an error in the pattern. Use the
          generated code to help resolve any errors, or:
        </Description>
        <Button
          size="small"
          variant="dangerOutline"
          onClick={() =>
            setShape([
              [' ', ' ', ' ', ' '],
              [' ', ' ', ' ', ' '],
              [' ', ' ', ' ', ' '],
              [' ', ' ', ' ', ' '],
            ])
          }
        >
          Clear all
        </Button>
      </div>
    </div>
  );
};
