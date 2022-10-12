import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
import { ME } from '../graphql/queries';
import { useQuery } from '@apollo/client';

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

const signOut = async () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  if (authStorage.getAccessToken()) {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  }
}

const AppBar = () => {
  const { data } = useQuery(ME);

  return <View style={styles.container}>
    <ScrollView horizontal style={{ flexDirection: 'row' }}>
      <AppBarTab text='Repositories' path='/' />
      {!data && <AppBarTab text='Sign in' path='/signin' />}
      {data && <AppBarTab text='Sign out' path='/' onPress={signOut}/>}
    </ScrollView>
  </View>;
};

export default AppBar;