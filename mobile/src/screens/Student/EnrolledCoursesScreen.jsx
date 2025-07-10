import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Octicons from "@expo/vector-icons/Octicons";
import { useEffect, useLayoutEffect } from "react";
import { fetchEnrolledCourses } from "../../redux/thunks/studentThunks";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const EnrolledCoursesScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { enrolledCourses, loading, error } = useSelector(
    (state) => state.course
  );

  useEffect(() => {
    dispatch(fetchEnrolledCourses());
  }, []);

  const renderEnrolledCourses = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.courseTileContainer}
        onPress={() =>
          navigation.navigate("studentCourseDetail", { courseId: item?._id })
        }
      >
        <View style={styles.instructorContainer}>
          <Octicons name="organization" size={20} color="black" />
          <Text style={styles.courseTileInstructor}>
            {item?.instructor?.username}
          </Text>
        </View>
        <Text style={styles.courseTileTitle}>{item?.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.courseListViewContainer}>
        <Text style={styles.allCoursesTitleText}>Enrolled Courses</Text>

        {loading ? (
          <ActivityIndicator size={"large"} style={{ marginTop: 300 }} />
        ) : enrolledCourses?.length > 0 ? (
          <FlatList
            data={enrolledCourses}
            renderItem={renderEnrolledCourses}
            keyExtractor={(item, index) =>
              item._id ? item._id.toString() : index.toString()
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 250 }}
            onRefresh={() => dispatch(fetchEnrolledCourses())}
            refreshing={loading}
          />
        ) : (
          <View
            style={{
              flexDirection: "column",
              rowGap: 15,
              alignItems: "center",
              justifyContent: "center",
              height: screenHeight - 500,
            }}
          >
            <Image
              source={require("../../../assets/images/EmptyListImage.png")}
              resizeMode="cover"
              style={{ width: 300, height: 300 }}
            />
            <Text style={{ fontWeight: "400", fontSize: 20 }}>
              Nothing here yet. Ready to find your next course?
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: Colors.linkText,
                  borderBottomWidth: 2,
                  borderColor: Colors.linkText,
                }}
              >
                See Available Courses
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default EnrolledCoursesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  headerTitleText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  courseListViewContainer: {
    marginTop: 60,
    width: screenWidth - 60,
    alignSelf: "center",
    rowGap: 30,
  },
  allCoursesTitleText: {
    fontWeight: "bold",
    fontSize: 30,
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
