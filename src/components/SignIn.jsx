import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Pressable, StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexGrow: 0,
  },
  signInBtn: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    flexGrow: 0,
    borderRadius: 2,
    textAlign: 'center',
    padding: 10,
    margin: 10
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
  // username: 'kalle',
  // password: 'password'
  username: '',
  password: ''
}

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
})

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput style={styles.textInput} name='username' placeholder='Username' />
      <FormikTextInput style={styles.textInput} name='password' placeholder='Password' secureTextEntry />
      <Pressable onPress={onSubmit}>
        <Text style={styles.signInBtn}>Sign in</Text>
      </Pressable>
    </View>
  )
}

export const SignInContainer = ({ signIn }) => {
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    await signIn({ username, password });
    navigate('/', { replace: true });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
}

const SignIn = () => {
  const [signIn] = useSignIn();

  return <SignInContainer signIn={signIn} />;
};

export default SignIn;