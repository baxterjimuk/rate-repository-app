import { View, StyleSheet, FlatList } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { format } from "date-fns";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-native";
import { GET_REPOSITORY } from "../graphql/queries";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexGrow: 0
  },
  flex1: {
    flexDirection: "row",
    flexGrow: 0,
    justifyContent: "space-around"
  },
  separator: {
    height: 5,
  },
  rating: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    textAlign: 'center',
    textAlignVertical: 'center'
  }
})

const RepositoryInfo = ({ repository }) => {
  // Repository's information implemented in the previous exercise
  return (
    <View style={{ marginBottom: 5 }}>
      <RepositoryItem item={repository} />
    </View>
  )
};

const ReviewItem = ({ review }) => {
  // Single review item
  return (
    <View style={styles.container}>
      <View style={styles.flex1}>
        <View style={{ flex: 1, padding: 5, alignItems: 'center' }}>
          <Text color='primary' fontWeight='bold' style={styles.rating}>{review.rating}</Text>
        </View>
        <View style={{ flex: 5, padding: 5 }}>
          <Text fontWeight='bold' fontSize='subheading'>{review.user.username}</Text>
          <Text color='textSecondary'>{format(new Date(review.createdAt), 'dd/MM/yyyy')}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  )
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const { loading, error, data, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id, first: 2 },
    skip: !id,
    fetchPolicy: 'cache-and-network'
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if(!canFetchMore) return;

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        repositoryId: id,
        first: 2
      }
    })
  }

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error! {error.message}</Text>

  const reviews = data.repository.reviews
    ? data.repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={data.repository} />}
      ItemSeparatorComponent={ItemSeparator}
      stickyHeaderIndices={[0]}
      onEndReached={handleFetchMore()}
    />
  );
};

export default SingleRepository;