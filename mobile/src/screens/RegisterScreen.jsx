import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../constants/colors";
import Input from "../components/Form/Input";
import { Controller, useForm } from "react-hook-form";
import Button from "../components/Form/Button";
import CheckBox from "../components/Form/CheckBox";
import { VALIDATION_RULES } from "../constants/validationRules";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

const RegisterScreen = () => {
  const navigation = useNavigation();

  const roles = [
    { label: "Student", value: "student" },
    { label: "Instructor", value: "instructor" },
  ];

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
      role: "",
      password: "",
      confirmPassword: "",
    },
  });

  const currentPassword = watch("password", "");

  const submitFormHandler = (data) => {
    console.log(data);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Image
            source={require("../../assets/icons/TalentEdge-Logo.png")}
            style={styles.logo}
          />
          <Text style={styles.heading}>Create an account</Text>
          <Text style={styles.subHeading}>
            Create your account, it takes less than a minute.
          </Text>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabelText}>
                Username <Text style={styles.requiredAsterisk}>*</Text>
              </Text>
              <Input
                control={control}
                watch={watch}
                name={"username"}
                placeholder="Enter Your Username"
                rules={VALIDATION_RULES.username}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabelText}>
                Password <Text style={styles.requiredAsterisk}>*</Text>
              </Text>
              <Input
                control={control}
                watch={watch}
                name={"password"}
                placeholder="Enter Your Password"
                secureTextEntry={true}
                rules={VALIDATION_RULES.password}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabelText}>
                Confirm Password <Text style={styles.requiredAsterisk}>*</Text>
              </Text>
              <Input
                control={control}
                watch={watch}
                name={"confirmPassword"}
                placeholder="Enter Confirm Password"
                secureTextEntry={true}
                rules={VALIDATION_RULES.confirmPasswordValidator(
                  currentPassword
                )}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabelText}>
                Who you are? <Text style={styles.requiredAsterisk}>*</Text>
              </Text>
              <Controller
                control={control}
                name="role"
                rules={{ required: "You must select a role" }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    {roles.map(({ label, value: roleValue }) => (
                      <CheckBox
                        key={roleValue}
                        checked={value === roleValue}
                        onPress={() => onChange(roleValue)}
                        labelComponent={
                          <Text style={styles.checkBoxTitleText}>{label}</Text>
                        }
                        error={error}
                      />
                    ))}
                    {error && (
                      <Text style={styles.errorText}>{error.message}</Text>
                    )}
                  </>
                )}
              />
            </View>

            <View style={styles.signInButtonContainer}>
              <Button
                title={"Sign In"}
                onPress={handleSubmit(submitFormHandler)}
                disabled={!isValid}
              />
            </View>

            <View style={styles.alreadyHaveAnAccountContainer}>
              <Text style={styles.alreadyHaveAnAccountText}>
                Already have an account?{" "}
              </Text>
              <TouchableOpacity
                style={styles.alreadyHaveAnAccountTextLinkContainer}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.alreadyHaveAnAccountTextLink}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

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
    marginVertical: 60,
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
  checkBoxTitleText: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.primary,
  },
  requiredAsterisk: {
    color: Colors.requiredAsterisk,
  },
  errorText: {
    color: Colors.errorColor,
    fontSize: 12,
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
