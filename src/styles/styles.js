import {StyleSheet} from 'react-native';

export const createStyles = theme => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },

    input: {
      width: '80%',
      height: 50,
      fontSize: 20,
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 10,
      marginVertical: 10,
    },

    labelStyle: {
      fontSize: 20,
      alignSelf: 'flex-start',
      marginLeft: 40,
    },
  });
};
