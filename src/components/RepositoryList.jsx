import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import theme from '../theme';
import TextInput from './TextInput'
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  textInput: {
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    borderRadius: 5,
    flexGrow: 0,
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5
  }
});

/* 
const repositories = [
  {
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
  },
  {
    id: 'django.django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
  },
  {
    id: 'reduxjs.redux',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
  },
]; 
*/

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    return (
      <RepositoryListHeader
        onChangeText={this.props.onChangeText}
        selectedValue={this.props.selection}
        onValueChange={this.props.onValueChange}
      />
    )
  }

  render() {
    const repositoryNodes = this.props.repositories
      ? this.props.repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) =>
          <Pressable onPress={() => this.props.navigate(`/${item.id}`)}>
            <RepositoryItem item={item} />
          </Pressable>
        }
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        stickyHeaderIndices={[0]}
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryListHeader = ({ onChangeText, selectedValue, onValueChange }) => {
  return (
    <View style={{ backgroundColor: theme.colors.mainBackground }}>
      <TextInput
        style={styles.textInput}
        placeholder='Search...'
        onChangeText={(text) => onChangeText(text)}
      />
      <Picker
        style={{ marginLeft: 5 }}
        selectedValue={selectedValue}
        onValueChange={(itemValue) => onValueChange(itemValue)}
        prompt='Select an item...'
      >
        <Picker.Item label='Latest repositories' value='latest' />
        <Picker.Item label='Highest rated repositories' value='highest' />
        <Picker.Item label='Lowest rated repositories' value='lowest' />
      </Picker>
    </View>
  )
}

/**
 * Latest repositories - Default. Repository which has reviews and one of its
 * review is the oldest review of all reviews will be at the top.
 * orderBy: CREATED_AT, orderDirection: DESC
 * 
 * Highest rated repositories - Repository with biggest 'ratingAverage' will be at the top.
 * orderBy: RATING_AVERAGE, orderDirection: DESC
 * 
 * Lowest rated repositories - Repository with smallest 'ratingAverage' will be at the top.
 * orderBy: RATING_AVERAGE, orderDirection: ASC
 */

const RepositoryList = () => {
  const [selection, setSelection] = useState();
  const [keyword, setKeyword] = useState();
  const [debounceKeyword] = useDebounce(keyword, 500);

  const onValueChange = value => {
    setKeyword(undefined);
    setSelection(value);
  }
  const onChangeText = value => setKeyword(value);

  let filter = {};
  if (debounceKeyword) {
    filter = { searchKeyword: debounceKeyword };
  } else {
    if (selection) {
      if (selection === 'highest') filter = { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
      if (selection === 'lowest') filter = { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
    }
  }

  const { repositories, fetchMore } = useRepositories({
    first: 8,
    ...filter
  });

  const onEndReach = () => {
    // console.log('You have reached the end of the list');
    fetchMore();
  }

  return <RepositoryListContainer
    repositories={repositories}
    navigate={useNavigate()}
    onChangeText={onChangeText}
    selection={selection}
    onValueChange={onValueChange}
    onEndReach={onEndReach}
  />;
};

export default RepositoryList;