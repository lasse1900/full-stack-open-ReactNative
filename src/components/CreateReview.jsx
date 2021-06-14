import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import { View, TouchableWithoutFeedback, StyleSheet, Alert } from 'react-native';
import Text from './Text';
import useCreateReview from '../hooks/useCreateReview';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 8,
    backgroundColor: '#e3e3e3'
  },
  button: {
    flexGrow: 0,
    borderRadius: 3,
    backgroundColor: '#798ef7',
    color: 'white',
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 3,
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
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: ''
};


const CreateReviewForm = ({ onSubmit }) => {

  return (
    <View style={styles.container}>
      <FormikTextInput style={styles.input} name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput style={styles.input} name="repositoryName" placeholder="Repository name" />
      <FormikTextInput style={styles.input} name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput style={styles.input} name="text" placeholder="Review" multiline={true} />
      <TouchableWithoutFeedback onPress={onSubmit} >
        <Text style={styles.button}>{'Create a review'}</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const validationSchema = yup.object().shape({
  ownerName: yup.string()
    .required('Repository owner username is a required')
    .lowercase()
    .trim(),
  repositoryName: yup.string()
    .required('Repository name is a required')
    .lowercase()
    .trim(),
  rating: yup
    .number().required('Rating is required')
    .typeError('Rating is a required number between 0 and 100')
    .min(0, 'Rating is a required number between 0 and 100')
    .max(100, 'Rating is a required number between 0 and 100'),
  text: yup
    .string()
    .max(500)
    .trim(),
});

export const CreateReviewFormContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema} >
      { ({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const CreateReview = () => {

  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      await createReview({ ownerName, repositoryName, rating, text });
    } catch (e) {
      console.log(e.message);
      const message = e.message;

      Alert.alert(
        "GraphQl error",
        `${message}`,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
  };

  return <CreateReviewFormContainer onSubmit={onSubmit} />;
};

export default CreateReview;