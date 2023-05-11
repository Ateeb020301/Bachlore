import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import { FormStep1 } from "../pages/FormStep1/intex";
import { FormStep2 } from "../pages/FormStep2";
import { FormStep3 } from "../pages/FormStep3";
import React from "react";

export const Router = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/belegg");
    setOpen(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/step1" element={<FormStep1 />} />
        <Route path="/step2" element={<FormStep2 />} />
        <Route path="/step3" element={<FormStep3 onClose={handleClose} />} />
      </Routes>
    </BrowserRouter>
  );
};
