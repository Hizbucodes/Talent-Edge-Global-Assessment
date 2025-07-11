import { useEffect } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../redux/slices/toastSlice";
import Header from "../../components/Header/Header";
import { Colors } from "../../constants/colors";
import Octicons from "@expo/vector-icons/Octicons";
import { fetchAllCourses } from "../../redux/thunks/studentThunks";
import { useNavigation } from "@react-navigation/native";
import { fetchInstructorCourses } from "../../redux/thunks/instructorThunks";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const InstructorMyCoursesScreen = () => {
  const { user } = useSelector((state) => state.auth);
  const { myCourses } = useSelector((state) => state.course);
  const navigation = useNavigation();

  const username = user.username;

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

  useEffect(() => {
    dispatch(fetchInstructorCourses());
  }, []);

  const renderAllCourses = ({ item }) => {
    console.log(item?._id);
    return (
      <TouchableOpacity
        style={styles.courseTileContainer}
        onPress={() =>
          navigation.navigate("instructorCourseDetail", { courseId: item?._id })
        }
      >
        <View style={styles.instructorContainer}>
          <Octicons name="organization" size={20} color="black" />
          <Text style={styles.courseTileInstructor}>{username}</Text>
        </View>
        <Text style={styles.courseTileTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header title={username} />

      <View style={styles.courseListViewContainer}>
        <Text style={styles.allCoursesTitleText}>My Courses</Text>

        <FlatList
          data={myCourses}
          renderItem={renderAllCourses}
          keyExtractor={(item) => item._id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 250 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 80,
    backgroundColor: Colors.white,
    minHeight: screenHeight,
  },
  courseListViewContainer: {
    marginTop: 60,
    width: screenWidth - 60,
    alignSelf: "center",
    rowGap: 30,
  },
  allCoursesTitleText: {
    fontWeight: "500",
    fontSize: 20,
    color: Colors.primary,
  },
  courseTileContainer: {
    marginVertical: 8,
    backgroundColor: Colors.white,
    borderRadius: 10,
    flexDirection: "column",
    height: 100,
    borderWidth: 1,
    borderColor: Colors.lightText,
    padding: 10,
    rowGap: 15,
  },
  courseTileInstructor: {
    fontWeight: "500",
    fontSize: 15,
    letterSpacing: 0.8,
    color: Colors.labelText,
  },
  courseTileTitle: {
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 0.5,
  },
  instructorContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
});

export default InstructorMyCoursesScreen;
