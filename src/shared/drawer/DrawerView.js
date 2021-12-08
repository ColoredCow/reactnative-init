import * as React from 'react';
import {View, Image, Text, StyleSheet, Pressable} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {useTheme} from 'src/contexts/ThemeContext';
import {PrimaryButton} from 'src/components/ButtonComponents';
import {useAuth} from 'src/contexts/AuthContext';

const renderHeader = () => {
  return (
    <View>
      <View
        style={{
          height: 150,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('src/shared/assets/images/logo-horizontal.png')}
          style={{width: '90%', height: 100, resizeMode: 'contain'}}
        />
      </View>
    </View>
  );
};

const renderFooter = auth => {
  return (
    <View>
      <PrimaryButton title="Log out" onPress={() => auth.signOut()} />
    </View>
  );
};

const CustomDrawerContent = props => {
  const auth = useAuth();
  const {theme, toggleTheme} = useTheme();

  const styles = createComponentStyles(theme);
  return (
    <DrawerContentScrollView {...props}>
      {renderHeader()}
      <DrawerItemList {...props} />
      <DrawerItem label="Toggle Theme" onPress={() => toggleTheme()} />
      {renderFooter(auth)}
    </DrawerContentScrollView>
  );
};

const createComponentStyles = theme => {
  return StyleSheet.create({
    buttonContainer: {
      width: '100%',
    },

    primaryButton: {
      color: theme.colors.buttonText,
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.default,
      padding: theme.spacing.default,
      marginHorizontal: '10%',
    },

    primaryButtonText: {
      alignSelf: 'center',
      color: theme.colors.buttonText,
      fontSize: theme.fontSize.default,
    },
  });
};

export default CustomDrawerContent;
