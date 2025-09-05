import { useFormStore } from "@/store/formStore";
import { FormList } from "./components";
import { Box, Container } from "@mui/material";
import { routePaths } from "@/routes/routePathes";
import { useNavigate } from "react-router-dom";
import type { Form } from "@/types";
import HomepageAppbar from "./components/HomepageAppbar";

const Homepage = () => {
  const { forms, setCurrentForm, deleteForm } = useFormStore();
  const navigate = useNavigate();

  const onViewForm = (form: Form) => {
    setCurrentForm(form);
    navigate(routePaths.FORM_RENDERER);
  };

  const onEditForm = (form: Form) => {
    setCurrentForm(form);
    navigate(routePaths.FORM_BUILDER);
  };

  return (
    <Box sx={{ p: 3 }}>
      <HomepageAppbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <FormList
          forms={forms}
          onEdit={(form) => onEditForm(form)}
          onDelete={(formId) => deleteForm(formId)}
          onView={(form) => onViewForm(form)}
        />
      </Container>
    </Box>
  );
};

export default Homepage;
