import { CircularProgress, Box } from "@mui/material";

const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      width="100%"
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
