import * as C from "./styles";
import { Theme } from "../../components/Theme/intex";
import { useForm, FormActions } from "../../context/FormContext";
import { useEffect } from "react";
import { ReactComponent as CheckIcon } from "../../svgs/check.svg";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Box, Button } from "@mui/material";

interface Form3Props {
  onClose: () => void;
}

export const FormStep3: React.FC<Form3Props> = ({ onClose }) => {
  const { state, dispatch } = useForm();
  const navigate = useNavigate();

  function handleClose() {
    onClose();
    navigate("/belegg");
  }

  useEffect(() => {
    if (state.name === "") {
      navigate("/belegg");
    } else {
      dispatch({
        type: FormActions.setCurrentStep,
        payload: 3,
      });
    }
  }, []);

  return (
    <Theme>
      <C.Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>Finish</h2>
        <p>Finito!</p>

        <C.IconArea>
          <CheckIcon fill="rgb(91, 24, 153)" width={120} height={120} />
        </C.IconArea>

        <Box>
          <Button
            variant="contained"
            sx={{ background: "#5b1899" }}
            size="large"
            onClick={handleClose}
          >
            Close
          </Button>
        </Box>
      </C.Container>
    </Theme>
  );
};
