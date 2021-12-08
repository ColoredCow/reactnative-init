import React from 'react';
import {Text, View} from 'react-native';

import {createStyles} from 'src/styles/styles';
import {useAuth} from 'src/contexts/AuthContext';
import {useTheme} from 'src/contexts/ThemeContext';

const HomeScreen = () => {
  const auth = useAuth();
  const {theme} = useTheme();
  const Styles = React.useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={Styles.container}>
      <Text>HOME SCREEN</Text>
      <Text>{JSON.stringify(auth.authData.name)}</Text>
      <Text>Greens: {JSON.stringify(auth.authData.greens)}</Text>
    </View>
  );
};

export default HomeScreen;
