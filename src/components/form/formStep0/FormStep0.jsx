import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../redux/FormSlice";

export default function FormStep0() {

  const dispatch = useDispatch();
  const { firstName, lastName, fatherName, phone, dob, gender, maritalStatus } =
    useSelector((state) => state.form);

  const [phoneInput, setPhoneInput] = useState(phone);
  const [phoneError, setPhoneError] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);

  const [dobTouched, setDobTouched] = useState(false);
  const [dobError, setDobError] = useState("");

  useEffect(() => {

    const interval = setTimeout(() => {
      const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneInput)) {
      setPhoneError("Phone number must be 10 digits");
    } else {
      setPhoneError("");
      dispatch(updateField({ field: "phone", value: phoneInput }));
    }
    }, 500);
    return ()=> clearTimeout(interval)
  }, [phoneInput]);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    dispatch(updateField({ field, value }));
  };

  const handleDateChange = (userDOB) => {
    const today = new Date();
    const validAge = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );

    if (userDOB <= validAge) {
      const isoDate = userDOB.toISOString();
      dispatch(updateField({ field: "dob", value: isoDate }));
      setDobError("");
    } else {
      setDobError("User must be at least 18 years old");
    }
    setDobTouched(true);
  };

  return (
    <>
      <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
        <TextField
          label="First Name"
          fullWidth
          value={firstName}
          onChange={handleChange("firstName")}
          required
        />
        <TextField
          label="Last Name"
          fullWidth
          value={lastName}
          onChange={handleChange("lastName")}
          required
        />
      </Box>

      <TextField
        label="Father's Name"
        fullWidth
        value={fatherName}
        onChange={handleChange("fatherName")}
        sx={{ mt: 2 }}
        required
      />

      <TextField
        label="Phone Number"
        fullWidth
        value={phoneInput}
        onChange={(e) => setPhoneInput(e.target.value)}
        onBlur={() => setPhoneTouched(true)}
        error={!!phoneError && phoneTouched}
        helperText={phoneTouched ? phoneError : ""}
        sx={{ mt: 2 }}
        required
      />

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Date of Birth"
          value={dob ? new Date(dob) : null}
          onChange={handleDateChange}
          onBlur={() => setDobTouched(true)}
          slotProps={{
            textField: {
              fullWidth: true,
              error: !!dobError && dobTouched,
              helperText: dobTouched ? dobError : "",
              sx: { mt: 2 },
            },
          }}
        />
      </LocalizationProvider>

      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        gap={2}
        mt={2}
      >
        <FormControl fullWidth>
          <FormLabel>Gender</FormLabel>
          <RadioGroup row value={gender} onChange={handleChange("gender")}>
            <FormControlLabel
              value="Female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel value="Other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Marital Status</InputLabel>
          <Select
            value={maritalStatus}
            label="Marital Status"
            onChange={handleChange("maritalStatus")}
          >
            {["Single", "Married", "Widowed", "Divorced"].map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
}

export const validateStep0 = ({
  firstName,
  lastName,
  fatherName,
  phone,
  dob,
  gender,
  maritalStatus,
}) =>
  firstName.trim() &&
  lastName.trim() &&
  fatherName.trim() &&
  /^[0-9]{10}$/.test(phone) &&
  dob &&
  gender.trim() &&
  maritalStatus.trim();

