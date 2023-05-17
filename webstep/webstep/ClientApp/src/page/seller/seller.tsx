import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  Box,
  Breadcrumbs,
  ButtonBase,
  Link,
  Menu,
  MenuItem,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { SellerContainer } from "./SellerContainer";
import { SellerDisplay } from "./SellerDisplay";
import { GET_SELLERS } from "../../api/sellers";
import { GetSellersPayload } from "../../api/prospects/payloads";

interface ConsultantNoId {
  firstName: string;
  lastName: string;
  employmentDate: string;
  resignationDate?: any;
  workdays: number;
}
let filter = "s";
let takeAmount = 50;
let skipAmount = 0;
export const Seller = () => {
  const breadcrumbs = [
    <Link underline="none" fontSize="12px" key="1" color="inherit" href="/">
      Home
    </Link>,
    <Link underline="none" fontSize="12px" key="3" color="inherit">
      Add Seller
    </Link>,
  ];

  const { loading, error, data } = useQuery<GetSellersPayload>(GET_SELLERS, {
    pollInterval: 500,
    variables: { skipAmount: skipAmount, takeAmount: takeAmount },
  });

  let [filter, setFilter] = useState<string>("");
  function sellerFilter(val: string) {
    setFilter(val);
  }

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flex: 1,
          mx: 1,
          mt: 1,
          color: "black",
          fontWeight: "950",
          letterSpacing: ".5px",
          fontSize: "14px",
        }}
      >
        <Box>SELLER</Box>
        <Box>
          <Breadcrumbs
            separator={<KeyboardArrowRightIcon fontSize="inherit" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Box>
      </Box>

      <Box
        sx={{
          boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.1)",
          display: "flex",
          my: 1,
          mx: 1,
          flexBasis: "100%",
          flexWrap: "wrap",
          background: "#ffffff",
          borderRadius: "5px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <SellerContainer onClose={(val: string) => sellerFilter(val)} />
      </Box>

      <Box
        sx={{
          display: "grid",
          my: 1,
          mx: 1,
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gridGap: "30px",
          width: "100%",
        }}
      >
        {data?.sellers.items
          .filter((seller) =>
            seller.fullName.toLowerCase().includes(filter.toLocaleLowerCase())
          )
          .map((sellers) => (
            <SellerDisplay key={sellers.id} sellers={sellers} />
          ))}
      </Box>
      <ToastContainer />
    </Box>
  );
};
