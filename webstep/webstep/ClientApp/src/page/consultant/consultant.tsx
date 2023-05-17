import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AddConsultantPayload, ADD_CONSULTANT } from "../../api/consultants";
import { Box, Breadcrumbs, Link } from "@mui/material";
import "./Consultant.css";
import { ConsultantContainer } from "./ConsultantContainer";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { ConsultantDisplay } from "./ConsultantDisplay";

interface ConsultantNoId {
  firstName: string;
  lastName: string;
  employmentDate: string;
  resignationDate?: any;
  workdays: number;
}

export const Consultant = () => {
  const breadcrumbs = [
    <Link underline="none" fontSize="12px" key="1" color="inherit" href="/">
      Home
    </Link>,
    <Link underline="none" fontSize="12px" key="2" color="inherit">
      Form
    </Link>,
    <Link underline="none" fontSize="12px" key="3" color="inherit">
      Add Consultant
    </Link>,
  ];

  const [isModalOpen, setModalState] = React.useState(false);

  let [filter, setFilter] = useState<string>("");
  function consultantFilter(val: string) {
    setFilter(val);
  }

  //Date shenanigans
  let d = new Date();

  //Get todays date
  let today =
    d.getFullYear() +
    "-" +
    (d.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    d.getDate().toString().padStart(2, "0");

  let defaultConsultant: ConsultantNoId = {
    firstName: "",
    lastName: "",
    employmentDate: today,
    resignationDate: null,
    workdays: 0,
  };

  const [currentConsultant, setCurrentConsultant] =
    useState<ConsultantNoId>(defaultConsultant);
  const [displayValidation, setDisplayValidation] = useState<string>("");

  //Adds or removes validation field on resignationDate depending on if its empty or not
  useEffect(() => {
    resignationDateValidationToggle();
  });

  const resignationDateValidationToggle = () => {
    let isValidatedStr = "";

    //returns true if its a valid end date, false if its not
    let isValidResignationDate = isValidEndDate(
      currentConsultant.resignationDate ? currentConsultant.resignationDate : ""
    );

    //Checks if date is not empty and is a valid endDate
    if (
      currentConsultant.resignationDate &&
      currentConsultant.resignationDate !== "" &&
      isValidResignationDate
    ) {
      isValidatedStr = "is-valid";
    } else if (
      currentConsultant.resignationDate &&
      currentConsultant.resignationDate !== "" &&
      !isValidResignationDate
    ) {
      isValidatedStr = "is-invalid";
    }

    setDisplayValidation(isValidatedStr);
  };

  const isValidText = (s: string) => {
    return s !== "";
  };

  //checks only if the start date is empty
  const isValidStartDate = (s: string) => {
    if (s === "") {
      return false;
    }
    return true;
  };

  const isValidEndDate = (s: string) => {
    if (s === "") {
      return true;
    }

    // If the startdate doesnt exist, any valid date is a valid start date
    if (currentConsultant.employmentDate === "") {
      //change to date when its ready
      return isValidText(s);
    } else {
      // assumes startdate is formatted correctly
      let tempSD = new Date(currentConsultant.employmentDate);
      // assumes enddate is formatted correctly
      let tempED = new Date(s);
      return tempED > tempSD;
    }
  };

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
        <Box>CONSULTANT</Box>
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
        <ConsultantContainer onClose={(val: string) => consultantFilter(val)} />
      </Box>
      <Box
        sx={{
          display: "flex",
          my: 1,
          mx: 1,
          flexBasis: "100%",
          flexWrap: "wrap",
        }}
      >
        <ConsultantDisplay filter={filter} />
      </Box>
      <ToastContainer />
    </Box>
  );
};
