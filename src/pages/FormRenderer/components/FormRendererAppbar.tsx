import Button from "@/components/Button";
import { routePaths } from "@/routes/routePathes";
import { useFormStore } from "@/store/formStore";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FormRendererAppbar = () => {
  const navigate = useNavigate();
  const { setCurrentForm } = useFormStore();

  const onBack = () => {
    setCurrentForm(null);
    navigate(routePaths.HOMEPAGE);
  };

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <Button variant={"secondary"} onClick={onBack} sx={{ mr: 2 }}>
          Back
        </Button>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Form Preview
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default FormRendererAppbar;
