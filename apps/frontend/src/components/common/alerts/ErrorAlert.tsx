import { Alert, AlertTitle } from "@mui/material";

export interface ErrorAlertProps {
  title?: string;
  description?: string;
}

export const ErrorAlert = ({
  title = "Something went wrong",
  description = "Please try again later. If the problem persists, please contact support.",
}: ErrorAlertProps) => {
  return (
    <Alert severity="error">
      <AlertTitle>{title}</AlertTitle>
      {description}
    </Alert>
  );
};

export default ErrorAlert;
