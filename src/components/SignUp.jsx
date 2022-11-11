import { Pressable, StyleSheet, View } from "react-native";
import * as yup from 'yup';
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import Text from "./Text";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";
import { Formik } from "formik";
import useSignIn from "../hooks/useSignIn";

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexGrow: 0
  },
  signUpBtn: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    flexGrow: 0,
    borderRadius: 2,
    textAlign: 'center',
    padding: 10,
    margin: 10,
    fontWeight: 'bold'
  },
  textInput: {
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    borderRadius: 2,
    flexGrow: 0,
    paddingLeft: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
    marginTop: 10
  }
})

const initialValues = {
  username: '',
  password: '',
  confirmPassword: ''
}

const validationSchema = yup.object().shape({
  username: yup.string()
    .required('Username is required')
    .min(1, 'Username must be 1 to 30 character in length')
    .max(30, 'Username must be 1 to 30 characters in length'),
  password: yup.string()
    .required('Password is required')
    .min(5, 'Username must be 5 to 50 character in length')
    .max(50, 'Username must be 5 to 50 characters in length'),
  confirmPassword: yup.string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
})

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput style={styles.textInput} name='username' placeholder='Username' />
      <FormikTextInput style={styles.textInput} name='password' placeholder='Password' secureTextEntry />
      <FormikTextInput
        style={styles.textInput}
        name='confirmPassword'
        placeholder='Password confirmation'
        secureTextEntry
      />
      <Pressable onPress={onSubmit}>
        <Text style={styles.signUpBtn}>Sign in</Text>
      </Pressable>
    </View>
  )
}

const SignUp = () => {
  const navigate = useNavigate();
  const [signIn] = useSignIn();
  const [mutate, { loading, error }] = useMutation(CREATE_USER);
  const onSubmit = async ({ username, password }) => {
    const user = { username, password };
    await mutate({ variables: { user } });
    if (!loading && !error) {
      await signIn({ username, password });
      navigate('/');
    }
  }
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default SignUp;