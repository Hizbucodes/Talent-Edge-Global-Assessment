import React, { forwardRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Controller } from "react-hook-form";
import { Colors } from "../../constants/colors";

const Input = (
  {
    control,
    name,
    Icon,
    placeholder,
    secureTextEntry: initialSecureTextEntry = false,
    rules,
    backgroundColor = "#F7F8F9",
    borderColor,
    placeholderColor = "#9ca3af",
    textColor = "black",
    errorColor = Colors.errorColor,
    containerStyle,
    inputStyle,
    errorTextStyle,
    ...props
  },
  ref
) => {
  const [secureText, setSecureText] = useState(initialSecureTextEntry);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => {
        const currentBorderColor = error
          ? errorColor
          : borderColor || "#E8ECF4";

        return (
          <>
            <View
              style={[{ width: "100%", position: "relative" }, containerStyle]}
            >
              <TextInput
                ref={ref}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value || ""}
                placeholder={placeholder}
                placeholderTextColor={placeholderColor}
                secureTextEntry={secureText}
                style={[
                  {
                    borderRadius: 12,
                    backgroundColor: backgroundColor,
                    paddingHorizontal: 16,
                    borderWidth: 1,
                    borderColor: currentBorderColor,
                    color: textColor,
                    fontSize: 16,
                    height: 60,
                  },
                  inputStyle,
                ]}
                accessible={true}
                accessibilityLabel={placeholder}
                {...props}
              />
              {(Icon || initialSecureTextEntry) && (
                <Pressable
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: 16,
                    transform: [{ translateY: -25 / 2 }],
                  }}
                  onPress={() =>
                    initialSecureTextEntry && setSecureText(!secureText)
                  }
                  hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                  accessible={true}
                  accessibilityLabel={
                    secureText ? "Show password" : "Hide password"
                  }
                >
                  {initialSecureTextEntry ? (
                    <MaterialIcons
                      name={secureText ? "visibility-off" : "visibility"}
                      size={25}
                      color={textColor === "white" ? "white" : "#6b7280"}
                    />
                  ) : (
                    Icon
                  )}
                </Pressable>
              )}
            </View>
            {error && (
              <Text
                style={[
                  {
                    fontSize: 12,
                    color: errorColor,
                    marginTop: 4,
                  },
                  errorTextStyle,
                ]}
              >
                {error.message}
              </Text>
            )}
          </>
        );
      }}
    />
  );
};

export default forwardRef(Input);
