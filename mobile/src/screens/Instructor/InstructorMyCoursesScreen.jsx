import { useEffect } from "react";
import { Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { showToast } from "../../redux/slices/toastSlice";

const InstructorMyCoursesScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      showToast({
        title: "Success",
        message: "Welcome back, Educator! Let's empower some minds today",
        type: "success",
        duration: 4000,
        position: "top",
      })
    );
  }, [dispatch]);
  return (
    <View>
      <Text>InstructorMyCoursesScreen</Text>
    </View>
  );
};

export default InstructorMyCoursesScreen;
