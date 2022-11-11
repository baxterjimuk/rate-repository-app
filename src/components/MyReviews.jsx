import Text from "./Text";
import theme from "../theme";
import { View, StyleSheet, FlatList, Alert, Pressable } from "react-native";
import { format } from "date-fns";
import { useMutation, useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";
import { useNavigate } from "react-router-native";
import { DELETE_REVIEW } from "../graphql/mutations";

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
  },
  viewRepositoryBtn: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    flexGrow: 0,
    borderRadius: 2,
    textAlign: 'center',
    fontWeight: 'bold',
    minWidth: "48%",
    padding: 10,
    margin: 10
  },
  deleteReviewBtn: {
    backgroundColor: theme.colors.secondary,
    color: 'white',
    flexGrow: 0,
    borderRadius: 2,
    textAlign: 'center',
    fontWeight: 'bold',
    minWidth: "48%",
    padding: 10,
    margin: 10
  }
})

const ItemSeparator = () => <View style={styles.separator} />;

// const deleteReviewAlert = ({ id, refetch }) => {
//   const [deleteReview] = useMutation(DELETE_REVIEW, {
//     variables: { deleteReviewId: id }
//   });
//   Alert.alert(
//     "Delete review",
//     "Are you sure you want to delete this review?",
//     [
//       {
//         text: "CANCEL"
//       },
//       {
//         text: "DELETE",
//         onPress: async () => {
//           await deleteReview();
//           refetch();
//         }
//       }
//     ]
//   )
// }

const ReviewItem = ({ review, refetch }) => {
  // Single review item
  const navigate = useNavigate();
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    variables: { deleteReviewId: review.id }
  });

  return (
    <View style={styles.container}>
      <View style={styles.flex1}>
        <View style={{ flex: 1, padding: 5, alignItems: 'center' }}>
          <Text color='primary' fontWeight='bold' style={styles.rating}>{review.rating}</Text>
        </View>
        <View style={{ flex: 5, padding: 5 }}>
          <Text fontWeight='bold' fontSize='subheading'>{review.repository.fullName}</Text>
          <Text color='textSecondary'>{format(new Date(review.createdAt), 'dd/MM/yyyy')}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      <View style={{ marginHorizontal: 10, ...styles.flex1 }}>
        <Pressable onPress={() => navigate(`/${review.repository.id}`)}>
          <Text style={styles.viewRepositoryBtn}>View repository</Text>
        </Pressable>
        <Pressable onPress={() =>
          Alert.alert(
            "Delete review",
            "Are you sure you want to delete this review?",
            [
              {
                text: "CANCEL"
              },
              {
                text: "DELETE",
                onPress: async () => {
                  await deleteReview();
                  refetch();
                }
              }
            ]
          )
        }>
          <Text style={styles.deleteReviewBtn}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  )
};

const MyReviews = () => {
  const { data, refetch } = useQuery(ME, {
    variables: { includeReviews: true }
  });

  const reviews = data?.me.reviews
    ? data?.me.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
}

export default MyReviews;