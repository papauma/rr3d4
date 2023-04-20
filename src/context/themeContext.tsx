import React, {createContext, useContext} from 'react';

interface ThemeProps {
  colors: any;
  fontFamily: any;
  drawables: any;
}

const colors = {
  light: require('@resources/themes/light').colors,
  dark: require('@resources/themes/dark').colors,
};

const drawables = {
  icons: require('@resources/drawables').drawables,
};

const fontFamily = 'Work Sans';

const ThemeContext = createContext();

export function ThemeProvider({children}) {

  const theme: ThemeProps = {
    //change
    colors:
      /* colorScheme === 'light' ? colors.light : colors.dark */ colors.light,
    fontFamily: fontFamily,
    drawables: drawables.icons,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
