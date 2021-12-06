import React from 'react';
import {Button, Text, View} from 'react-native';

import {createStyles} from 'src/styles/styles';
import {useTheme} from 'src/contexts/ThemeContext';

export default Onboarding1Screen = ({navigation}) => {
  const {theme} = useTheme();
  const Styles = React.useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={Styles.container}>
      <Text>Onboarding Screen 1</Text>
      <Button
        title="Next"
        onPress={() => navigation.navigate('onboarding-2')}
      />
    </View>
  );
};
