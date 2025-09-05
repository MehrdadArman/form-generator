import Button from "@/components/Button";
import { routePaths } from "@/routes/routePathes";
import { useFormStore } from "@/store/formStore";
import { AppBar, Typography, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomepageAppbar = () => {
  const { setCurrentForm } = useFormStore();
  const navigate = useNavigate();

  const onCreateForm = () => {
    setCurrentForm(null);
    navigate(routePaths.FORM_BUILDER);
  };

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Form Generator
        </Typography>
        <Button variant="secondary" onClick={onCreateForm}>
          Create Form
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default HomepageAppbar;
