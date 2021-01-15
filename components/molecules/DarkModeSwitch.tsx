import React, { useContext, useEffect } from 'react';
import Switch from './../atoms/Switch';
import { ThemeContext } from '../../context/ThemeContext';
import { css } from '@emotion/css';
import globalCss from '../../styles/global-css';

const DarkModeSwitch = (): React.ReactElement => {
  const [colorMode, setColorMode] = useContext(ThemeContext);

  const darkModeHandling = (event: React.FormEvent<HTMLButtonElement>) => {
    setColorMode(colorMode === 'dark' ? 'light' : 'dark');
    const innerItem = event.currentTarget.firstElementChild;
    innerItem.animate([
      { transform: 'rotate(0)' },
      { transform: 'rotate(-60deg)' },
      { transform: 'rotate(-15deg)' },
      { transform: 'rotate(0deg)' }
    ], 500);
  };

  useEffect(() => {
    if (colorMode) {
      document.documentElement.setAttribute('data-theme', colorMode);
    }
  }, [colorMode]);

  // useEffect(() => {
  //   checkSystemPreference();
  //   systemPreference.addEventListener('change', checkSystemPreference);

  //   return () => {
  //     systemPreference.removeEventListener('change', checkSystemPreference);
  //   };
  // }, [checkSystemPreference, systemPreference]);

  return (
    <Switch
      className={cssDarkModeSwitch}
      checked={colorMode === 'dark'}
      unCheckedChildren="🌞"
      checkedChildren="🌜"
      onClick={darkModeHandling}
    />
  );
};

export default DarkModeSwitch;

const cssDarkModeSwitch = css`
  background-color: ${globalCss.color.borderColor};
`;

