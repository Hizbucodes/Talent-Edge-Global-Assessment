import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StudentCourseDetailScreen from "../../screens/Student/StudentCourseDetailScreen";
import StudentTabNavigator from "./StudentTabNavigator";

const Stack = createNativeStackNavigator();

const StudentRootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="studentMain"
        component={StudentTabNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="studentCourseDetail"
        component={StudentCourseDetailScreen}
        options={{
          headerBackTitle: "Back",
        }}
      />
    </Stack.Navigator>
  );
};

export default StudentRootNavigator;
