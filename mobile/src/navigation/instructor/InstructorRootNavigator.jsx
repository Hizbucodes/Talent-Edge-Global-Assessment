import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InstructorTabNavigator from "./InstructorTabNavigator";

const Stack = createNativeStackNavigator();

const InstructorRootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="instructorMain"
        component={InstructorTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default InstructorRootNavigator;
