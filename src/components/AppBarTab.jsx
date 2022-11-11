import { Pressable, View } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";

const AppBarTab = ({ text, path, onPress }) => {
    return <View style={{ padding: 5 }}>
        {path ? (
            <Link to={path}>
                <Text fontWeight="bold" fontSize="subheading" color="white">{text}</Text>
            </Link>
        ) : (
            <Pressable onPress={onPress}>
                <Text fontWeight="bold" fontSize="subheading" color="white">{text}</Text>
            </Pressable>
        )}
    </View>
}

export default AppBarTab;