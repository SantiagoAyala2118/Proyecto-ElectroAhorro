import { useState } from "react";

export const useForm = (initialState) => {
  const [stateForm, setStateForm] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStateForm({
      ...stateForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return { stateForm, handleChange, handleSubmit };
};
