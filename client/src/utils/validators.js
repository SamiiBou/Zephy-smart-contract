export const registerValidator = (formData = {}) => {
  let newErrors = {};
  if (!formData.fullName) {
    newErrors.fullName = "Full name is required";
  }

  if (!formData.email) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Email is invalid";
  }

  return newErrors;
};
