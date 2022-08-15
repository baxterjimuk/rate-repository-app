import { View } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";

const AppBarTab = ({ text, path }) => {
    return <View style={{ padding: 5 }}>
        <Link to={path}>
            <Text fontWeight="bold" fontSize="subheading" color="white">{text}</Text>
        </Link>
    </View>
}

export default AppBarTab;