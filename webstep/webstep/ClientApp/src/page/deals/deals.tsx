import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { useMutation, useQuery } from "@apollo/client";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { AddConsultantPayload, ADD_CONSULTANT } from "../../api/consultants";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Breadcrumbs,
  InputAdornment,
  Link,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { DealsContainer } from "./DealsContainer";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import NumbersOutlinedIcon from "@mui/icons-material/NumbersOutlined";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import {
  GetAllSellerProspectsPayload,
  GetProspectsPayload,
} from "../../api/prospects/payloads";
import {
  GET_ALL_SELLER_PROSPECTS,
  GET_PROSPECTS,
} from "../../api/prospects/queries";
import { GET_ACTIVITYLOG } from "../../api/activitylog";

interface ConsultantNoId {
  firstName: string;
  lastName: string;
  employmentDate: string;
  resignationDate?: any;
  workdays: number;
}

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export const Deals = () => {
  const breadcrumbs = [
    <Link underline="none" fontSize="12px" key="1" color="inherit" href="/">
      Home
    </Link>,
    <Link underline="none" fontSize="12px" key="3" color="inherit">
      Deals
    </Link>,
  ];

  const [isModalOpen, setModalState] = React.useState(false);

  const toggleModal = () => setModalState(!isModalOpen);
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
  const [addConsultant] = useMutation<
    AddConsultantPayload,
    { input: ConsultantNoId }
  >(ADD_CONSULTANT, {
    refetchQueries: [
      {
        query: GET_ACTIVITYLOG,
      },
    ],
  });

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

  const isValidConsultant = (): boolean => {
    let hasTruthyValues =
      currentConsultant.firstName &&
      currentConsultant.lastName &&
      isValidStartDate(currentConsultant.employmentDate);

    let resignDate = currentConsultant.resignationDate?.toString();
    if (hasTruthyValues) {
      if (resignDate !== "") {
        return (
          isValidText(currentConsultant.employmentDate) &&
          isValidEndDate(
            currentConsultant.resignationDate
              ? currentConsultant.resignationDate
              : ""
          )
        );
      } else {
        return isValidText(currentConsultant.employmentDate);
      }
    }
    return false;
  };

  const { loading, error, data } = useQuery<GetProspectsPayload>(GET_PROSPECTS);
  let probTen: any[] = [];
  let probThirty: any[] = [];
  let probSeventy: any[] = [];
  let probHundred: any[] = [];

  data?.prospects.items.forEach((prospect) => {
    prospect.subProspects.forEach((sub) => {
      if (sub.probability == 10) {
        probTen.push(prospect);
      }
      if (sub.probability == 30) {
        probThirty.push(prospect);
      }
      if (sub.probability == 70) {
        probSeventy.push(prospect);
      }
      if (sub.probability == 100) {
        probHundred.push(prospect);
      }
    });
  });

  function getDateOfWeek(w: any, y: any) {
    var d = 1 + (w - 1) * 7; // 1st of January + 7 days for each week
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let date = new Date(y, 0, d).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return <span>{date}</span>;
  }
  let count = 0;

  let [filter, setFilter] = useState<string>("");
  function dealsFilter(val: string) {
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
        <Box>DEALS</Box>
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
          m: 1,
          flexBasis: "100%",
          flexWrap: "wrap",
          background: "#ffffff",
          borderRadius: "5px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <DealsContainer onClose={(val: string) => dealsFilter(val)} />
      </Box>

      <Box
        sx={{
          borderRadius: "5px",
          m: 1,
          flexBasis: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ flexBasis: "22%" }}>
          <Box
            className={"leadDiscovered"}
            sx={{
              p: 3,
              fontWeight: "950",
              letterSpacing: ".5px",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#fde2e3",
            }}
          >
            <span>Lead Discovered</span>
            <span style={{ opacity: 0.5, fontSize: "14px" }}>
              {probTen.length} Deals
            </span>
          </Box>
        </Box>
        <Box sx={{ flexBasis: "22%" }}>
          <Box
            className={"needsIdentified"}
            sx={{
              p: 3,
              fontWeight: "950",
              letterSpacing: ".5px",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#faf3e1",
            }}
          >
            <span>Needs Identified</span>
            <span style={{ opacity: 0.5, fontSize: "14px" }}>
              {probThirty.length} Deals
            </span>
          </Box>
        </Box>

        <Box sx={{ flexBasis: "22%" }}>
          <Box
            className={"needsIdentified"}
            sx={{
              p: 3,
              fontWeight: "950",
              letterSpacing: ".5px",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#dff4fa",
            }}
          >
            <span>Meeting Scheduled</span>
            <span style={{ opacity: 0.5, fontSize: "14px" }}>
              {probSeventy.length} Deals
            </span>
          </Box>
        </Box>

        <Box sx={{ flexBasis: "22%" }}>
          <Box
            className={"offerAccepted"}
            sx={{
              p: 3,
              fontWeight: "950",
              letterSpacing: ".5px",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#e8e3fa",
            }}
          >
            <span>Deal Completed</span>
            <span style={{ opacity: 0.5, fontSize: "14px" }}>
              {probHundred.length} Deals
            </span>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          m: 1,
          flexBasis: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ flexBasis: "22%" }}>
          {data?.prospects.items
            .filter((deals) =>
              (deals.customer.firstName + " " + deals.customer.lastName)
                .toLocaleLowerCase()
                .includes(filter.toLocaleLowerCase())
            )
            .map((prospects) =>
              prospects.subProspects.length > 0 ? (
                prospects.subProspects[0].probability == 10 ? (
                  <Accordion
                    key={prospects.id}
                    sx={{
                      boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.1)",
                      borderRadius: "5px",
                      mb: 1,
                      fontWeight: "950",
                      letterSpacing: ".5px",
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <AccordionSummary
                      sx={{ maxHeight: "70px" }}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <Box
                          className="img"
                          sx={{
                            mr: 2,
                            padding: "5px",
                            background: "#f2f6f8",
                            border: "solid",
                            borderColor: "#ecefee",
                            borderWidth: "thin",
                            borderRadius: "100%",
                            height: "25px",
                            width: "25px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Box
                            sx={{
                              borderRadius: "100%",
                              borderColor: "#ecefee",
                              borderWidth: "thin",
                              width: "100%",
                              height: "25px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <p
                              style={{
                                color: "#6a96e9",
                                fontWeight: 900,
                                fontSize: "11px",
                                letterSpacing: "1px",
                              }}
                            >
                              {prospects.customer.firstName.charAt(0)}
                              {prospects.customer.lastName.charAt(0)}
                            </p>
                          </Box>
                        </Box>
                        <Box sx={{ pl: 1 }}>
                          <p
                            style={{
                              fontSize: "15px",
                              fontWeight: 600,
                              marginTop: "10px",
                              color: "black",
                            }}
                          >
                            {prospects.customer.firstName}{" "}
                            {prospects.customer.lastName}
                          </p>
                          <p
                            style={{
                              fontSize: "12px",
                              opacity: 0.5,
                              marginTop: "0px",
                              color: "black",
                            }}
                          >
                            Project - {prospects.projectName}
                          </p>
                        </Box>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        borderTop: "dotted",
                        borderWidth: "1px",
                        borderColor: "#f7f6f9",
                      }}
                    >
                      <Box>
                        <p
                          style={{
                            fontSize: "15px",
                            fontWeight: 600,
                            marginTop: "10px",
                            color: "black",
                          }}
                        >
                          {prospects.projectName}
                        </p>
                        <p
                          style={{
                            fontSize: "12px",
                            opacity: 0.5,
                            marginTop: "0px",
                            color: "black",
                          }}
                        >
                          The assigned seller for this deal is{" "}
                          <strong
                            style={{
                              fontWeight: 900,
                              textDecoration: "underline",
                            }}
                          >
                            {prospects.seller.fullName}
                          </strong>
                          , with any inconvenience, he can be contacted down
                          below
                        </p>
                      </Box>
                      <Box>
                        {prospects.subProspects.length > 1 ? (
                          <>
                            {prospects.subProspects.map((subProspects) => (
                              <Accordion
                                key={prospects.id}
                                sx={{
                                  boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
                                  borderRadius: "5px",
                                  mb: 1,
                                  fontWeight: "950",
                                  letterSpacing: ".5px",
                                  display: "flex",
                                  flexDirection: "column",
                                  backgroundColor: "#ffffff",
                                }}
                              >
                                <AccordionSummary
                                  sx={{ maxHeight: "70px", padding: 0 }}
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      height: "100%",
                                    }}
                                  >
                                    <Box sx={{ pl: 1 }}>
                                      <p
                                        style={{
                                          fontSize: "12px",
                                          opacity: 0.5,
                                          marginTop: "0px",
                                          color: "black",
                                        }}
                                      >
                                        Start Date -{" "}
                                        {getDateOfWeek(
                                          subProspects.startWeek,
                                          subProspects.startYear
                                        )}
                                      </p>
                                      <p
                                        style={{
                                          fontSize: "12px",
                                          opacity: 0.5,
                                          marginTop: "0px",
                                          color: "black",
                                        }}
                                      >
                                        EndDate -{" "}
                                        {getDateOfWeek(
                                          subProspects.endWeek,
                                          subProspects.endYear
                                        )}
                                      </p>
                                    </Box>
                                  </Box>
                                </AccordionSummary>
                                <AccordionDetails
                                  sx={{
                                    borderTop: "dotted",
                                    borderWidth: "1px",
                                    borderColor: "#f7f6f9",
                                  }}
                                >
                                  <Box>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                      }}
                                    >
                                      <Box sx={{ mr: 1 }}>
                                        <NumbersOutlinedIcon
                                          fontSize="inherit"
                                          color="disabled"
                                        />
                                      </Box>
                                      <Box>
                                        <p
                                          style={{
                                            fontSize: "13px",
                                            fontWeight: 600,
                                            marginTop: "0px",
                                            marginBlockStart: "0px",
                                            marginBlockEnd: "0px",
                                            color: "black",
                                          }}
                                        >
                                          Number of Consultants
                                        </p>
                                        <p
                                          style={{
                                            fontSize: "11px",
                                            color: "black",
                                            marginTop: "5px",
                                            opacity: 0.5,
                                          }}
                                        >
                                          {subProspects.numOfConsultants}{" "}
                                          Consultants available
                                        </p>
                                      </Box>
                                    </Box>

                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                      }}
                                    >
                                      <Box sx={{ mr: 1 }}>
                                        <PercentOutlinedIcon
                                          fontSize="inherit"
                                          color="disabled"
                                        />
                                      </Box>
                                      <Box>
                                        <p
                                          style={{
                                            fontSize: "13px",
                                            fontWeight: 600,
                                            marginTop: "0px",
                                            marginBlockStart: "0px",
                                            marginBlockEnd: "0px",
                                            color: "black",
                                          }}
                                        >
                                          Probability
                                        </p>
                                        <p
                                          style={{
                                            fontSize: "11px",
                                            color: "black",
                                            marginTop: "5px",
                                            opacity: 0.5,
                                          }}
                                        >
                                          {subProspects.probability}% - Meeting
                                          has been scheduled
                                        </p>
                                      </Box>
                                    </Box>
                                  </Box>
                                </AccordionDetails>
                              </Accordion>
                            ))}
                          </>
                        ) : (
                          <>
                            <Box
                              sx={{ display: "flex", alignItems: "flex-start" }}
                            >
                              <Box sx={{ mr: 1 }}>
                                <NumbersOutlinedIcon
                                  fontSize="inherit"
                                  color="disabled"
                                />
                              </Box>
                              <Box>
                                <p
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    marginTop: "0px",
                                    marginBlockStart: "0px",
                                    marginBlockEnd: "0px",
                                    color: "black",
                                  }}
                                >
                                  Number of Consultants
                                </p>
                                <p
                                  style={{
                                    fontSize: "11px",
                                    color: "black",
                                    marginTop: "5px",
                                    opacity: 0.5,
                                  }}
                                >
                                  {prospects.subProspects[0].numOfConsultants}{" "}
                                  Consultants available
                                </p>
                              </Box>
                            </Box>

                            <Box
                              sx={{ display: "flex", alignItems: "flex-start" }}
                            >
                              <Box sx={{ mr: 1 }}>
                                <HistoryOutlinedIcon
                                  fontSize="inherit"
                                  color="disabled"
                                />
                              </Box>
                              <Box>
                                <p
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    marginTop: "0px",
                                    marginBlockStart: "0px",
                                    marginBlockEnd: "0px",
                                    color: "black",
                                  }}
                                >
                                  Start Date
                                </p>
                                <p
                                  style={{
                                    fontSize: "11px",
                                    color: "black",
                                    marginTop: "5px",
                                    opacity: 0.5,
                                  }}
                                >
                                  {getDateOfWeek(
                                    prospects.subProspects[0].startWeek,
                                    prospects.subProspects[0].startYear
                                  )}
                                  , Week {prospects.subProspects[0].startWeek}
                                </p>
                              </Box>
                            </Box>

                            <Box
                              sx={{ display: "flex", alignItems: "flex-start" }}
                            >
                              <Box sx={{ mr: 1 }}>
                                <DoneOutlinedIcon
                                  fontSize="inherit"
                                  color="disabled"
                                />
                              </Box>
                              <Box>
                                <p
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    marginTop: "0px",
                                    marginBlockStart: "0px",
                                    marginBlockEnd: "0px",
                                    color: "black",
                                  }}
                                >
                                  End Date
                                </p>
                                <p
                                  style={{
                                    fontSize: "11px",
                                    color: "black",
                                    marginTop: "5px",
                                    opacity: 0.5,
                                  }}
                                >
                                  {getDateOfWeek(
                                    prospects.subProspects[0].endWeek,
                                    prospects.subProspects[0].endYear
                                  )}
                                  , Week {prospects.subProspects[0].endWeek}
                                </p>
                              </Box>
                            </Box>

                            <Box
                              sx={{ display: "flex", alignItems: "flex-start" }}
                            >
                              <Box sx={{ mr: 1 }}>
                                <PercentOutlinedIcon
                                  fontSize="inherit"
                                  color="disabled"
                                />
                              </Box>
                              <Box>
                                <p
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    marginTop: "0px",
                                    marginBlockStart: "0px",
                                    marginBlockEnd: "0px",
                                    color: "black",
                                  }}
                                >
                                  Probability
                                </p>
                                <p
                                  style={{
                                    fontSize: "11px",
                                    color: "black",
                                    marginTop: "5px",
                                    opacity: 0.5,
                                  }}
                                >
                                  {prospects.subProspects[0].probability}% -
                                  Talks has begun
                                </p>
                              </Box>
                            </Box>
                          </>
                        )}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ) : (
                  ""
                )
              ) : (
                ""
              )
            )}
        </Box>

        <Box sx={{ flexBasis: "22%" }}>
          {data?.prospects.items
            .filter((deals) =>
              (deals.customer.firstName + " " + deals.customer.lastName)
                .toLocaleLowerCase()
                .includes(filter.toLocaleLowerCase())
            )
            .map((prospects) =>
              prospects.subProspects.length > 0 ? (
                prospects.subProspects[0].probability == 30 ? (
                  <Accordion
                    key={prospects.id}
                    sx={{
                      boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.1)",
                      borderRadius: "5px",
                      mb: 1,
                      fontWeight: "950",
                      letterSpacing: ".5px",
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <AccordionSummary
                      sx={{ maxHeight: "70px" }}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <Box
                          className="img"
                          sx={{
                            mr: 2,
                            padding: "5px",
                            background: "#f2f6f8",
                            border: "solid",
                            borderColor: "#ecefee",
                            borderWidth: "thin",
                            borderRadius: "100%",
                            height: "25px",
                            width: "25px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Box
                            sx={{
                              borderRadius: "100%",
                              borderColor: "#ecefee",
                              borderWidth: "thin",
                              width: "100%",
                              height: "25px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <p
                              style={{
                                color: "#6a96e9",
                                fontWeight: 900,
                                fontSize: "11px",
                                letterSpacing: "1px",
                              }}
                            >
                              {prospects.customer.firstName.charAt(0)}
                              {prospects.customer.lastName.charAt(0)}
                            </p>
                          </Box>
                        </Box>
                        <Box sx={{ pl: 1 }}>
                          <p
                            style={{
                              fontSize: "15px",
                              fontWeight: 600,
                              marginTop: "10px",
                              color: "black",
                            }}
                          >
                            {prospects.customer.firstName}{" "}
                            {prospects.customer.lastName}
                          </p>
                          <p
                            style={{
                              fontSize: "12px",
                              opacity: 0.5,
                              marginTop: "0px",
                              color: "black",
                            }}
                          >
                            Project - {prospects.projectName}
                          </p>
                        </Box>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        borderTop: "dotted",
                        borderWidth: "1px",
                        borderColor: "#f7f6f9",
                      }}
                    >
                      <Box>
                        <p
                          style={{
                            fontSize: "15px",
                            fontWeight: 600,
                            marginTop: "10px",
                            color: "black",
                          }}
                        >
                          {prospects.projectName}
                        </p>
                        <p
                          style={{
                            fontSize: "12px",
                            opacity: 0.5,
                            marginTop: "0px",
                            color: "black",
                          }}
                        >
                          The assigned seller for this deal is{" "}
                          <strong
                            style={{
                              fontWeight: 900,
                              textDecoration: "underline",
                            }}
                          >
                            {prospects.seller.fullName}
                          </strong>
                          , with any inconvenience, he can be contacted down
                          below
                        </p>
                      </Box>
                      <Box>
                        {prospects.subProspects.length > 1 ? (
                          <>
                            {prospects.subProspects.map((subProspects) => (
                              <Accordion
                                key={prospects.id + "." + count++}
                                sx={{
                                  boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
                                  borderRadius: "5px",
                                  mb: 1,
                                  fontWeight: "950",
                                  letterSpacing: ".5px",
                                  display: "flex",
                                  flexDirection: "column",
                                  backgroundColor: "#ffffff",
                                }}
                              >
                                <AccordionSummary
                                  sx={{ maxHeight: "70px", padding: 0 }}
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      height: "100%",
                                    }}
                                  >
                                    <Box sx={{ pl: 1 }}>
                                      <p
                                        style={{
                                          fontSize: "12px",
                                          opacity: 0.5,
                                          marginTop: "0px",
                                          color: "black",
                                        }}
                                      >
                                        StartDate -{" "}
                                        {getDateOfWeek(
                                          subProspects.startWeek,
                                          subProspects.startYear
                                        )}
                                      </p>
                                      <p
                                        style={{
                                          fontSize: "12px",
                                          opacity: 0.5,
                                          marginTop: "0px",
                                          color: "black",
                                        }}
                                      >
                                        EndDate -{" "}
                                        {getDateOfWeek(
                                          subProspects.endWeek,
                                          subProspects.endYear
                                        )}
                                      </p>
                                    </Box>
                                  </Box>
                                </AccordionSummary>
                                <AccordionDetails
                                  sx={{
                                    borderTop: "dotted",
                                    borderWidth: "1px",
                                    borderColor: "#f7f6f9",
                                  }}
                                >
                                  <Box>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                      }}
                                    >
                                      <Box sx={{ mr: 1 }}>
                                        <NumbersOutlinedIcon
                                          fontSize="inherit"
                                          color="disabled"
                                        />
                                      </Box>
                                      <Box>
                                        <p
                                          style={{
                                            fontSize: "13px",
                                            fontWeight: 600,
                                            marginTop: "0px",
                                            marginBlockStart: "0px",
                                            marginBlockEnd: "0px",
                                            color: "black",
                                          }}
                                        >
                                          Number of Consultants
                                        </p>
                                        <p
                                          style={{
                                            fontSize: "11px",
                                            color: "black",
                                            marginTop: "5px",
                                            opacity: 0.5,
                                          }}
                                        >
                                          {subProspects.numOfConsultants}{" "}
                                          Consultants available
                                        </p>
                                      </Box>
                                    </Box>

                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                      }}
                                    >
                                      <Box sx={{ mr: 1 }}>
                                        <PercentOutlinedIcon
                                          fontSize="inherit"
                                          color="disabled"
                                        />
                                      </Box>
                                      <Box>
                                        <p
                                          style={{
                                            fontSize: "13px",
                                            fontWeight: 600,
                                            marginTop: "0px",
                                            marginBlockStart: "0px",
                                            marginBlockEnd: "0px",
                                            color: "black",
                                          }}
                                        >
                                          Probability
                                        </p>
                                        <p
                                          style={{
                                            fontSize: "11px",
                                            color: "black",
                                            marginTop: "5px",
                                            opacity: 0.5,
                                          }}
                                        >
                                          {subProspects.probability}% - Customer
                                          needs identified
                                        </p>
                                      </Box>
                                    </Box>
                                  </Box>
                                </AccordionDetails>
                              </Accordion>
                            ))}
                          </>
                        ) : (
                          <>
                            <Box
                              sx={{ display: "flex", alignItems: "flex-start" }}
                            >
                              <Box sx={{ mr: 1 }}>
                                <NumbersOutlinedIcon
                                  fontSize="inherit"
                                  color="disabled"
                                />
                              </Box>
                              <Box>
                                <p
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    marginTop: "0px",
                                    marginBlockStart: "0px",
                                    marginBlockEnd: "0px",
                                    color: "black",
                                  }}
                                >
                                  Number of Consultants
                                </p>
                                <p
                                  style={{
                                    fontSize: "11px",
                                    color: "black",
                                    marginTop: "5px",
                                    opacity: 0.5,
                                  }}
                                >
                                  {prospects.subProspects[0].numOfConsultants}{" "}
                                  Consultants available
                                </p>
                              </Box>
                            </Box>

                            <Box
                              sx={{ display: "flex", alignItems: "flex-start" }}
                            >
                              <Box sx={{ mr: 1 }}>
                                <HistoryOutlinedIcon
                                  fontSize="inherit"
                                  color="disabled"
                                />
                              </Box>
                              <Box>
                                <p
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    marginTop: "0px",
                                    marginBlockStart: "0px",
                                    marginBlockEnd: "0px",
                                    color: "black",
                                  }}
                                >
                                  Start Date
                                </p>
                                <p
                                  style={{
                                    fontSize: "11px",
                                    color: "black",
                                    marginTop: "5px",
                                    opacity: 0.5,
                                  }}
                                >
                                  {getDateOfWeek(
                                    prospects.subProspects[0].startWeek,
                                    prospects.subProspects[0].startYear
                                  )}
                                  , Week {prospects.subProspects[0].startWeek}
                                </p>
                              </Box>
                            </Box>

                            <Box
                              sx={{ display: "flex", alignItems: "flex-start" }}
                            >
                              <Box sx={{ mr: 1 }}>
                                <DoneOutlinedIcon
                                  fontSize="inherit"
                                  color="disabled"
                                />
                              </Box>
                              <Box>
                                <p
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    marginTop: "0px",
                                    marginBlockStart: "0px",
                                    marginBlockEnd: "0px",
                                    color: "black",
                                  }}
                                >
                                  End Date
                                </p>
                                <p
                                  style={{
                                    fontSize: "11px",
                                    color: "black",
                                    marginTop: "5px",
                                    opacity: 0.5,
                                  }}
                                >
                                  {getDateOfWeek(
                                    prospects.subProspects[0].endWeek,
                                    prospects.subProspects[0].endYear
                                  )}
                                  , Week {prospects.subProspects[0].endWeek}
                                </p>
                              </Box>
                            </Box>

                            <Box
                              sx={{ display: "flex", alignItems: "flex-start" }}
                            >
                              <Box sx={{ mr: 1 }}>
                                <PercentOutlinedIcon
                                  fontSize="inherit"
                                  color="disabled"
                                />
                              </Box>
                              <Box>
                                <p
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    marginTop: "0px",
                                    marginBlockStart: "0px",
                                    marginBlockEnd: "0px",
                                    color: "black",
                                  }}
                                >
                                  Probability
                                </p>
                                <p
                                  style={{
                                    fontSize: "11px",
                                    color: "black",
                                    marginTop: "5px",
                                    opacity: 0.5,
                                  }}
                                >
                                  {prospects.subProspects[0].probability}% -
                                  Talks has begun
                                </p>
                              </Box>
                            </Box>
                          </>
                        )}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ) : (
                  ""
                )
              ) : (
                ""
              )
            )}
        </Box>

        <Box sx={{ flexBasis: "22%" }}>
          {data?.prospects.items
            .filter((deals) =>
              (deals.customer.firstName + " " + deals.customer.lastName)
                .toLocaleLowerCase()
                .includes(filter.toLocaleLowerCase())
            )
            .map((prospects) =>
              prospects.subProspects.length > 0 ? (
                prospects.subProspects[0].probability == 70 ? (
                  <Accordion
                    key={prospects.id}
                    sx={{
                      boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.1)",
                      borderRadius: "5px",
                      mb: 1,
                      fontWeight: "950",
                      letterSpacing: ".5px",
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <AccordionSummary
                      sx={{ maxHeight: "70px" }}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <Box
                          className="img"
                          sx={{
                            mr: 2,
                            padding: "5px",
                            background: "#f2f6f8",
                            border: "solid",
                            borderColor: "#ecefee",
                            borderWidth: "thin",
                            borderRadius: "100%",
                            height: "25px",
                            width: "25px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Box
                            sx={{
                              borderRadius: "100%",
                              borderColor: "#ecefee",
                              borderWidth: "thin",
                              width: "100%",
                              height: "25px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <p
                              style={{
                                color: "#6a96e9",
                                fontWeight: 900,
                                fontSize: "11px",
                                letterSpacing: "1px",
                              }}
                            >
                              {prospects.customer.firstName.charAt(0)}
                              {prospects.customer.lastName.charAt(0)}
                            </p>
                          </Box>
                        </Box>
                        <Box sx={{ pl: 1 }}>
                          <p
                            style={{
                              fontSize: "15px",
                              fontWeight: 600,
                              marginTop: "10px",
                              color: "black",
                            }}
                          >
                            {prospects.customer.firstName}{" "}
                            {prospects.customer.lastName}
                          </p>
                          <p
                            style={{
                              fontSize: "12px",
                              opacity: 0.5,
                              marginTop: "0px",
                              color: "black",
                            }}
                          >
                            Project - {prospects.projectName}
                          </p>
                        </Box>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        borderTop: "dotted",
                        borderWidth: "1px",
                        borderColor: "#f7f6f9",
                      }}
                    >
                      <Box>
                        <p
                          style={{
                            fontSize: "15px",
                            fontWeight: 600,
                            marginTop: "10px",
                            color: "black",
                          }}
                        >
                          {prospects.projectName}
                        </p>
                        <p
                          style={{
                            fontSize: "12px",
                            opacity: 0.5,
                            marginTop: "0px",
                            color: "black",
                          }}
                        >
                          The assigned seller for this deal is{" "}
                          <strong
                            style={{
                              fontWeight: 900,
                              textDecoration: "underline",
                            }}
                          >
                            {prospects.seller.fullName}
                          </strong>
                          , with any inconvenience, he can be contacted down
                          below
                        </p>
                      </Box>
                      <Box>
                        {prospects.subProspects.length > 1 ? (
                          <>
                            {prospects.subProspects.map((subProspects) => (
                              <Accordion
                                key={prospects.id}
                                sx={{
                                  boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
                                  borderRadius: "5px",
                                  mb: 1,
                                  fontWeight: "950",
                                  letterSpacing: ".5px",
                                  display: "flex",
                                  flexDirection: "column",
                                  backgroundColor: "#ffffff",
                                }}
                              >
                                <AccordionSummary
                                  sx={{ maxHeight: "70px", padding: 0 }}
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      height: "100%",
                                    }}
                                  >
                                    <Box sx={{ pl: 1 }}>
                                      <p
                                        style={{
                                          fontSize: "12px",
                                          opacity: 0.5,
                                          marginTop: "0px",
                                          color: "black",
                                        }}
                                      >
                                        StartDate -{" "}
                                        {getDateOfWeek(
                                          subProspects.startWeek,
                                          subProspects.startYear
                                        )}
                                      </p>
                                      <p
                                        style={{
                                          fontSize: "12px",
                                          opacity: 0.5,
                                          marginTop: "0px",
                                          color: "black",
                                        }}
                                      >
                                        EndDate -{" "}
                                        {getDateOfWeek(
                                          subProspects.endWeek,
                                          subProspects.endYear
                                        )}
                                      </p>
                                    </Box>
                                  </Box>
                                </AccordionSummary>
                                <AccordionDetails
                                  sx={{
                                    borderTop: "dotted",
                                    borderWidth: "1px",
                                    borderColor: "#f7f6f9",
                                  }}
                                >
                                  <Box>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                      }}
                                    >
                                      <Box sx={{ mr: 1 }}>
                                        <NumbersOutlinedIcon
                                          fontSize="inherit"
                                          color="disabled"
                                        />
                                      </Box>
                                      <Box>
                                        <p
                                          style={{
                                            fontSize: "13px",
                                            fontWeight: 600,
                                            marginTop: "0px",
                                            marginBlockStart: "0px",
                                            marginBlockEnd: "0px",
                                            color: "black",
                                          }}
                                        >
                                          Number of Consultants
                                        </p>
                                        <p
                                          style={{
                                            fontSize: "11px",
                                            color: "black",
                                            marginTop: "5px",
                                            opacity: 0.5,
                                          }}
                                        >
                                          {subProspects.numOfConsultants}{" "}
                                          Consultants available
                                        </p>
                                      </Box>
                                    </Box>

                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                      }}
                                    >
                                      <Box sx={{ mr: 1 }}>
                                        <PercentOutlinedIcon
                                          fontSize="inherit"
                                          color="disabled"
                                        />
                                      </Box>
                                      <Box>
                                        <p
                                          style={{
                                            fontSize: "13px",
                                            fontWeight: 600,
                                            marginTop: "0px",
                                            marginBlockStart: "0px",
                                            marginBlockEnd: "0px",
                                            color: "black",
                                          }}
                                        >
                                          Probability
                                        </p>
                                        <p
                                          style={{
                                            fontSize: "11px",
                                            color: "black",
                                            marginTop: "5px",
                                            opacity: 0.5,
                                          }}
                                        >
                                          {subProspects.probability}% - Talks
                                          has begun
                                        </p>
                                      </Box>
                                    </Box>
                                  </Box>
                                </AccordionDetails>
                              </Accordion>
                            ))}
                          </>
                        ) : (
                          <>
                            <Box
                              sx={{ display: "flex", alignItems: "flex-start" }}
                            >
                              <Box sx={{ mr: 1 }}>
                                <NumbersOutlinedIcon
                                  fontSize="inherit"
                                  color="disabled"
                                />
                              </Box>
                              <Box>
                                <p
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    marginTop: "0px",
                                    marginBlockStart: "0px",
                                    marginBlockEnd: "0px",
                                    color: "black",
                                  }}
                                >
                                  Number of Consultants
                                </p>
                                <p
                                  style={{
                                    fontSize: "11px",
                                    color: "black",
                                    marginTop: "5px",
                                    opacity: 0.5,
                                  }}
                                >
                                  {prospects.subProspects[0].numOfConsultants}{" "}
                                  Consultants available
                                </p>
                              </Box>
                            </Box>

                            <Box
                              sx={{ display: "flex", alignItems: "flex-start" }}
                            >
                              <Box sx={{ mr: 1 }}>
                                <HistoryOutlinedIcon
                                  fontSize="inherit"
                                  color="disabled"
                                />
                              </Box>
                              <Box>
                                <p
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    marginTop: "0px",
                                    marginBlockStart: "0px",
                                    marginBlockEnd: "0px",
                                    color: "black",
                                  }}
                                >
                                  Start Date
                                </p>
                                <p
                                  style={{
                                    fontSize: "11px",
                                    color: "black",
                                    marginTop: "5px",
                                    opacity: 0.5,
                                  }}
                                >
                                  {getDateOfWeek(
                                    prospects.subProspects[0].startWeek,
                                    prospects.subProspects[0].startYear
                                  )}
                                  , Week {prospects.subProspects[0].startWeek}
                                </p>
                              </Box>
                            </Box>

                            <Box
                              sx={{ display: "flex", alignItems: "flex-start" }}
                            >
                              <Box sx={{ mr: 1 }}>
                                <DoneOutlinedIcon
                                  fontSize="inherit"
                                  color="disabled"
                                />
                              </Box>
                              <Box>
                                <p
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    marginTop: "0px",
                                    marginBlockStart: "0px",
                                    marginBlockEnd: "0px",
                                    color: "black",
                                  }}
                                >
                                  End Date
                                </p>
                                <p
                                  style={{
                                    fontSize: "11px",
                                    color: "black",
                                    marginTop: "5px",
                                    opacity: 0.5,
                                  }}
                                >
                                  {getDateOfWeek(
                                    prospects.subProspects[0].endWeek,
                                    prospects.subProspects[0].endYear
                                  )}
                                  , Week {prospects.subProspects[0].endWeek}
                                </p>
                              </Box>
                            </Box>

                            <Box
                              sx={{ display: "flex", alignItems: "flex-start" }}
                            >
                              <Box sx={{ mr: 1 }}>
                                <PercentOutlinedIcon
                                  fontSize="inherit"
                                  color="disabled"
                                />
                              </Box>
                              <Box>
                                <p
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    marginTop: "0px",
                                    marginBlockStart: "0px",
                                    marginBlockEnd: "0px",
                                    color: "black",
                                  }}
                                >
                                  Probability
                                </p>
                                <p
                                  style={{
                                    fontSize: "11px",
                                    color: "black",
                                    marginTop: "5px",
                                    opacity: 0.5,
                                  }}
                                >
                                  {prospects.subProspects[0].probability}% -
                                  Talks has begun
                                </p>
                              </Box>
                            </Box>
                          </>
                        )}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ) : (
                  ""
                )
              ) : (
                ""
              )
            )}
        </Box>

        <Box sx={{ flexBasis: "22%" }}>
          {data?.prospects.items
            .filter((deals) =>
              (deals.customer.firstName + " " + deals.customer.lastName)
                .toLocaleLowerCase()
                .includes(filter.toLocaleLowerCase())
            )
            .map((prospects) =>
              prospects.subProspects.length > 0 ? (
                prospects.subProspects[0].probability == 100 ? (
                  <Accordion
                    key={prospects.id}
                    sx={{
                      boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.1)",
                      borderRadius: "5px",
                      mb: 1,
                      fontWeight: "950",
                      letterSpacing: ".5px",
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <AccordionSummary
                      sx={{ maxHeight: "70px" }}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <Box
                          className="img"
                          sx={{
                            mr: 2,
                            padding: "5px",
                            background: "#f2f6f8",
                            border: "solid",
                            borderColor: "#ecefee",
                            borderWidth: "thin",
                            borderRadius: "100%",
                            height: "25px",
                            width: "25px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Box
                            sx={{
                              borderRadius: "100%",
                              borderColor: "#ecefee",
                              borderWidth: "thin",
                              width: "100%",
                              height: "25px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <p
                              style={{
                                color: "#6a96e9",
                                fontWeight: 900,
                                fontSize: "11px",
                                letterSpacing: "1px",
                              }}
                            >
                              {prospects.customer.firstName.charAt(0)}
                              {prospects.customer.lastName.charAt(0)}
                            </p>
                          </Box>
                        </Box>
                        <Box sx={{ pl: 1 }}>
                          <p
                            style={{
                              fontSize: "15px",
                              fontWeight: 600,
                              marginTop: "10px",
                              color: "black",
                            }}
                          >
                            {prospects.customer.firstName}{" "}
                            {prospects.customer.lastName}
                          </p>
                          <p
                            style={{
                              fontSize: "12px",
                              opacity: 0.5,
                              marginTop: "0px",
                              color: "black",
                            }}
                          >
                            Project - {prospects.projectName}
                          </p>
                        </Box>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        borderTop: "dotted",
                        borderWidth: "1px",
                        borderColor: "#f7f6f9",
                      }}
                    >
                      <Box>
                        <p
                          style={{
                            fontSize: "15px",
                            fontWeight: 600,
                            marginTop: "10px",
                            color: "black",
                          }}
                        >
                          {prospects.projectName}
                        </p>
                        <p
                          style={{
                            fontSize: "12px",
                            opacity: 0.5,
                            marginTop: "0px",
                            color: "black",
                          }}
                        >
                          The assigned seller for this deal is{" "}
                          <strong
                            style={{
                              fontWeight: 900,
                              textDecoration: "underline",
                            }}
                          >
                            {prospects.seller.fullName}
                          </strong>
                          , with any inconvenience, he can be contacted down
                          below
                        </p>
                      </Box>
                      <Box>
                        {prospects.subProspects.length > 1 ? (
                          <>
                            {prospects.subProspects.map((subProspects) => (
                              <Accordion
                                key={prospects.id}
                                sx={{
                                  boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
                                  borderRadius: "5px",
                                  mb: 1,
                                  fontWeight: "950",
                                  letterSpacing: ".5px",
                                  display: "flex",
                                  flexDirection: "column",
                                  backgroundColor: "#ffffff",
                                }}
                              >
                                <AccordionSummary
                                  sx={{ maxHeight: "70px", padding: 0 }}
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      height: "100%",
                                    }}
                                  >
                                    <Box sx={{ pl: 1 }}>
                                      <p
                                        style={{
                                          fontSize: "12px",
                                          opacity: 0.5,
                                          marginTop: "0px",
                                          color: "black",
                                        }}
                                      >
                                        Start Date -{" "}
                                        {getDateOfWeek(
                                          subProspects.startWeek,
                                          subProspects.startYear
                                        )}
                                      </p>
                                      <p
                                        style={{
                                          fontSize: "12px",
                                          opacity: 0.5,
                                          marginTop: "0px",
                                          color: "black",
                                        }}
                                      >
                                        EndDate -{" "}
                                        {getDateOfWeek(
                                          subProspects.endWeek,
                                          subProspects.endYear
                                        )}
                                      </p>
                                    </Box>
                                  </Box>
                                </AccordionSummary>
                                <AccordionDetails
                                  sx={{
                                    borderTop: "dotted",
                                    borderWidth: "1px",
                                    borderColor: "#f7f6f9",
                                    margin: "0px",
                                  }}
                                >
                                  <Box>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                      }}
                                    >
                                      <Box sx={{ mr: 1 }}>
                                        <NumbersOutlinedIcon
                                          fontSize="inherit"
                                          color="disabled"
                                        />
                                      </Box>
                                      <Box>
                                        <p
                                          style={{
                                            fontSize: "13px",
                                            fontWeight: 600,
                                            marginTop: "0px",
                                            marginBlockStart: "0px",
                                            marginBlockEnd: "0px",
                                            color: "black",
                                          }}
                                        >
                                          Number of Consultants
                                        </p>
                                        <p
                                          style={{
                                            fontSize: "11px",
                                            color: "black",
                                            marginTop: "5px",
                                            opacity: 0.5,
                                          }}
                                        >
                                          {subProspects.numOfConsultants}{" "}
                                          Consultants available
                                        </p>
                                      </Box>
                                    </Box>

                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                      }}
                                    >
                                      <Box sx={{ mr: 1 }}>
                                        <PercentOutlinedIcon
                                          fontSize="inherit"
                                          color="disabled"
                                        />
                                      </Box>
                                      <Box>
                                        <p
                                          style={{
                                            fontSize: "13px",
                                            fontWeight: 600,
                                            marginTop: "0px",
                                            marginBlockStart: "0px",
                                            marginBlockEnd: "0px",
                                            color: "black",
                                          }}
                                        >
                                          Probability
                                        </p>
                                        <p
                                          style={{
                                            fontSize: "11px",
                                            color: "black",
                                            marginTop: "5px",
                                            opacity: 0.5,
                                          }}
                                        >
                                          {subProspects.probability}% - Deal has
                                          been completed
                                        </p>
                                      </Box>
                                    </Box>
                                  </Box>
                                </AccordionDetails>
                              </Accordion>
                            ))}
                          </>
                        ) : (
                          <>
                            <Box
                              sx={{ display: "flex", alignItems: "flex-start" }}
                            >
                              <Box sx={{ mr: 1 }}>
                                <NumbersOutlinedIcon
                                  fontSize="inherit"
                                  color="disabled"
                                />
                              </Box>
                              <Box>
                                <p
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    marginTop: "0px",
                                    marginBlockStart: "0px",
                                    marginBlockEnd: "0px",
                                    color: "black",
                                  }}
                                >
                                  Number of Consultants
                                </p>
                                <p
                                  style={{
                                    fontSize: "11px",
                                    color: "black",
                                    marginTop: "5px",
                                    opacity: 0.5,
                                  }}
                                >
                                  {prospects.subProspects[0].numOfConsultants}{" "}
                                  Consultants available
                                </p>
                              </Box>
                            </Box>

                            <Box
                              sx={{ display: "flex", alignItems: "flex-start" }}
                            >
                              <Box sx={{ mr: 1 }}>
                                <HistoryOutlinedIcon
                                  fontSize="inherit"
                                  color="disabled"
                                />
                              </Box>
                              <Box>
                                <p
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    marginTop: "0px",
                                    marginBlockStart: "0px",
                                    marginBlockEnd: "0px",
                                    color: "black",
                                  }}
                                >
                                  Start Date
                                </p>
                                <p
                                  style={{
                                    fontSize: "11px",
                                    color: "black",
                                    marginTop: "5px",
                                    opacity: 0.5,
                                  }}
                                >
                                  {getDateOfWeek(
                                    prospects.subProspects[0].startWeek,
                                    prospects.subProspects[0].startYear
                                  )}
                                  , Week {prospects.subProspects[0].startWeek}
                                </p>
                              </Box>
                            </Box>

                            <Box
                              sx={{ display: "flex", alignItems: "flex-start" }}
                            >
                              <Box sx={{ mr: 1 }}>
                                <DoneOutlinedIcon
                                  fontSize="inherit"
                                  color="disabled"
                                />
                              </Box>
                              <Box>
                                <p
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    marginTop: "0px",
                                    marginBlockStart: "0px",
                                    marginBlockEnd: "0px",
                                    color: "black",
                                  }}
                                >
                                  End Date
                                </p>
                                <p
                                  style={{
                                    fontSize: "11px",
                                    color: "black",
                                    marginTop: "5px",
                                    opacity: 0.5,
                                  }}
                                >
                                  {getDateOfWeek(
                                    prospects.subProspects[0].endWeek,
                                    prospects.subProspects[0].endYear
                                  )}
                                  , Week {prospects.subProspects[0].endWeek}
                                </p>
                              </Box>
                            </Box>

                            <Box
                              sx={{ display: "flex", alignItems: "flex-start" }}
                            >
                              <Box sx={{ mr: 1 }}>
                                <PercentOutlinedIcon
                                  fontSize="inherit"
                                  color="disabled"
                                />
                              </Box>
                              <Box>
                                <p
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    marginTop: "0px",
                                    marginBlockStart: "0px",
                                    marginBlockEnd: "0px",
                                    color: "black",
                                  }}
                                >
                                  Probability
                                </p>
                                <p
                                  style={{
                                    fontSize: "11px",
                                    color: "black",
                                    marginTop: "5px",
                                    opacity: 0.5,
                                  }}
                                >
                                  {prospects.subProspects[0].probability}% -
                                  Talks has begun
                                </p>
                              </Box>
                            </Box>
                          </>
                        )}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ) : (
                  ""
                )
              ) : (
                ""
              )
            )}
        </Box>
      </Box>

      <ToastContainer />
    </Box>
  );
};
