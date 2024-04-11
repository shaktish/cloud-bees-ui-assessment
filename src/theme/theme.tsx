import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Roboto", // Use Roboto as the default font
      "Arial", // Fallback font in case Roboto is not available
      "sans-serif", // Fallback generic font
    ].join(","),
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
          borderRadius: "15px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "5px",
        },
      },
    },
  },
});

export default theme;
