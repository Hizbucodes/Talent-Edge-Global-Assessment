import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../constants/colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FontAwesome5 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  enrollInCourse,
  fetchEnrolledCourses,
} from "../../redux/thunks/studentThunks";
import { showToast } from "../../redux/slices/toastSlice";

const screenWidth = Dimensions.get("window").width;

const StudentCourseDetailScreen = () => {
  const route = useRoute();

  const { allCourses } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.auth);

  const courseDetail = allCourses.find(
    (item) => item?._id === route?.params?.courseId
  );

  const alreadyEnrolled = courseDetail?.enrolledStudents?.some(
    (idOrObj) =>
      (typeof idOrObj === "string" && idOrObj === user._id) ||
      idOrObj._id === user._id
  );

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const enrolledStudentsText =
    courseDetail.enrolledStudents.length > 0
      ? "Already Enrolled"
      : "No one's enrolled yet, Claim the first spot! 🚀";

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
    });
  }, []);

  const handleEnrollClick = async (id) => {
    try {
      const resultAction = await dispatch(enrollInCourse(id));

      if (enrollInCourse.fulfilled.match(resultAction)) {
        dispatch(
          showToast({
            title: "Success",
            message:
              "Enrollment complete! Get ready for an exciting learning journey.",
            type: "success",
            duration: 4000,
            position: "top",
          })
        );
        dispatch(fetchEnrolledCourses());
      } else {
        dispatch(
          showToast({
            title: "Error we",
            message:
              resultAction.payload || "Failed to enroll. Please try again.",
            type: "error",
            duration: 4000,
            position: "top",
          })
        );
      }
    } catch (error) {
      dispatch(
        showToast({
          title: "Error",
          message: error.message || "Something went wrong. Please try again.",
          type: "error",
          duration: 4000,
          position: "top",
        })
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.instructorCourseDetailContainer}>
        <View style={styles.iconContainer}>
          <FontAwesome name="book" size={80} color={Colors.primary} />
        </View>
        <View style={styles.detailsTextContainer}>
          <Text style={styles.courseTitle}>{courseDetail?.title}</Text>
          <Text style={styles.courseDescription}>
            {courseDetail?.description}
          </Text>
          <View style={styles.courseInstructorUsernameContainer}>
            <FontAwesome5 name="user" size={20} color={Colors.primary} />
            <Text style={styles.courseInstructorUsername}>
              {courseDetail?.instructor?.username}
            </Text>
          </View>
        </View>

        <View style={styles.buttonWithEnrolledStudentsContainer}>
          <TouchableOpacity
            style={[
              styles.enrollNowButton,
              { opacity: alreadyEnrolled ? 0.8 : 1 },
            ]}
            onPress={() => handleEnrollClick(courseDetail?._id)}
            disabled={alreadyEnrolled}
          >
            <Text style={styles.enrollNowText}>
              {alreadyEnrolled
                ? "✅ You're already enrolled"
                : "Enroll for Free"}
            </Text>
          </TouchableOpacity>

          <View style={styles.studentEnrolledTextContainer}>
            <Text style={styles.enrolledStudentLengthValue}>
              {courseDetail?.enrolledStudents.length > 0
                ? courseDetail?.enrolledStudents.length
                : ""}
            </Text>
            <Text style={styles.enrolledStudentLengthText}>
              {enrolledStudentsText}
            </Text>
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

export default StudentCourseDetailScreen;

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
});
