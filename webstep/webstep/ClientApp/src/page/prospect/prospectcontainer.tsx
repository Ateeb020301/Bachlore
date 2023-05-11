import { useQuery } from "@apollo/client";
import { Box, Button, InputAdornment, OutlinedInput } from "@mui/material";
import React from "react";
import { GET_CONSULTANTS } from "../../api/consultants";
import { PageInfo, Project } from "../../logic/interfaces";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const ProspectContainer: React.FC = () => {
  const [isModalOpen, setModalState] = React.useState(false);

  const toggleModal = () => setModalState(!isModalOpen);

  return (
    <>
      <Box sx={{ p: 1, width: "30%" }}>
        <h3>Prospects</h3>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      ></Box>
    </>
  );
};
