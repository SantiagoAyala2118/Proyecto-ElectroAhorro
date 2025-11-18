import { useState } from "react";

export const useForm = (initialState) => {
  const [stateForm, setStateForm] = useState(initialState);

  // handleChange acepta tanto un event (e) como un objeto { name, value }
  const handleChange = (eOrObj) => {
    let name;
    let value;

    if (!eOrObj) return;

    // Si recibió un event real o un objeto con .target
    if (eOrObj.target && typeof eOrObj.target === "object") {
      name = eOrObj.target.name;
      value = eOrObj.target.value;
    } else {
      // Caso: handleChange({ name: 'power', value: '100' }) o handleChange({ name, value })
      name = eOrObj.name;
      value = eOrObj.value;
    }

    if (typeof name === "undefined") return;

    // uso de updater funcional para evitar race conditions
    setStateForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // setFields: mergea un objeto con varios campos (útil para autocompletar)
  const setFields = (obj) => {
    if (!obj || typeof obj !== "object") return;
    setStateForm((prev) => ({ ...prev, ...obj }));
  };

  const handleSubmit = (e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
  };

  return { stateForm, handleChange, handleSubmit, setFields };
};
