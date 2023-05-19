import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
  Box,
  Breadcrumbs,
  ButtonBase,
  Link,
  Menu,
  MenuItem,
} from "@mui/material";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { SellerInterface } from "../../api/prospects/payloads";
import {
  DELETE_PROSPECT,
  DELETE_SUBPROSPECT,
  GET_SELLER_NAMES,
} from "../../api/prospects/queries";
import { GET_ACTIVITYLOG } from "../../api/activitylog";
import { DELETE_SELLER, GET_SELLERS } from "../../api/sellers";
import { useNavigate } from "react-router-dom";
import { ModalEdit } from "./EditModal";
import { GET_CUSTOMER } from "../../api/customer";

interface SellerDisplayProps {
  sellers: SellerInterface;
}

//GQL pagination skip const
const skipAmount = 0;
//GQL pagination take const
const takeAmount = 50;

export const SellerDisplay: React.FC<SellerDisplayProps> = ({ sellers }) => {
  let str;
  let acronym;

  const [isModalEditOpen, setState] = React.useState(false);
  const navigate = useNavigate();
  const toggleEdit = () => setState(!isModalEditOpen);

  if (sellers != undefined) {
    str = sellers.fullName;
    acronym = str
      .split(/\s/)
      .reduce((response, word) => (response += word.slice(0, 1)), "");
  }

  const [deleteProspect] = useMutation<number, { input: { id: number } }>(
    DELETE_PROSPECT,
    {
      refetchQueries: [
        {
          query: GET_SELLERS,
          variables: { skipAmount: skipAmount, takeAmount: takeAmount },
        },
        {
          query: GET_ACTIVITYLOG,
        },
      ],
      awaitRefetchQueries: true,
    }
  );

  const [deleteSubProspect] = useMutation<number, { input: { id: number } }>(
    DELETE_SUBPROSPECT,
    {
      refetchQueries: [
        {
          query: GET_SELLERS,
          variables: { skipAmount: skipAmount, takeAmount: takeAmount },
        },
        {
          query: GET_ACTIVITYLOG,
        },
      ],
      awaitRefetchQueries: true,
    }
  );
  const [deleteSeller] = useMutation<number, { input: { id: number } }>(
    DELETE_SELLER,
    {
      refetchQueries: [
        {
          query: GET_SELLERS,
          variables: { skipAmount: skipAmount, takeAmount: takeAmount },
        },
        {
          query: GET_SELLER_NAMES,
          variables: { skipAmount: skipAmount, takeAmount: takeAmount },
        },
        {
          query: GET_ACTIVITYLOG,
        },
        {
          query: GET_CUSTOMER,
        },
      ],
      awaitRefetchQueries: true,
    }
  );
  let decodedId: string;
  const sendDeleteRequest = (sellers: SellerInterface) => {
    decodedId = new TextDecoder()
      .decode(
        Uint8Array.from(atob(sellers.id.toString()), (c) => c.charCodeAt(0))
      )
      .replace(/[^0-9]/g, "");

    if (sellers.prospects.length === 0) {
      deleteSeller({ variables: { input: { id: parseInt(decodedId) } } })
        .then((res) => {
          sellers.prospects.forEach((prospect) => {
            deleteProspect({ variables: { input: { id: prospect.id } } })
              .then((res) => {
                prospect.subProspects.forEach((subprospect) => {
                  deleteSubProspect({
                    variables: { input: { id: subprospect.id } },
                  })
                    .then((res) => {})
                    .catch((e) => {
                      toast.error(
                        "Noe gikk galt ved sletting av SubProspects til Selgeren",
                        {
                          position: toast.POSITION.BOTTOM_RIGHT,
                        }
                      );
                      console.log(e);
                    });
                });
              })
              .catch((e) => {
                toast.error(
                  "Noe gikk galt ved sletting av Prospektet til Selgeren",
                  {
                    position: toast.POSITION.BOTTOM_RIGHT,
                  }
                );
                console.log(e);
              });
          });
          toast.success("Selger slettet", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        })
        .catch((e) => {
          toast.error("Noe gikk galt ved sletting av Selger", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          console.log(e);
        });
    } else {
      toast.error("Selgeren er tilkoblet til prospekter", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "400px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
        my: 2,
        borderRadius: "10px",
        background: "#ffffff",
      }}
    >
      <Box
        className={"headerCard"}
        sx={{
          display: "flex",
          my: 2,
          mx: 1,
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            height: "15%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <ButtonBase
                    sx={{ color: "#8093e6" }}
                    {...bindTrigger(popupState)}
                    disableRipple
                    disableTouchRipple
                  >
                    <MoreHorizIcon fontSize="medium" />
                  </ButtonBase>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "5px",
                        mb: 1,
                      }}
                      onClick={popupState.close}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <ButtonBase onClick={() => sendDeleteRequest(sellers)}>
                          Delete Consultant
                        </ButtonBase>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <DeleteIcon fontSize={"small"} />
                      </Box>
                    </MenuItem>
                    <MenuItem
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "5px",
                        mt: 1,
                      }}
                      onClick={popupState.close}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <ButtonBase onClick={toggleEdit}>
                          Edit Consultant
                        </ButtonBase>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <EditIcon fontSize={"small"} />
                      </Box>
                    </MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          </Box>
        </Box>
      </Box>
      <Box
        className={"bodyCard"}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box>
          <Box
            id="img"
            sx={{
              padding: "5px",
              background: "#f2f6f8",
              border: "solid",
              borderColor: "#ecefee",
              borderWidth: "thin",
              borderRadius: "100%",
              height: "75px",
              width: "75px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                border: "solid",
                borderRadius: "100%",
                borderColor: "#ecefee",
                borderWidth: "thin",
                width: "100%",
                height: "100%",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  color: "#6a96e9",
                  fontWeight: 900,
                  fontSize: "24px",
                  letterSpacing: "2px",
                }}
              >
                {acronym}
              </p>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "#5d5860" }}>{sellers.fullName}</h3>
          <h4 style={{ opacity: 0.7 }}>{sellers.email}</h4>
        </Box>
      </Box>
      <Box
        className={"footerCard"}
        sx={{
          display: "flex",
          my: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            alignItems: "center",
            borderRight: "1px gray dashed",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <h4 style={{ color: "#5d5860", margin: "10px" }}>
              Employment Date
            </h4>
          </Box>
          <Box sx={{ flex: 1 }}>
            <h5 style={{ opacity: 0.7, margin: "5px" }}>
              {sellers.employmentDate}
            </h5>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            alignItems: "center",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <h4 style={{ color: "#5d5860", margin: "10px" }}>
              Resignation Date
            </h4>
          </Box>
          <Box sx={{ flex: 1 }}>
            <h5 style={{ opacity: 0.7, margin: "5px" }}>
              {" "}
              {sellers.resignationDate != null
                ? sellers.resignationDate
                : "-"}{" "}
            </h5>
          </Box>
        </Box>
      </Box>
      <ModalEdit
        title={"Edit Seller"}
        isOpen={isModalEditOpen}
        onClose={toggleEdit}
        seller={sellers}
      />
    </Box>
  );
};
