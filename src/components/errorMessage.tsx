import { Typography } from "@mui/material";

type ErrorMessageProp = {
  message?: string;
};
const ErrorMessage = ({
  message = "An error occured while fetching the data",
}: ErrorMessageProp) => {
  return (
    <Typography variant="body1" style={{ color: "#b71c1c" }}>
      {message}
    </Typography>
  );
};

export default ErrorMessage;
