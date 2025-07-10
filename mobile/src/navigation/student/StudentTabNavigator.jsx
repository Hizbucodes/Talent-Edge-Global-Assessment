import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "../../constants/colors";
import ChatScreen from "../../screens/Student/ChatScreen";
import EnrolledCoursesScreen from "../../screens/Student/EnrolledCoursesScreen";
import StudentHomeScreen from "../../screens/Student/StudentHomeScreen";

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

      <Tab.Screen
        name="My Courses"
        component={EnrolledCoursesScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Ask AI" component={ChatScreen} />
    </Tab.Navigator>
  );
};

export default StudentTabNavigator;
