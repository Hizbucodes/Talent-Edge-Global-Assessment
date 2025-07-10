import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "../../constants/colors";

const CheckBox = ({
  checked,
  onPress,
  label,
  labelComponent,
  style,
  textStyle,
  size = 30,
  borderRadius = 50,
  borderColor = Colors.white,
  checkedBorderColor = Colors.white,
  checkedColor = Colors.primary,
  uncheckedColor = "#fff",
  spacing = 8,
  fontSize = 16,
  checkSize = 14,
  disabled = false,
  error,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          opacity: disabled ? 0.6 : 1,
          borderColor: error ? Colors.errorColor : null,
          borderWidth: error ? 1 : 0,
        },
        style,
      ]}
      onPress={disabled ? null : onPress}
      activeOpacity={0.7}
      accessible={true}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
    >
      <View
        style={[
          styles.checkbox,
          {
            width: size,
            height: size,
            borderRadius: borderRadius,
            borderColor: checked ? checkedBorderColor : borderColor,
            backgroundColor: checked ? checkedColor : uncheckedColor,
            borderWidth: checked ? 4 : 0,
          },
        ]}
      ></View>
      {labelComponent ? (
        labelComponent
      ) : label ? (
        <Text
          style={[
            {
              marginLeft: spacing,
              color: "#000",
              fontWeight: "400",
              fontSize: fontSize,
            },
            textStyle,
          ]}
        >
          {label}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.secondary,
    height: 100,
    borderRadius: 12,
    paddingHorizontal: 30,
    columnGap: 20,
  },
  checkbox: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CheckBox;
