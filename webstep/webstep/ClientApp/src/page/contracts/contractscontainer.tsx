import { useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Dialog,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import { GET_CONSULTANTS } from "../../api/consultants";
import { PageInfo, Project } from "../../logic/interfaces";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Route, Routes, useNavigate } from "react-router-dom";
import { FormProvider } from "../../components/FormInfo/context/FormContext";
import { FormStep2 } from "../../components/FormInfo/pages/FormStep2";
import { FormStep1 } from "../../components/FormInfo/pages/FormStep1/intex";
import { FormStep3 } from "../../components/FormInfo/pages/FormStep3";
import GlobalStyled from "../../components/FormInfo/components/styles/GlobalStyledComponents/GlobalStyled";

export const ContractsContainer: React.FC = () => {
  const [isModalOpen, setModalState] = React.useState(false);

  const toggleModal = () => setModalState(!isModalOpen);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/belegg");
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ p: 1, width: "30%" }}>
        <h3>Contracting</h3>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ mx: 1 }}>
          <Box
            sx={{
              display: "flex",
              background: "#ecf8fc",
              width: "30px",
              height: "30px",
              borderRadius: "5px",
              justifyContent: "center",
              alignItems: "center",
              ":hover": { background: "#50c3e6", cursor: "pointer" },
            }}
          >
            <MoreVertIcon
              sx={{
                color: "#51c2e7",
                fontSize: "16px",
                ":hover": { color: "white" },
                witdh: "100%",
                height: "100%",
              }}
              color="error"
            />
          </Box>
        </Box>
        <Box sx={{ mx: 1, my: 1 }}>
          <Button
            onClick={() => setOpen(true)}
            startIcon={<AddIcon />}
            variant="contained"
            sx={{
              background: "#13c56b",
              ":hover": { background: "#10a75b" },
              textTransform: "none",
              fontWeight: "600",
              fontSize: "11px",
              p: 1,
              display: "flex",
              alignItems: "center",
            }}
            size="small"
            disableRipple
            disableFocusRipple
          >
            Contract
          </Button>
        </Box>
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          aria-labelledby="responsive-dialog-title"
        >
          <FormProvider>
            <Routes>
              <Route path="/" element={<FormStep1 />} />
              <Route path="/step2" element={<FormStep2 />} />
              <Route
                path="/step3"
                element={<FormStep3 onClose={handleClose} />}
              />
            </Routes>
            <GlobalStyled />
          </FormProvider>
        </Dialog>
      </Box>
    </>
  );
};
