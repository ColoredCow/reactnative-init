import 'react-native-gesture-handler';
import React from 'react';
import {Router} from 'src/routes/Router';
import {AuthProvider} from 'src/contexts/AuthContext';
import {Provider as ReduxProvider} from 'react-redux';
import ReduxStore from 'src/redux/Store';
import {DEFAULT_LIGHT_THEME} from 'src/theme/LightTheme';
import {ThemeProvider} from 'src/contexts/ThemeContext';

const App = () => {
  return (
    <ReduxProvider store={ReduxStore}>
      <ThemeProvider initial={DEFAULT_LIGHT_THEME}>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
};

export default App;
