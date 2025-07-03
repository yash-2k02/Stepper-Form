import { createSlice } from "@reduxjs/toolkit";

export const formFields = {
  firstName: "",
  lastName: "",
  fatherName: "",
  phone: "",
  dob: null,
  gender: "",
  maritalStatus: "",
  address: "",
  landmark: "",
  city: "",
  state: "",
  zipcode: "",
  country: "",
  accountHolderName: "",
  accountNumber: "",
  accountType: "",
  ifsc: "",
};

const formSlice = createSlice({
  name: "formData",
  initialState: { ...formFields },
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm: () => ({ ...formFields }),
    // setFormData: (state, action) => {
    //   return { ...state, ...action.payload };
    // },
  },
});

export const { updateField, resetForm } = formSlice.actions;

export default formSlice.reducer;
