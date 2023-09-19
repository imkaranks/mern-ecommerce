import React from 'react';
import { Typography, Stepper, StepLabel, Step } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

function CheckoutSteps({ activeStep }) {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];

  return (
    <>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        sx={{ boxSizing: 'border-box', marginTop: '2rem' }}
      >
        {
          steps.map((step, i) => (
            <Step
              key={i}
              active={activeStep === i}
              completed={activeStep >= i}
            >
              <StepLabel
                icon={step.icon}
                sx={{ color: activeStep >= i ? 'currentcolor' : '#999' }}
              >
                {step.label}
              </StepLabel>
            </Step>
          ))
        }
      </Stepper>
    </>
  )
}

export default CheckoutSteps