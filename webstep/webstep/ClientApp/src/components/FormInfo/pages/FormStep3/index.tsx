import * as C from "./styles";
import { Theme } from "../../components/Theme/intex";
import { useForm, FormActions } from "../../context/FormContext";
import { useEffect } from "react";
import { ReactComponent as CheckIcon } from "../../svgs/check.svg";
import { useNavigate } from "react-router-dom";
import React from "react";

export const FormStep3 = () => {
  const { state, dispatch } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.name === "") {
      navigate("/");
    } else {
      dispatch({
        type: FormActions.setCurrentStep,
        payload: 3,
      });
    }
  }, []);

  return (
    <Theme>
      <C.Container>
        <h2>Finish</h2>
        <p>Finito!</p>

        <C.IconArea>
          <CheckIcon fill="rgb(91, 24, 153)" width={120} height={120} />
        </C.IconArea>
      </C.Container>
    </Theme>
  );
};
