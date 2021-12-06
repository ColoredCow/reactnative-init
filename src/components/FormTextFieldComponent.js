import React from 'react';
import {useFormContext, Controller} from 'react-hook-form';
import {TextInput, Text} from 'react-native';
import {useTheme} from 'src/contexts/ThemeContext';
import {createStyles} from 'src/styles/styles';

const FormTextField = props => {
  const {name, rules, ...restOfProps} = props;
  const {
    control,
    formState: {errors},
  } = useFormContext();

  const {theme} = useTheme();
  const Styles = React.useMemo(() => createStyles(theme), [theme]);

  return (
    <Controller
      control={control}
      rules={rules} //  Check all rules here https://react-hook-form.com/api/useform/register
      render={({field: {onChange, onBlur, value}}) => (
        <>
          <Text style={Styles.labelStyle}>{restOfProps.label}</Text>
          <TextInput
            // passing everything down to TextField
            // to be able to support all TextInput props
            {...restOfProps}
            style={Styles.input}
            errorText={errors[name]?.message}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
          {errors[name] && <Text>This is required.</Text>}
        </>
      )}
      name={name}
    />
  );
};
export default FormTextField;
