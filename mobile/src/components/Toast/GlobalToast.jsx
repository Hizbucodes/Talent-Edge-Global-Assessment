import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useEffect } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../../redux/slices/toastSlice";

const GlobalToast = () => {
  const dispatch = useDispatch();
  const { visible, message, title, type, duration } = useSelector(
    (state) => state.toast
  );

  const translateY = React.useRef(new Animated.Value(-100)).current;

  const handleClose = () => {
    dispatch(hideToast());
  };

  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[styles.container, styles.top, { transform: [{ translateY }] }]}
      pointerEvents="box-none"
    >
      <View
        style={[
          styles.toast,
          { backgroundColor: type === "success" ? "#388E3C" : "#D32F2F" },
        ]}
      >
        {type === "success" ? (
          <MaterialIcons
            name="check-circle"
            size={24}
            color="#fff"
            style={styles.icon}
          />
        ) : (
          <MaterialIcons
            name="error"
            size={24}
            color="#fff"
            style={styles.icon}
          />
        )}
        <View style={styles.textContainer}>
          {title ? <Text style={styles.title}>{title}</Text> : null}
          <Text style={styles.message}>{message}</Text>
        </View>
        <TouchableOpacity
          onPress={handleClose}
          style={styles.closeButton}
          accessibilityLabel="Close success message"
        >
          <MaterialIcons name="close" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 9999,
    paddingHorizontal: 20,
  },
  top: {
    top: 40,
  },
  bottom: {
    bottom: 40,
  },
  toast: {
    flexDirection: "row",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 2,
  },
  message: {
    color: "#fff",
    fontSize: 14,
  },
  closeButton: {
    marginLeft: 10,
    padding: 4,
  },
});

export default GlobalToast;
