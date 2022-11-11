import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
import { ME } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    paddingLeft: 5,
    paddingBottom: 5
    // ...
  },
  // ...
});

const AppBar = () => {
  const { data } = useQuery(ME);
  const currentUser = data?.me;

  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate('/');
  }

  return <View style={styles.container}>
    <ScrollView horizontal style={{ flexDirection: 'row' }}>
      <AppBarTab text='Repositories' path='/' />
      {!currentUser && <AppBarTab text='Sign in' path='/signin' />}
      {!currentUser && <AppBarTab text='Sign up' path='/signup' />}
      {currentUser && <AppBarTab text='Create a Review' path='/review' />}
      {currentUser && <AppBarTab text='My reviews' path='/myreviews' />}
      {currentUser && <AppBarTab text='Sign out' onPress={signOut} />}
    </ScrollView>
  </View>;
};

export default AppBar;