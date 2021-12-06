import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import {useTheme} from 'src/contexts/ThemeContext';

export const PrimaryButton = props => {
  const {theme} = useTheme();
  const styles = createComponentStyles(theme);
  return (
    <View style={[styles.buttonContainer, props.buttonViewStyles]}>
      <Pressable {...props} style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>{props.title}</Text>
      </Pressable>
    </View>
  );
};

const createComponentStyles = theme => {
  console.log(theme.colors);
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
