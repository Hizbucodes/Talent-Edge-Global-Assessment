import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateCourse } from "../../redux/thunks/instructorThunks";
import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import { Colors } from "../../constants/colors";
import { showToast } from "../../redux/slices/toastSlice";

const screenWidth = Dimensions.get("window").width;

const InstructorEditCourseScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const { myCourses, loading } = useSelector((state) => state.course);
  const { courseId } = route.params;

  const course = myCourses.find((c) => c._id === courseId);
  const { control, handleSubmit, setValue } = useForm();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
    });
  }, []);

  useEffect(() => {
    if (course) {
      setValue("title", course.title);
      setValue("description", course.description);
    }
  }, [course]);

  const onSubmit = async (formData) => {
    const result = await dispatch(
      updateCourse({ id: courseId, data: formData })
    );
    if (updateCourse.fulfilled.match(result)) {
      dispatch(
        showToast({
          title: "Updated",
          message: "Course updated successfully!",
          type: "success",
        })
      );
      navigation.goBack();
    } else {
      dispatch(
        showToast({
          title: "Error",
          message: result.payload || "Update failed",
          type: "error",
        })
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>Edit Your Course</Text>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabelText}>Course Title</Text>
              <Input control={control} name={"title"} />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabelText}>Description</Text>
              <Input control={control} name={"description"} />
            </View>

            <View style={styles.signInButtonContainer}>
              <Button
                title={"Edit Course"}
                onPress={handleSubmit(onSubmit)}
                loading={loading}
                disabled={loading}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default InstructorEditCourseScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  logo: {
    width: 150,
    height: 150,
    marginHorizontal: "auto",
  },
  contentContainer: {
    marginTop: 60,
    width: screenWidth - 60,
    margin: "auto",
  },
  headerContainer: {
    flexDirection: "column",
    rowGap: 10,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 30,
  },
  subHeading: {
    fontWeight: "500",
    color: Colors.lightText,
    fontSize: 15,
  },
  formContainer: {
    minHeight: 300,
    flexDirection: "column",
    rowGap: 30,
    marginTop: 60,
  },
  inputContainer: {
    flexDirection: "column",
    rowGap: 10,
  },
  inputLabelText: {
    fontWeight: "bold",
    color: Colors.labelText,
  },
  signInButtonContainer: {
    marginTop: 60,
  },
  alreadyHaveAnAccountContainer: {
    marginHorizontal: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  alreadyHaveAnAccountText: {
    color: Colors.black,
    fontWeight: "500",
  },
  alreadyHaveAnAccountTextLinkContainer: {
    borderBottomWidth: 1.2,
    borderBottomColor: Colors.linkText,
  },
  alreadyHaveAnAccountTextLink: {
    color: Colors.linkText,
  },
});
