import React from "react";
import FormBuilder from "./components/FormBuilder";
import { Box, Container } from "@mui/material";

const FormBuilderPage: React.FC = () => {
  return (
    <Box>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <FormBuilder />
      </Container>
    </Box>
  );
};

export default FormBuilderPage;
