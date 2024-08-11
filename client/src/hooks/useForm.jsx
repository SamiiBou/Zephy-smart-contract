import { useState } from 'react';

function useForm({initialValues = {}, action = () => {}, validator = () => ({})}) {
  const [values, setValues] = useState({...initialValues});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const setFormValue = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const validateForm = () => {
    return validator(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      await action(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    setFormValue,
    isSubmitting,
    submit: handleSubmit,
    clearErrors: () => setErrors({}),
  }
}

export default useForm;