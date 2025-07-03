import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { updateField } from "../redux/FormSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function FormStep1() {
  const dispatch = useDispatch();

  const { address, landmark, city, state, zipcode, country } = useSelector(
    (state) => state.form
  );
  const [zipcodeInput, setZipcodeInput] = useState(zipcode);
  const [zipError, setZipError] = useState("");
  const [zipTouched, setZipTouched] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const zipRegex = /^[1-9][0-9]{5}$/;

      if (!zipRegex.test(zipcodeInput)) {
        setZipError("Zip Code must be 6 digits and not start with 0");
      } else {
        setZipError("");
        dispatch(updateField({ field: "zipcode", value: zipcodeInput }));
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [zipcodeInput]);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    dispatch(updateField({ field, value }));
  };

  return (
    <>
      <TextField
        label="Address"
        fullWidth
        value={address}
        onChange={handleChange("address")}
        sx={{ mt: 2 }}
        required
      />

      <TextField
        label="Landmark"
        fullWidth
        value={landmark}
        onChange={handleChange("landmark")}
        sx={{ mt: 2 }}
      />

      <TextField
        label="City"
        fullWidth
        value={city}
        onChange={handleChange("city")}
        sx={{ mt: 2 }}
        required
      />

      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        gap={2}
        mt={2}
      >
        <TextField
          label="State"
          fullWidth
          value={state}
          onChange={handleChange("state")}
          required
        />
        <TextField
          label="Zip Code"
          fullWidth
          value={zipcodeInput}
          onChange={(e) => setZipcodeInput(e.target.value)}
          onBlur={() => setZipTouched(true)}
          error={!!zipError && zipTouched}
          helperText={zipTouched ? zipError : ""}
          required
        />
      </Box>

      <TextField
        label="Country"
        fullWidth
        value={country}
        onChange={handleChange("country")}
        sx={{ mt: 2 }}
        required
      />
    </>
  );
}

export const validateStep1 = ({ address, city, state, zipcode, country }) =>
  address.trim() &&
  city.trim() &&
  state.trim() &&
  /^[1-9][0-9]{5}$/.test(zipcode) &&
  country.trim();

