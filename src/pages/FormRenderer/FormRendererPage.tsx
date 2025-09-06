import React from "react";
import { Box, Container } from "@mui/material";
import FormRenderer from "./components/FormRenderer";
import { type FormData } from "@/types";
import { useFormStore } from "@/store/formStore";
import FormRendererAppbar from "./components/FormRendererAppbar";

const FormRendererPage: React.FC = () => {
  const { currentForm } = useFormStore();

  const onSubmit = (data: FormData) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <Box>
      <FormRendererAppbar />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <FormRenderer form={currentForm} onSubmit={onSubmit} />
      </Container>
    </Box>
  );
};

export default FormRendererPage;
