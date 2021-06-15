import React from 'react';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Text from './Text';
import * as yup from 'yup';
import useSignUp from '../hooks/useSignUp';
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 8,
    backgroundColor: '#e3e3e3'
  },
  button: {
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
    color: 'white',
    padding: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10
  },
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput style={styles.input} name="username" placeholder="Username" />
      <FormikTextInput style={styles.input} name="password" placeholder="Password" secureTextEntry={true} />
      <FormikTextInput style={styles.input} name="passwordConfirmation" placeholder="Password confirmation" secureTextEntry={true} />
      <TouchableWithoutFeedback onPress={onSubmit} testID="submitButton">
        <Text style={styles.button}>{'Sign up'}</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup.string()
    .min(5, 'Username must be at least 5 chars')
    .required('Username is required'),
  password: yup.string()
    .min(5, 'Password must be at least 5 chars')
    .required('Password is required'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Password don\'t match')
    .required('Password confirmation is required'),
});


const SignUp = () => {
  const [signUp] = useSignUp();
  const onSubmit = async (values) => {
    // console.log(values);
    const { username, password } = values;
    try {
      await signUp({ username, password });
    } catch (e) {
      console.log(e);
    }
  };
  return <SignUpContainer onSubmit={onSubmit} />;
};

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema} >
      { ({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;