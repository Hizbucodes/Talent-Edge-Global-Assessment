import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { Colors } from "../../constants/colors";
import { logout } from "../../redux/slices/authSlice";
import { capitalize } from "../../utils/capitalizeFirstLetter";
import { deleteToken } from "../../utils/token";

const screenWidth = Dimensions.get("window").width;

const Header = ({ title }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await deleteToken();

      dispatch(logout());

      navigation.reset({
        index: 0,
        routes: [{ name: "studentMain" }],
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Hey, {capitalize(title)} 👋🏼</Text>
      <MaterialIcons
        name="logout"
        size={35}
        color={Colors.primary}
        onPress={handleLogout}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
    width: screenWidth - 60,
    alignSelf: "center",
    justifyContent: "space-between",
  },
  textTitle: {
    fontWeight: "bold",
    fontSize: 40,
  },
});
