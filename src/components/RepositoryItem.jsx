import { Image, StyleSheet, View } from "react-native"
import theme from "../theme"
import Text from "./Text"

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexGrow: 0
  },
  tag: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    flexGrow: 0,
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: 5
  },
  flex1: {
    flexDirection: "row",
    flexGrow: 0,
    justifyContent: "space-around"
  },
  flex2: {
    flexDirection: "column",
    flexGrow: 0
  },
  flex3: {
    flexGrow: 0,
    alignItems: "center",
    padding: 5
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 5
  }
})

const k = (count) => {
  return Math.abs(count) > 999
    ? Math.sign(count) * ((Math.abs(count) / 1000).toFixed(1)) + 'k'
    : Math.sign(count) * Math.abs(count)
}

const CountDisplay = ({ count, unit }) => {
  return (
    <View style={styles.flex3}>
      <Text fontWeight='bold'>{k(count)}</Text>
      <Text color='textSecondary'>{unit}</Text>
    </View>
  )
}

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.flex1}>
        <View style={{ flex: 1, padding: 5 }}>
          <Image style={styles.logo} source={{ uri: item.ownerAvatarUrl }} />
        </View>
        <View style={{ flex: 5, padding: 5 }}>
          <Text fontWeight='bold' fontSize='subheading' style={{ paddingBottom: 5 }}>{item.fullName}</Text>
          <Text color='textSecondary' style={{ paddingBottom: 5 }}>{item.description}</Text>
          <Text style={styles.tag}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.flex1}>
        <CountDisplay count={item.stargazersCount} unit='Stars' />
        <CountDisplay count={item.forksCount} unit='Forks' />
        <CountDisplay count={item.reviewCount} unit='Reviews' />
        <CountDisplay count={item.ratingAverage} unit='Rating' />
      </View>
    </View>
  )
}

export default RepositoryItem;