import React from 'react';
import {Button, Text, View} from 'react-native';

import {createStyles} from 'src/styles/styles';
import {useAuth} from 'src/contexts/AuthContext';
import {useTheme} from 'src/contexts/ThemeContext';

export const HomeScreen = () => {
  const auth = useAuth();
  const signOut = () => {
    auth.signOut();
  };

  const {theme, toggleTheme} = useTheme();
  const Styles = React.useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={Styles.container}>
      <Text>HOME SCREEN</Text>
      <Text>{JSON.stringify(auth.authData)}</Text>
      <Button title="Sign Out" onPress={signOut} />
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
};
