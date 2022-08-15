import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';

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
  return <View style={styles.container}>
    <ScrollView horizontal style={{ flexDirection: 'row' }}>
      <AppBarTab text='Repositories' path='/' />
      <AppBarTab text='Sign in' path='/signin' />
    </ScrollView>
  </View>;
};

export default AppBar;