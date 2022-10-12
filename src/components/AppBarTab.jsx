import { Pressable, View } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";

const AppBarTab = ({ text, path, onPress }) => {
    return <View style={{ padding: 5 }}>
        <Pressable onPress={onPress}>
            <Link to={path}>
                <Text fontWeight="bold" fontSize="subheading" color="white">{text}</Text>
            </Link>
        </Pressable>
    </View>
}

export default AppBarTab;