import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "../../constants/colors";
import ChatScreen from "../../screens/Student/ChatScreen";
import EnrolledCoursesScreen from "../../screens/Student/EnrolledCoursesScreen";
import StudentHomeScreen from "../../screens/Student/StudentHomeScreen";
import StudentProfileScreen from "../../screens/Student/StudentProfileScreen";

const Tab = createBottomTabNavigator();

const StudentTabNavigator = () => {
  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ color, focused, size }) => {
      let iconName;
      switch (route.name) {
        case "Home":
          iconName = focused ? "home-sharp" : "home";
          break;
        case "My Courses":
          iconName = focused ? "book-sharp" : "book-sharp";
          break;
        case "Ask AI":
          iconName = focused ? "chatbox" : "chatbox";
          break;
        case "Profile":
          iconName = focused ? "person-sharp" : "person";
      }

      return <Ionicons name={iconName} color={color} size={size} />;
    },
    tabBarActiveTintColor: Colors.primary,
    tabBarInactiveTintColor: Colors.lightText,

    tabBarHideOnKeyboard: true,
    tabBarLabelStyle: {
      fontWeight: "bold",
    },
  });
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={StudentHomeScreen}
        options={{ headerShown: false }}
      />

      <Tab.Screen name="My Courses" component={EnrolledCoursesScreen} />
      <Tab.Screen name="Ask AI" component={ChatScreen} />
      <Tab.Screen name="Profile" component={StudentProfileScreen} />
    </Tab.Navigator>
  );
};

export default StudentTabNavigator;
