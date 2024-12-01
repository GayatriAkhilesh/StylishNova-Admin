import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native"
import NavigationBack from "../../common/NavigationBack";

const Profile = () => {

    const navigation = useNavigation();

    useLayoutEffect(() => {
      navigation.setOptions({
        title: 'Profile',
        headerLeft: () => (
          <NavigationBack handleButtonPress={() => navigation.goBack()} />
        ),
      });
    }, [navigation]);

    return(
        <View>
            <Text> Profile</Text>
        </View>
    )
}

export default Profile;