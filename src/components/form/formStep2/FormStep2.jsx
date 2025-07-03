import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { updateField } from "../redux/FormSlice";
import { useDispatch, useSelector } from "react-redux";

export default function FormStep2() {
  const dispatch = useDispatch();

  const { accountHolderName, accountNumber, accountType, ifsc } = useSelector(
    (state) => state.form
  );

  const [accountNumberInput, setAccountNumberInput] = useState(accountNumber);
  const [accountNumberTouched, setAccountNumberTouched] = useState(false);
  const [accountError, setAccountError] = useState("");
  const [ifscInput, setIfscInput] = useState(ifsc);
  const [ifscTouched, setIfscTouched] = useState(false);
  const [ifscError, setIfscError] = useState("");

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    dispatch(updateField({ field, value }));
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const accountRegex = /^[0-9]{10,18}$/;
      const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

      if (!accountRegex.test(accountNumberInput)) {
        setAccountError("Account number must be between 10-18 digits");
      } else {
        setAccountError("");
        dispatch(
          updateField({ field: "accountNumber", value: accountNumberInput })
        );
      }

      if (!ifscRegex.test(ifscInput)) {
        setIfscError("Invalid IFSC Code format (e.g. SBIN0001234)");
      } else {
        setIfscError("");
        dispatch(updateField({ field: "ifsc", value: ifscInput }));
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [accountNumberInput, ifscInput]);

  return (
    <>
      <TextField
        label="Account Holder's Name"
        fullWidth
        value={accountHolderName}
        onChange={handleChange("accountHolderName")}
        sx={{ mt: 2 }}
        required
      />

      <TextField
        label="Account Number"
        fullWidth
        value={accountNumberInput}
        onChange={(e) => setAccountNumberInput(e.target.value)}
        onBlur={() => setAccountNumberTouched(true)}
        error={!!accountError && accountNumberTouched}
        helperText={accountNumberTouched ? accountError : ""}
        sx={{ mt: 2 }}
        required
      />

      <FormControl fullWidth sx={{ mt: 2 }}>
        <FormLabel>Account Type</FormLabel>
        <RadioGroup
          row
          value={accountType}
          onChange={handleChange("accountType")}
        >
          <FormControlLabel
            value="Savings"
            control={<Radio />}
            label="Savings"
          />
          <FormControlLabel value="Salary" control={<Radio />} label="Salary" />
        </RadioGroup>
      </FormControl>

      <TextField
        label="IFSC Code"
        fullWidth
        value={ifscInput}
        onChange={(e) => setIfscInput(e.target.value)}
        onBlur={() => setIfscTouched(true)}
        error={!!ifscError && ifscTouched}
        helperText={ifscTouched ? ifscError : ""}
        sx={{ mt: 2 }}
        required
      />
    </>
  );
}

export const validateStep2 = ({ accountHolderName, accountNumber, accountType, ifsc }) =>
  accountHolderName.trim() &&
  /^[0-9]{10,18}$/.test(accountNumber) &&
  accountType.trim() &&
  /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc);

