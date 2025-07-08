import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";

const Button = ({
  title,
  backgroundColor = Colors.primary,
  onPress,
  textColor = Colors.white,
  loading,
  disabled,
  style,
  width,
  height,
}) => {
  const defaultHeight = 60;
  return (
    <Pressable
      onPress={onPress}
      disabled={loading || disabled}
      style={{
        width: width,
        height: height || defaultHeight,
        paddingVertical: 8,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        backgroundColor: backgroundColor,
        opacity: loading || disabled ? 0.5 : 1,
      }}
    >
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text
          style={{
            color: textColor,

            fontWeight: "600",
            fontSize: 20,
          }}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({});
