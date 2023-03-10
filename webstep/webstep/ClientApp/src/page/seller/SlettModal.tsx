import React from 'react';
import iconX from '../Utils/x.png';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { Seller } from './seller';
import { SellerContainer } from './SellerContainer';
import './SlettModal.css'

interface ModalSlettProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ModalSlett: React.FC<ModalSlettProps> = ({ title, isOpen, onClose }) => {
  const outsideRef = React.useRef(null);
  const navigate = useNavigate();

  const handleCloseOnOverlay = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === outsideRef.current) {
      onClose();
      navigate('/seller')
    }
  }
  
  function closeIcon(){
    onClose();
    navigate('/seller')
  }

  return isOpen ? (
    <div className={'modal'}>
      <div
        ref={outsideRef}
        className={'modal__overlay'}
        onClick={handleCloseOnOverlay}
      />
      <div className={'modal__box'}>
        <button
          className={'modal__close'}
          onClick={closeIcon}
        >
          <img src={iconX} alt={'close'} />
        </button>
        <div>
        <SellerContainer/>  
        </div>
        
      </div>

    </div>
  ) : null;
};