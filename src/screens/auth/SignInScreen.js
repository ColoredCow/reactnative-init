import React, {useState} from 'react';
import {ActivityIndicator, Button, Text, View, TextInput} from 'react-native';

import {createStyles} from 'src/styles/styles';
import {useAuth} from 'src/contexts/AuthContext';
import {useTheme} from 'src/contexts/ThemeContext';
import {useForm, FormProvider} from 'react-hook-form';
import FormTextField from 'src/components/FormTextFieldComponent';
import {PrimaryButton} from 'src/components/ButtonComponents';

export const SignInScreen = () => {
  const [loading, isLoading] = useState(false);
  const auth = useAuth();
  const onSubmit = data => signIn(data);

  const signIn = async data => {
    isLoading(true);
    await auth.signIn(data);
  };

  const {theme} = useTheme();
  const Styles = React.useMemo(() => createStyles(theme), [theme]);
  const formMethods = useForm();

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
