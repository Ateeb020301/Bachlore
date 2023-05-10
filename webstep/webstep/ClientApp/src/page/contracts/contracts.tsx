import React from "react";
import "./contracts.css";
import { FullPageContent } from "../Utils/FullPageContent";
import { ContractCalendarContainer } from "./contracts/ContractCalendarContainer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/material";
import { ContractsContainer } from "./contractscontainer";

export const Contracts: React.FC = () => {
  return (
    <Box sx={{}}>
      <Box
        sx={{ height: "100%", m: 1, display: "flex", flexDirection: "column" }}
      >
        <Box
          sx={{
            boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.1)",
            display: "flex",
            width: "85vw",
            flexWrap: "wrap",
            background: "#ffffff",
            borderRadius: "5px",
            justifyContent: "space-between",
            alignSelf: "center",
          }}
        >
          <ContractsContainer />
        </Box>

        <Box sx={{ maxWidth: "85vw", alignSelf: "center", py: 1 }}>
          <ContractCalendarContainer />
        </Box>
        <ToastContainer />
      </Box>
    </Box>
  );
};
