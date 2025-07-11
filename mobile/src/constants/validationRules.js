export const VALIDATION_MESSAGE = {
  REQUIRED: "This field is required",
  PASSWORD_LENGTH: "Password must be at least 6 characters",
  PASSWORD_COMPLEXITY: "Must include uppercase, number & special character",
  PASSWORDS_MATCH: "Passwords must match",
};

export const COURSE_VALIDATION_RULES = {
  title: {
    required: VALIDATION_MESSAGE.REQUIRED,
  },
  description: {
    required: VALIDATION_MESSAGE.REQUIRED,
  },
  content: {
    required: VALIDATION_MESSAGE.REQUIRED,
  },
};

export const VALIDATION_RULES = {
  username: {
    required: VALIDATION_MESSAGE.REQUIRED,
  },
  role: {
    required: VALIDATION_MESSAGE.REQUIRED,
  },
  password: {
    required: VALIDATION_MESSAGE.REQUIRED,
    minLength: {
      value: 6,
      message: VALIDATION_MESSAGE.PASSWORD_LENGTH,
    },
  },
  confirmPasswordValidator: (currentPassword) => ({
    required: VALIDATION_MESSAGE.REQUIRED,
    minLength: {
      value: 6,
      message: VALIDATION_MESSAGE.PASSWORD_LENGTH,
    },
    validate: (value) =>
      value === currentPassword || VALIDATION_MESSAGE.PASSWORDS_MATCH,
  }),
};
