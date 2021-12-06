import React from 'react';
import {Button, Text, View} from 'react-native';

import {createStyles} from 'src/styles/styles';
import {useTheme} from 'src/contexts/ThemeContext';
import {useAuth} from 'src/contexts/AuthContext';

export default Onboarding1Screen = ({navigation}) => {
  const {theme} = useTheme();
  const {firstTimeAppCompleted} = useAuth();
  const Styles = React.useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={Styles.container}>
      <Text>Onboarding Screen 3</Text>
      <Button title="Next" onPress={() => firstTimeAppCompleted()} />
    </View>
  );
};
