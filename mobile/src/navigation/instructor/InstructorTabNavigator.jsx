import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "../../constants/colors";
import InstructorCreateCourseScreen from "../../screens/Instructor/InstructorCreateCourseScreen";
import InstructorMyCoursesScreen from "../../screens/Instructor/InstructorMyCoursesScreen";

const Tab = createBottomTabNavigator();

const InstructorTabNavigator = () => {
  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ color, focused, size }) => {
      let iconName;
      switch (route.name) {
        case "My Courses":
          iconName = focused ? "bookmark" : "bookmark-outline";
          break;
        case "Add Course":
          iconName = focused ? "add-circle-sharp" : "add-circle-outline";
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
    <Tab.Navigator initialRouteName="My Courses" screenOptions={screenOptions}>
      <Tab.Screen
        name="My Courses"
        component={InstructorMyCoursesScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Add Course"
        component={InstructorCreateCourseScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default InstructorTabNavigator;
