import React from 'react';

import Text from './Text';
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import theme from "../theme";
import FormikTextInput from "./FormikTextInput";
import { Formik } from 'formik';
import * as yup from 'yup';
import useSignIn from "../hooks/useSignIn";

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 15,
    backgroundColor: '#e3e3e3'
  },
  textInput: {
    borderColor: theme.appBar.backgroundColor,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.body,
  },
  button: {
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
    color: 'white',
    padding: 16,
    textAlign: 'center',
  }
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must be at least 5 chars')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 chars')
    .required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        testID='username'
        name='username'
        placeholder='Username'
        style={styles.textInput}
      />
      <FormikTextInput
        testID='password'
        name='password'
        placeholder='Password'
        secureTextEntry={true}
        style={styles.textInput}
      />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text
          testID='SignInButton'
          fontSize='subHeading'
          fontWeight='bold'
          style={styles.button}
        > Sign in </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const onSubmit = async (values) => {
    const { username, password } = values;
    await signIn({ username, password });
  };
  return <SignInContainer onSubmit={onSubmit} />;
};

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;