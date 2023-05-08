import { BrowserRouter, Route, Routes } from "react-router-dom";

import { FormStep1 } from "../pages/FormStep1/intex";
import { FormStep2 } from "../pages/FormStep2";
import { FormStep3 } from "../pages/FormStep3";
import React from "react";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/step1" element={<FormStep1 />} />
        <Route path="/step2" element={<FormStep2 />} />
        <Route path="/step3" element={<FormStep3 />} />
      </Routes>
    </BrowserRouter>
  );
};
