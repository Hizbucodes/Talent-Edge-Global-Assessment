import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Form/Button";
import Input from "../components/Form/Input";
import { Colors } from "../constants/colors";
import { VALIDATION_RULES } from "../constants/validationRules";
import { showToast } from "../redux/slices/toastSlice";
import { loginUser } from "../redux/thunks/authThunks";

const screenWidth = Dimensions.get("window").width;

const LoginScreen = () => {
  const { loading } = useSelector((state) => state.auth);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const submitFormHandler = async (data) => {
    try {
      const res = await dispatch(loginUser(data)).unwrap();

      if (res.user.role === "student") {
        navigation.replace("studentMain");
      }
      if (res.user.role === "instructor") {
        navigation.replace("instructorMain");
      }
    } catch (error) {
      dispatch(
        showToast({
          title: "Error",
          message: error || "Something went wrong",
          type: "error",
          duration: 4000,
          position: "top",
        })
      );
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Image
            source={require("../../assets/icons/TalentEdge-Logo.png")}
            style={styles.logo}
          />
          <Text style={styles.heading}>Welcome back,</Text>
          <Text style={styles.subHeading}>We are happy to see you again.</Text>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabelText}>Username</Text>
              <Input
                control={control}
                watch={watch}
                name={"username"}
                placeholder="Enter Your Username"
                rules={VALIDATION_RULES.username}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabelText}>Password</Text>
              <Input
                control={control}
                watch={watch}
                name={"password"}
                placeholder="Enter Your Password"
                secureTextEntry={true}
                rules={VALIDATION_RULES.password}
              />
            </View>

            <View style={styles.signInButtonContainer}>
              <Button
                title={"Sign In"}
                onPress={handleSubmit(submitFormHandler)}
                loading={loading}
                disabled={loading}
              />
            </View>

            <View style={styles.alreadyHaveAnAccountContainer}>
              <Text style={styles.alreadyHaveAnAccountText}>
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity
                style={styles.alreadyHaveAnAccountTextLinkContainer}
                onPress={() => navigation.navigate("register")}
              >
                <Text style={styles.alreadyHaveAnAccountTextLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

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
