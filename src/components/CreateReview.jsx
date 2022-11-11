import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import { Pressable, StyleSheet, View } from "react-native";
import * as yup from "yup";
import theme from "../theme";
import Text from "./Text";
import { CREATE_REVIEW } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";
import { ME } from "../graphql/queries";

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexGrow: 0
  },
  createBtn: {
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
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: ''
  // ownerName: 'reduxjs',
  // repositoryName: 'redux',
  // rating: "48",
  // text: 'Implement citizen-media facilitate dynamic channels integrate action-items metrics bleeding-edge, whiteboard enterprise matrix B2B, sexy facilitate e-enable mashups expedite recontextualize. Synergize orchestrate infrastructures unleash proactive enable leverage strategize addelivery peer-to-peer schemas blogospheres widgets action-items benchmark cross-media innovate design podcasting, integrate engage. Leverage leverage revolutionize killer, eyeballs bricks-and-clicks.'
}

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number()
    .typeError('Please enter a number between 0 and 100')
    .required('Rating is required')
    .min(0, 'Rating must not be less than 0')
    .max(100, 'Rating must not be more than 100')
})

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        style={styles.textInput}
        name='ownerName'
        placeholder="Repository owner name"
      />
      <FormikTextInput
        style={styles.textInput}
        name='repositoryName'
        placeholder='Repository name'
      />
      <FormikTextInput
        style={styles.textInput}
        name='rating'
        placeholder='Rating between 0 and 100'
      />
      <FormikTextInput
        style={styles.textInput}
        textAlignVertical='top'
        multiline={true}
        name='text'
        placeholder='Review'
      />
      <Pressable onPress={onSubmit}>
        <Text style={styles.createBtn}>Create a review</Text>
      </Pressable>
    </View>
  )
}

const CreateReview = () => {
  const navigate = useNavigate();
  const [mutate] = useMutation(CREATE_REVIEW, {
    refetchQueries: [{
      query: ME,
      variables: { includeReviews: true }
    }]
  });
  const onSubmit = async ({ ownerName, repositoryName, rating, text }) => {
    const review = { ownerName, repositoryName, rating: Number(rating), text };
    const { data } = await mutate({ variables: { review } });
    navigate(`/${data.createReview.repositoryId}`);
  }
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default CreateReview;