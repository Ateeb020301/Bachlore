import React from 'react';
import iconX from '../Utils/x.png';
import { FormProvider } from '../../components/FormInfo/context/FormContext';
import { Router } from '../../components/FormInfo/routes/router';
import GlobalStyled from '../../components/FormInfo/components/styles/GlobalStyledComponents/GlobalStyled';
import { FormStep1 } from '../../components/FormInfo/pages/FormStep1/intex';
import { FormStep2 } from '../../components/FormInfo/pages/FormStep2';
import { FormStep3 } from '../../components/FormInfo/pages/FormStep3';
import { FormStep4 } from '../../components/FormInfo/pages/FormStep4';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import './ModalComponent.css';
import { Seller } from '../seller/Seller';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose }) => {
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
        {/* <div className={'modalTitle'}>
          {title}
        </div> */}
        <div className={'modalContent'}>
          <FormProvider>
              <Routes>
                <Route path='/'  element={<FormStep1/>} />
                <Route path='/step2' element={<FormStep2/>} />
                <Route path='/step3' element={<FormStep3/>} />
                <Route path='/step4' element={<FormStep4/>} />
              </Routes>
            <GlobalStyled />
          </FormProvider>
        </div>
        
      </div>

    </div>
  ) : null;
};