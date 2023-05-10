import React from "react";
import { useQuery } from "@apollo/client";
import { ProspectsCalendarContainer } from "./Prospects/ProspectsCalendarContainer";
import { FullPageContent } from "../Utils/FullPageContent";
import { ToastContainer, toast } from "react-toastify";
import { Box, MenuItem, Select } from "@mui/material";
import { GET_SELLERS } from "../../api/sellers";
import { GetSellersPayload } from "../seller/SellerContainer";
import { ProspectContainer } from "./prospectcontainer";

//GQL pagination skip const
const skipAmount = 0;
//GQL pagination take const
const takeAmount = 50;

export const Prospects = () => {
  const { loading, error, data, refetch } = useQuery<GetSellersPayload>(
    GET_SELLERS,
    {
      pollInterval: 500,
      variables: { skipAmount: skipAmount, takeAmount: takeAmount },
    }
  );
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
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <ProspectContainer />
        </Box>

        <Box sx={{ width: "85vw", alignSelf: "center", py: 1 }}>
          <ProspectsCalendarContainer />
        </Box>
        <ToastContainer />
      </Box>
    </Box>
  );
};
