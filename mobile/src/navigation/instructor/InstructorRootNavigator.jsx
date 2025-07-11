import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InstructorTabNavigator from "./InstructorTabNavigator";
import InstructorCourseDetailScreen from "../../screens/Instructor/InstructorCourseDetailScreen";
import InstructorEditCourseScreen from "../../screens/Instructor/InstructorEditCourseScreen";
import EnrolledStudentsScreen from "../../screens/Instructor/EnrolledStudentsScreen";

const Stack = createNativeStackNavigator();

const InstructorRootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="instructorMain"
        component={InstructorTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="instructorCourseDetail"
        component={InstructorCourseDetailScreen}
        options={{ headerBackTitle: "Back" }}
      />

      <Stack.Screen
        name="editCourse"
        component={InstructorEditCourseScreen}
        options={{ headerBackTitle: "Back" }}
      />

      <Stack.Screen
        name="enrolledStudents"
        component={EnrolledStudentsScreen}
        options={{ headerBackTitle: "Back" }}
      />
    </Stack.Navigator>
  );
};

export default InstructorRootNavigator;
