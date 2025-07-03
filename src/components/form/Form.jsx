import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetForm } from "./redux/FormSlice";
import "./Form.css";
import tick from "../../assets/tick.png";

import PersonalDetailsForm, {
  validateStep0,
} from "./personalDetailsForm/PersonalDetailsForm";
import AddressDetailsForm, {
  validateStep1,
} from "./addressDetailsForm/AddressDetailsForm";
import BankDetailsForm, {
  validateStep2,
} from "./bankDetailsForm/BankDetailsForm";

const steps = ["Personal Details", "Address Details", "Bank Details"];

export default function Form() {
  const [activeStep, setActiveStep] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);

  const dispatch = useDispatch();
  const form = useSelector((state) => state.form);

  const isStep0Valid = validateStep0(form);
  const isStep1Valid = validateStep1(form);
  const isStep2Valid = validateStep2(form);

  const isCurrentStepValid =
    (activeStep === 0 && isStep0Valid) ||
    (activeStep === 1 && isStep1Valid) ||
    (activeStep === 2 && isStep2Valid);

  const handleNext = () => {
    if (!isCurrentStepValid) return;
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleReset = () => {
    dispatch(resetForm());
    setActiveStep(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isCurrentStepValid) return;
    setActiveStep(steps.length);
    setShowOverlay(true);
    dispatch(resetForm());
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <PersonalDetailsForm />;
      case 1:
        return <AddressDetailsForm />;
      case 2:
        return <BankDetailsForm />;
      default:
        return "Unknown Step";
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        px: { xs: 2, md: 4 },
        py: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          width: "100%",
          maxWidth: "1200px",
          p: { xs: 3, md: 5 },
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          Employee Details
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ pt: 4, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  "& .MuiStepIcon-root": { color: "#ccc" },
                  "& .MuiStepIcon-root.Mui-active": { color: "#6F6BFA" },
                  "& .MuiStepIcon-root.Mui-completed": { color: "#6F6BFA" },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={handleSubmit}>
          {activeStep === steps.length ? (
            <Box textAlign="center">
              <Typography variant="h6" gutterBottom>
                All steps completed — you're finished!
              </Typography>
              <Button
                variant="outlined"
                onClick={handleReset}
                sx={{ mt: 2, borderColor: "#6F6BFA", color: "#6F6BFA" }}
              >
                Reset Form
              </Button>
            </Box>
          ) : (
            <>
              <Box>{getStepContent(activeStep)}</Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "30px",
                  mt: 5,
                }}
              >
                <Button
                  sx={{ borderColor: "#6F6BFA", color: "#6F6BFA" }}
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                >
                  Back
                </Button>

                <Button
                  sx={{ bgcolor: "#6F6BFA" }}
                  variant="contained"
                  type={activeStep === steps.length - 1 ? "submit" : "button"}
                  onClick={
                    activeStep === steps.length - 1 ? undefined : handleNext
                  }
                  disabled={!isCurrentStepValid}
                >
                  {activeStep === steps.length - 1 ? "Submit" : "Next"}
                </Button>
              </Box>
            </>
          )}
        </form>
      </Paper>

      {showOverlay && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 5000,
          }}
        >
          <Paper
            elevation={6}
            sx={{
              padding: 4,
              borderRadius: 3,
              textAlign: "center",
              minWidth: 300,
              backgroundColor: "#fff",
            }}
          >
            <img className="tick-img" src={tick} alt="" />
            <Typography
              sx={{ mt: "10px" }}
              variant="h6"
              fontWeight="bold"
              gutterBottom
            >
              Submitted Successfully!
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Your form has been submitted.
            </Typography>
            <Button
              variant="contained"
              onClick={() => setShowOverlay(false)}
              sx={{ bgcolor: "#6F6BFA" }}
            >
              Close
            </Button>
          </Paper>
        </Box>
      )}
    </Box>
  );
}
