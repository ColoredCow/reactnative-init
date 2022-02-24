import React, {useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Text,
  View,
  Image,
  Pressable,
  Platform,
} from 'react-native';

import {createStyles} from 'src/styles/styles';
import {useAuth} from 'src/contexts/AuthContext';
import {useTheme} from 'src/contexts/ThemeContext';
import {useForm, FormProvider} from 'react-hook-form';
import FormTextField from 'src/components/FormTextFieldComponent';
import {PrimaryButton} from 'src/components/ButtonComponents';
import {appleAuth} from '@invertase/react-native-apple-authentication';

export const SignInScreen = () => {
  const [loading, isLoading] = useState(false);
  const auth = useAuth();
  const onSubmit = data => signIn(data);

  const signIn = async data => {
    isLoading(true);
    await auth.signIn(data);
  };

  const appleSignIn = async () => {
    await auth.appleSignIn();
  };

  // Include this function in your form component to
  // enable the apple login
  const appleLoginButton = () => {
    if (Platform.OS === 'android' || !appleAuth.isSupported) {
      return null;
    }

    return (
      <Pressable
        onPress={appleSignIn}
        style={[Styles.socialSignInBtn, {padding: 5}]}>
        <Image
          source={require('src/shared/assets/images/apple_logo_black.png')}
          style={Styles.socialSignInIcon}
          resizeMode="contain"
        />
      </Pressable>
    );
  };

  const {theme} = useTheme();
  const Styles = React.useMemo(() => createStyles(theme), [theme]);
  const formMethods = useForm();

  const platformOs = Platform.OS;

  return (
    <View style={Styles.container}>
      <FormProvider {...formMethods}>
        <FormTextField
          name="email"
          label="Your Email"
          rules={{
            required: true,
          }}
        />
        <FormTextField
          name="password"
          label="Your Password"
          secureTextEntry={true}
          rules={{
            required: true,
          }}
        />
        <PrimaryButton
          title="Sign In"
          onPress={formMethods.handleSubmit(onSubmit)}
        />
      </FormProvider>

      {loading && (
        <ActivityIndicator color={'#000'} animating={true} size="small" />
      )}
    </View>
  );
};
