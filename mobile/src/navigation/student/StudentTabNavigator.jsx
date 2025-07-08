import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StudentHomeScreen from "../../screens/StudentHomeScreen";

const Tab = createBottomTabNavigator();

const StudentTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="studentHome" component={StudentHomeScreen} />
    </Tab.Navigator>
  );
};

export default StudentTabNavigator;
