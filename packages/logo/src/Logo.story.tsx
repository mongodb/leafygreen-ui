import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, boolean, select } from '@storybook/addon-knobs';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { SupportedColors, LogoProps } from './utils';
import {
  MongoDBLogo,
  MongoDBLogoMark,
  AtlasLogoLockup,
  AtlasForGovernmentLogoLockup,
  RealmLogoLockup,
  EnterpriseAdvancedLogoLockup,
  CommunityEditionLogoLockup,
  UniversityLogoLockup,
  AtlasLogoMark,
  RealmLogoMark,
  ChartsLogoMark,
} from '.';

const containerStyle = css`
  min-width: 150px;
  min-height: 70px;
  padding: 24px;
  flex-shrink: 0;
  text-align: center;
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
  atlas: AtlasLogoMark,
  realm: RealmLogoMark,
  charts: ChartsLogoMark,
};

function renderLogoStory(LogoComponent: React.FunctionComponent<LogoProps>) {
  const color = select('Color', SupportedColors, SupportedColors.GreenDark2);
  const darkBackground = (
    [SupportedColors.White, SupportedColors.GreenBase] as Array<string>
  ).includes(color);

  const background = css`
    ${containerStyle};
    background-color: ${darkBackground ? '#06232E' : 'white'};
  `;

  return (
    <div className={background}>
      <LogoComponent color={color} height={number('Height', 40)} />
    </div>
  );
}

storiesOf('Packages/Logo', module)
  .add('MongoDB Logo', () => renderLogoStory(MongoDBLogo))
  .add('MongoDB Logo Mark', () => renderLogoStory(MongoDBLogoMark))
  .add('Atlas Logo Lockup', () => renderLogoStory(AtlasLogoLockup))
  .add('Atlas For Government Logo Lockup', () =>
    renderLogoStory(AtlasForGovernmentLogoLockup),
  )
  .add('Realm Logo Lockup', () => renderLogoStory(RealmLogoLockup))
  .add('Enterprise Advanced Logo Lockup', () =>
    renderLogoStory(EnterpriseAdvancedLogoLockup),
  )
  .add('Community Edition Logo Lockup', () =>
    renderLogoStory(CommunityEditionLogoLockup),
  )
  .add('University Logo Lockup', () => renderLogoStory(UniversityLogoLockup))
  .add('[DEPRECATED] Product Logo Marks', () => {
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
  });
