import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import InstructorHomeScreen from "../../screens/InstructorHomeScreen";

const Tab = createBottomTabNavigator();

const InstructorTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="instructorHome" component={InstructorHomeScreen} />
    </Tab.Navigator>
  );
};

export default InstructorTabNavigator;
