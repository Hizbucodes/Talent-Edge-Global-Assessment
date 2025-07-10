import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
    </Stack.Navigator>
  );
};

export default StudentRootNavigator;
