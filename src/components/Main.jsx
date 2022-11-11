import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import theme from '../theme';

import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import SingleRepository from './SingleRepository';
import CreateReview from './CreateReview';
import SignUp from './SignUp';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/signin" element={<SignIn />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/:id" element={<SingleRepository />} exact />
        <Route path="/review" element={<CreateReview />} exact />
        <Route path="/signup" element={<SignUp />} exact />
        <Route path="/myreviews" element={<MyReviews />} exact />
      </Routes>
    </View>
  );
};

export default Main;