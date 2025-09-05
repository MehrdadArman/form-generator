// src/routes/RoutesConfig.tsx
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { routePaths } from "./routePathes";
import Loader from "@/components/Loader/Loader";

// Lazy imports
const Homepage = lazy(() => import("@/pages/Homepage/Homepage"));
const FormBuilderPage = lazy(
  () => import("@/pages/FormBuilderPage/FormBuilderPage")
);
const FormRendererPage = lazy(
  () => import("@/pages/FormRenderer/FormRendererPage")
);
const RoutesConfig = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path={routePaths.HOMEPAGE} element={<Homepage />} />
        <Route path={routePaths.FORM_BUILDER} element={<FormBuilderPage />} />
        <Route path={routePaths.FORM_RENDERER} element={<FormRendererPage />} />
      </Routes>
    </Suspense>
  );
};

export default RoutesConfig;
