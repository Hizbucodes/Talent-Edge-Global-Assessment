import { useFieldArray, useForm } from "react-hook-form";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Form/Button";
import Input from "../../components/Form/Input";
import { Colors } from "../../constants/colors";
import { COURSE_VALIDATION_RULES } from "../../constants/validationRules";
import { showToast } from "../../redux/slices/toastSlice";
import { createCourse } from "../../redux/thunks/instructorThunks";

const screenWidth = Dimensions.get("window").width;

const InstructorCreateCourseScreen = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.course);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      content: [{ order: 1, title: "", description: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "content",
  });

  const onSubmit = async (formData) => {
    const res = await dispatch(createCourse(formData));
    if (createCourse.fulfilled.match(res)) {
      dispatch(
        showToast({
          title: "Success",
          message: "Course created successfully",
          type: "success",
        })
      );
      reset();
    } else {
      dispatch(
        showToast({
          title: "Error",
          message: res.payload || "Course creation failed",
          type: "error",
        })
      );
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Create Course</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabelText}>Course Title</Text>
          <Input
            control={control}
            name={"title"}
            placeholder="Enter Course Title"
            rules={COURSE_VALIDATION_RULES}
            watch={watch}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabelText}>Description</Text>
          <Input
            control={control}
            name={"description"}
            placeholder="Enter Course Description"
            rules={COURSE_VALIDATION_RULES}
            watch={watch}
          />
        </View>

        <Text style={styles.inputLabelText}>Course Content</Text>
        {fields.map((item, index) => (
          <View key={item.id} style={styles.contentBlock}>
            <View style={styles.contentInputContainer}>
              <Text style={styles.contentLabelText}>Content Title</Text>

              <Input
                name={`content.${index}.title`}
                placeholder="Enter the Chapter Title"
                control={control}
                rules={COURSE_VALIDATION_RULES}
                watch={watch}
              />
            </View>

            <View style={styles.contentInputContainer}>
              <Text style={styles.contentLabelText}>Content Description</Text>
              <Input
                name={`content.${index}.description`}
                placeholder="Enter the Chapter Description"
                control={control}
                multiline
                inputStyle={{ height: 150 }}
                rules={COURSE_VALIDATION_RULES}
                watch={watch}
              />
            </View>

            {fields.length > 1 && (
              <TouchableOpacity onPress={() => remove(index)}>
                <Text style={styles.removeButton}>Remove Chapter</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        <TouchableOpacity
          onPress={() =>
            append({ order: fields.length + 1, title: "", description: "" })
          }
        >
          <Text style={styles.addMore}>+ Add Chapter</Text>
        </TouchableOpacity>

        <View style={styles.signInButtonContainer}>
          <Button
            title={"Add Course"}
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            disabled={!isValid}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default InstructorCreateCourseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerContainer: {
    marginTop: 60,
    width: screenWidth - 60,
    margin: "auto",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 30,
    color: Colors.primary,
  },
  formContainer: {
    minHeight: 300,
    flexDirection: "column",
    rowGap: 30,
    marginTop: 60,
    width: screenWidth - 60,
    alignSelf: "center",
    paddingBottom: 60,
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
  contentBlock: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.lightText,
    borderRadius: 10,
    rowGap: 25,
  },
  addMore: {
    color: Colors.linkText,
    textAlign: "right",
    marginBottom: 20,
    fontWeight: "bold",
  },
  removeButton: {
    color: "red",
    textAlign: "right",
    fontWeight: "500",
    marginTop: 5,
  },
  contentLabelText: {
    letterSpacing: 0.8,
  },
  contentInputContainer: {
    rowGap: 8,
  },
});
