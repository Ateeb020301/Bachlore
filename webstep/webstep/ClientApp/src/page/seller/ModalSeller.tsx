import React from "react";
import { FormProvider } from "../../components/FormInfo/context/FormContext";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./AddModal.css";
import { AddForm } from "./addForm";
import CloseIcon from "@mui/icons-material/Close";

interface ModalSellerProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ModalSeller: React.FC<ModalSellerProps> = ({
  title,
  isOpen,
  onClose,
}) => {
  const outsideRef = React.useRef(null);
  const navigate = useNavigate();

  const handleCloseOnOverlay = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (e.target === outsideRef.current) {
      onClose();
      navigate("/seller");
    }
  };

  function closeIcon() {
    onClose();
    navigate("/seller");
  }

  return isOpen ? (
    <div className={"modal"}>
      <div
        ref={outsideRef}
        className={"modal__overlay"}
        onClick={handleCloseOnOverlay}
      />
      <div className={"modal__box"}>
        <div className={"modalWrapper"}>
          <div className={"header"}>
            <div className={"headerTextCont"}>
              <span className={"headerText"}>Add New Seller</span>
            </div>
            <div className={"headerButton"}>
              <CloseIcon onClick={closeIcon} className={"modal__closeIcon"} />
            </div>
          </div>

          <div className={"modalBody"}>
            <AddForm onClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
