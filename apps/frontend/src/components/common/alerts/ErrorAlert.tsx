import { Alert, AlertTitle } from "@mui/material";

export const ErrorAlert = () => {
  return (
    <Alert severity="error">
      <AlertTitle>Something went wrong</AlertTitle>
      Please try again later. If the problem persists, please contact support.
    </Alert>
  );
};

export default ErrorAlert;
