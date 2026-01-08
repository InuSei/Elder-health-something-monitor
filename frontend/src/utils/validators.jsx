// src/utils/validators.js

export const validateRegister = (formData) => {
  let errors = {};
  let isValid = true;

  // 1. First Name
  if (!formData.first_name) {
    errors.first_name = "First name is required";
    isValid = false;
  }

  // 2. Last Name
  if (!formData.last_name) {
    errors.last_name = "Last name is required";
    isValid = false;
  }

  // 3. Birthday
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Enforces YYYY-MM-DD
  if (!formData.birthday) {
    errors.birthday = "Birthday is required";
    isValid = false;
  } else if (!dateRegex.test(formData.birthday)) {
    errors.birthday = "Format must be YYYY-MM-DD";
    isValid = false;
  }

  // 4. Age (Must be number and positive)
  if (!formData.age) {
    errors.age = "Age is required";
    isValid = false;
  } else if (isNaN(formData.age) || parseInt(formData.age) <= 0) {
    errors.age = "Invalid age";
    isValid = false;
  }

  // 5. Phone Number (PH Format: 09xxxxxxxxx)
  const phoneRegex = /^09\d{9}$/;
  if (!formData.phone_number) {
    errors.phone_number = "Phone number is required";
    isValid = false;
  } else if (!phoneRegex.test(formData.phone_number)) {
    errors.phone_number = "Format must be 09xxxxxxxxx";
    isValid = false;
  }

  return { isValid, errors };
};

export const validateLogin = (data) => {
  let errors = {};
  let isValid = true;

  if (!data.first_name) {
    errors.first_name = "First name is required";
    isValid = false;
  }
  if (!data.last_name) {
    errors.last_name = "Last name is required";
    isValid = false;
  }
  if (!data.birthday) {
    errors.birthday = "Birthday is required";
    isValid = false;
  }

  return { isValid, errors };
};