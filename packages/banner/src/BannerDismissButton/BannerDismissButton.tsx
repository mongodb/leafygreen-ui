import XIcon from '@leafygreen-ui/icon/dist/X';
import { cx } from '@leafygreen-ui/emotion';
import IconButton from '@leafygreen-ui/icon-button';
import { baseStyles } from "../BannerIcon/styles";

const BannerDismissButton = ({ onClose, darkMode }: any) => (
  <IconButton
    className={cx(
      baseStyles,
      variantStyles[theme][variant],
    )}
    aria-label="Close Message"
    onClick={onClose}
    darkMode={darkMode}
  >
    <XIcon />
  </IconButton>
)

export default BannerDismissButton;