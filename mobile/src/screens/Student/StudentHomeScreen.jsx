import { useEffect } from "react";
import { Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { showToast } from "../../redux/slices/toastSlice";

const StudentHomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      showToast({
        title: "Success",
        message: "Sweet! You're logged in and ready to roll",
        type: "success",
        duration: 4000,
        position: "top",
      })
    );
  }, [dispatch]);

  return (
    <View>
      <Text>StudentHomeScreen</Text>
    </View>
  );
};

export default StudentHomeScreen;
