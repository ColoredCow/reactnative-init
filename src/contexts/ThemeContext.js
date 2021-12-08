import React from 'react';

import {DEFAULT_DARK_THEME, DEFAULT_DARK_THEME_ID} from 'src/theme/DarkTheme';

import {
  DEFAULT_LIGHT_THEME,
  DEFAULT_LIGHT_THEME_ID,
} from 'src/theme/LightTheme';

import createGlobalStyles from 'src/styles/GlobalStyles';

const Context = React.createContext({
  theme: DEFAULT_LIGHT_THEME,
  toggleTheme: () => {
    console.log('ThemeProvider is not rendered!');
  },
});

const ThemeProvider = React.memo(props => {
  const [theme, setTheme] = React.useState(props.initial);
  const ToggleThemeCallback = React.useCallback(() => {
    setTheme(currentTheme => {
      if (currentTheme.id === DEFAULT_LIGHT_THEME_ID) {
        return DEFAULT_DARK_THEME;
      }
      if (currentTheme.id === DEFAULT_DARK_THEME_ID) {
        return DEFAULT_LIGHT_THEME;
      }
      return currentTheme;
    });
  }, []);

  const globalStyles = createGlobalStyles(theme);

  const MemoizedValue = React.useMemo(() => {
    const value = {
      theme,
      toggleTheme: ToggleThemeCallback,
      globalStyles: globalStyles,
    };
    return value;
  }, [theme, ToggleThemeCallback, globalStyles]);

  return (
    <Context.Provider value={MemoizedValue}>{props.children}</Context.Provider>
  );
});

const useTheme = () => {
  const context = React.useContext(Context);

  if (!context) {
    throw new Error('useTheme must be used within an ThemeContext');
  }

  return context;
};

export {ThemeProvider, useTheme};
