import React, { useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { fetchEnrolledStudents } from "../../redux/thunks/instructorThunks";
import { Colors } from "../../constants/colors";

const screenWidth = Dimensions.get("window").width;

const EnrolledStudentsScreen = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const route = useRoute();
  const { courseId } = route?.params;

  const { enrolledStudents, loading } = useSelector((state) => state.course);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchEnrolledStudents(courseId));
    }
  }, [courseId]);

  const renderHeader = () => (
    <View style={[styles.row, styles.headerRow]}>
      <Text style={[styles.cell, styles.headerText]}>#</Text>
      <Text style={[styles.cell, styles.headerText]}>Username</Text>
    </View>
  );

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{index + 1}</Text>
      <Text style={styles.cell}>{item.username}</Text>
    </View>
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
    });
  }, []);

  if (loading) {
    return (
      <View
        style={{
          backgroundColor: Colors.white,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enrolled Students</Text>

      {enrolledStudents?.length > 0 ? (
        <FlatList
          data={enrolledStudents}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          ListHeaderComponent={renderHeader}
        />
      ) : (
        <Text style={styles.noDataText}>No students enrolled yet.</Text>
      )}
    </View>
  );
};

export default EnrolledStudentsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.white,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.primary,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightText,
    paddingVertical: 10,
  },
  headerRow: {
    backgroundColor: Colors.secondary,
  },
  cell: {
    flex: 1,
    textAlign: "left",
    paddingHorizontal: 5,
    fontSize: 14,
  },
  headerText: {
    fontWeight: "bold",
    color: Colors.primary,
  },
  noDataText: {
    color: Colors.labelText,
    marginTop: 20,
    textAlign: "center",
    fontSize: 20,
  },
});
