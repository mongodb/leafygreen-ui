import { Theme } from '.';

const getTheme = (darkMode: boolean) => (darkMode ? Theme.Dark : Theme.Light);

export default getTheme;
