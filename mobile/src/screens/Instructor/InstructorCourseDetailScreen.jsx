import { Feather, FontAwesome5 } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../constants/colors";

const screenWidth = Dimensions.get("window").width;

const InstructorCourseDetailScreen = () => {
  const route = useRoute();

  const { myCourses } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.auth);

  const courseDetail = myCourses.find(
    (item) => item?._id === route?.params?.courseId
  );

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.instructorCourseDetailContainer}>
        <View style={styles.iconContainer}>
          <FontAwesome name="book" size={80} color={Colors.primary} />
          <TouchableOpacity
            style={styles.editCourseButton}
            onPress={() =>
              navigation.navigate("editCourse", { courseId: courseDetail?._id })
            }
          >
            <Text style={styles.editCourseText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detailsTextContainer}>
          <Text style={styles.courseTitle}>{courseDetail?.title}</Text>
          <Text style={styles.courseDescription}>
            {courseDetail?.description}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.courseInstructorUsernameContainer}>
              <FontAwesome5 name="user" size={20} color={Colors.primary} />
              <Text style={styles.courseInstructorUsername}>
                {user?.username}
              </Text>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: Colors.secondary,
                borderRadius: 8,
                width: 170,
                alignItems: "center",
                justifyContent: "center",
                height: 30,
                flexDirection: "row",
              }}
              onPress={() =>
                navigation.navigate("enrolledStudents", {
                  courseId: courseDetail?._id,
                })
              }
            >
              <Text style={{ fontWeight: "bold", color: Colors.primary }}>
                See Enrolled Students
              </Text>
              <Feather name="arrow-up-right" size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.courseContentHeaderContainer}>
        <Text style={styles.courseContentHeaderTitle}>Course Content</Text>
      </View>

      {courseDetail?.content?.map((contentItem, index) => (
        <View
          key={contentItem?._id?.toString() || index.toString()}
          style={styles.courseContentContainer}
        >
          <View style={styles.courseContentOrderContainer}>
            <Text style={styles.courseContentOrderText}>
              {contentItem?.order}
            </Text>
          </View>
          <View style={styles.courseContentDetailContainer}>
            <Text style={styles.courseContentTitleText}>
              {contentItem?.title}
            </Text>
            <Text style={styles.courseContentDescriptionText}>
              {contentItem?.description}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default InstructorCourseDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  instructorCourseDetailContainer: {
    flexDirection: "column",
    rowGap: 25,
  },
  iconContainer: {
    width: screenWidth - 60,
    alignSelf: "center",
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  courseTitle: {
    fontWeight: "bold",
    fontSize: 25,
    letterSpacing: 0.8,
  },
  detailsTextContainer: {
    width: screenWidth - 60,
    alignSelf: "center",
    rowGap: 20,
  },
  courseDescription: {
    fontSize: 18,
    fontWeight: "400",
    color: Colors.labelText,
  },
  courseInstructorUsername: {
    fontWeight: "bold",
    fontSize: 16,
    color: Colors.labelText,
    letterSpacing: 0.8,
  },
  courseInstructorUsernameContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  buttonWithEnrolledStudentsContainer: {
    flexDirection: "column",
    rowGap: 5,
  },
  enrollNowButton: {
    backgroundColor: Colors.primary,
    width: screenWidth - 60,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    borderRadius: 10,
  },
  enrollNowText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.8,
  },
  studentEnrolledTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: screenWidth - 60,
    alignSelf: "center",
    columnGap: 10,
  },
  enrolledStudentLengthValue: {
    fontWeight: "bold",
    fontSize: 16,
    color: Colors.black,
  },

  enrolledStudentLengthText: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.black,
  },
  courseContentContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
    width: screenWidth - 60,
    alignSelf: "center",
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    height: 80,
    backgroundColor: Colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 20,
  },
  courseContentOrderContainer: {
    borderRadius: 50,
    backgroundColor: Colors.secondary,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  courseContentOrderText: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
  courseContentDetailContainer: {
    flexDirection: "column",
    rowGap: 8,
  },
  courseContentTitleText: {
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  courseContentDescriptionText: {
    fontSize: 15,
    letterSpacing: 0.3,
    fontWeight: "500",
    color: Colors.labelText,
  },
  courseContentHeaderContainer: {
    width: screenWidth - 60,
    alignSelf: "center",
    marginTop: 60,
  },
  courseContentHeaderTitle: {
    fontWeight: "bold",
    fontSize: 18,
    borderBottomWidth: 2,
    alignSelf: "flex-start",
    borderBottomColor: Colors.primary,
    color: Colors.primary,
  },
  editCourseButton: {
    backgroundColor: Colors.successColor,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 10,
  },
  editCourseText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.8,
  },
});
