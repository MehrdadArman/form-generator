import { theme } from "@/constants/theme";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import RoutesConfig from "@/routes/routes";
import { SnackbarProvider } from "notistack";

const Providers = () => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider />
      <BrowserRouter>
        <RoutesConfig />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Providers;
