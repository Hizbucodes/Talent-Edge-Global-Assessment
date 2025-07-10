import { useSelector } from "react-redux";
import StudentRootNavigator from "../navigation/student/StudentRootNavigator";
import AuthNavigator from "./auth/AuthNavigator";
import InstructorRootNavigator from "./instructor/InstructorRootNavigator";

const AppNavigator = () => {
  const { user, token } = useSelector((state) => state.auth);
  if (!user || !token) {
    return <AuthNavigator />;
  }

  if (user.role === "student") {
    return <StudentRootNavigator />;
  }

  if (user.role === "instructor") {
    return <InstructorRootNavigator />;
  }

  return null;
};

export default AppNavigator;
