import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, boolean, select } from '@storybook/addon-knobs';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import {
  Logo,
  LogoMark,
  CloudManagerLogoMark,
  AtlasLogoMark,
  RealmLogoMark,
  ChartsLogoMark,
  AtlasLogo,
  ChartsLogo,
  RealmLogo,
  CloudManagerLogo,
  ServerLogoMark,
  DriversConnectorsLogoMark,
  CompassLogoMark,
} from '.';
import { Product, Lockup } from './utils';

const containerStyle = css`
  width: 150px;
  height: 70px;
  flex-shrink: 0;
  text-align: center;
  border: 1px solid #babdbe;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0.5rem;
`;

const textStyle = css`
  font-size: 12px;
  color: #babdbe;
  margin-top: 0.5rem;
`;

const map = {
  cloudManager: CloudManagerLogoMark,
  atlas: AtlasLogoMark,
  realm: RealmLogoMark,
  charts: ChartsLogoMark,
  server: ServerLogoMark,
  driversConnectors: DriversConnectorsLogoMark,
  compass: CompassLogoMark,
};

storiesOf('Logo', module)
  .add('LogoMark', () => {
    const darkMode = boolean('darkMode', false);

    const background = css`
      padding: 10px;
      background-color: ${!darkMode
        ? uiColors.gray.light3
        : uiColors.gray.dark3};
    `;

    return (
      <div className={background}>
        <LogoMark
          darkMode={darkMode}
          knockout={boolean('Knockout', false)}
          height={number('Height', 40)}
        />
      </div>
    );
  })
  .add('Logo', () => {
    const darkMode = boolean('darkMode', false);

    const background = css`
      padding: 10px;
      background-color: ${!darkMode
        ? uiColors.gray.light3
        : uiColors.gray.dark3};
    `;

    return (
      <div className={background}>
        <Logo
          darkMode={darkMode}
          knockout={boolean('Knockout', false)}
          height={number('Height', 40)}
          product={select(
            'Product',
            [...Object.values(Product), 'none'],
            'none',
          )}
          lockup={select('Lockup', Object.values(Lockup), Lockup.Default)}
        />
      </div>
    );
  })
  .add('Product LogoMarks', () => {
    const knockout = boolean('knockout', false);
    const size = number('size', 18);
    const darkMode = boolean('darkMode', false);

    const renderProductLogo = (product: keyof typeof map) => {
      const Logo = map[product];
      return (
        <div
          key={product}
          className={cx(
            containerStyle,
            css`
              background-color: ${darkMode
                ? uiColors.gray.dark3
                : uiColors.white};
            `,
          )}
        >
          <Logo knockout={knockout} size={size} darkMode={darkMode} />
          <div
            className={cx(
              textStyle,
              css`
                color: ${darkMode ? uiColors.white : uiColors.gray.dark1};
              `,
            )}
          >
            {product}
          </div>
        </div>
      );
    };

    return (
      <>
        {Object.keys(map).map(key =>
          renderProductLogo(key as keyof typeof map),
        )}
      </>
    );
  })
  .add('Product Logos', () => {
    const props = {
      knockout: boolean('knockout', false),
      height: number('size', 78),
      darkMode: boolean('darkMode', false),
      className: css`
        margin: 10px;
      `,
    };

    return (
      <div
        className={cx(
          css`
            padding: 20px;
            background-color: ${props.darkMode
              ? uiColors.gray.dark3
              : uiColors.white};
          `,
        )}
      >
        <AtlasLogo {...props} />
        <ChartsLogo {...props} />
        <RealmLogo {...props} />
        <CloudManagerLogo {...props} />
      </div>
    );
  });
