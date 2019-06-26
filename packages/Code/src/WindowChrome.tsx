import React from 'react';
import PropTypes from 'prop-types';
import { cx, css } from '@leafygreen-ui/emotion';
import { Variant, variantColors } from '@leafygreen-ui/syntax';
import { darken } from 'polished';

export const windowChromeHeight = 28;

function WindowControl({ color }: { color: string }) {
	return (
		<div
			className={css`
				background-color: ${color};
				border: 1px solid ${darken(0.03, color)};
				height: 12px;
				width: 12px;
				border-radius: 50px;
				margin-right: 8px;
			`}
		/>
	);
}

const windowChromeStyle = css`
  height: ${windowChromeHeight}px;
  position: absolute;
  top: 0;
  left: 0;
	right: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const windowControlGroupStyle = css`
	position: absolute;
	left: 12px;
	top: 0;
	bottom: 0;
	height: 12px;
	margin: auto;
	display: flex;
`

function WindowChrome({
	variant,
	chromeLabel = '',
}: {
	variant: Variant,
	chromeLabel: string,
}) {
	const colors = variantColors[variant];

	return (
		<div className={cx(windowChromeStyle, css`
			background-color: ${colors['01']};
			color: ${colors['02']};
		`)}>
			<div className={windowControlGroupStyle}>
				<WindowControl color="#FF5952" />
				<WindowControl color="#E7BF2A" />
				<WindowControl color="#54C22C" />
			</div>
		
			<span>{chromeLabel}</span>
		</div>
	);
};

WindowChrome.displayName = 'WindowChrome';

WindowChrome.propTypes = {
  variant: PropTypes.oneOf(Object.values(Variant)),
};

export default WindowChrome;
