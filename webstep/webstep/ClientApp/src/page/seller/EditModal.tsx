import React from 'react';
import iconX from '../Utils/x.png';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import '../Utils/ModalComponent.css';
import { Seller } from '../seller/seller';

interface ModalEditProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ModalEdit: React.FC<ModalEditProps> = ({ title, isOpen, onClose }) => {
  const outsideRef = React.useRef(null);
  const navigate = useNavigate();

  const closeOnOverlay = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === outsideRef.current) {
      onClose();
    }
  }
  
  function closeIcon(){
    onClose();
  }

  return isOpen ? (
    <div className={'modal'}>
      <div
        ref={outsideRef}
        className={'modal__overlay'}
        onClick={closeOnOverlay}
      />
      <div className={'modal__box'}>
        <button
          className={'modal__close'}
          onClick={closeIcon}
        >
          <img src={iconX} alt={'close'} />
        </button>
        <div className={'modalTitle'}>
          {title}
        </div>
        <div className={'modalContent'}>

        </div>
        
      </div>

    </div>
  ) : null;
};