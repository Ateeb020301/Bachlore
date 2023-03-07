import React from 'react';
import iconX from '../../images/x.svg';

import './ModalComponent.css';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose }) => {
  const outsideRef = React.useRef(null);

  const handleCloseOnOverlay = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === outsideRef.current) {
      onClose();
    }
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
          onClick={onClose}
        >
          <img src={iconX} alt={'close'} />
        </button>
        <div className={'modalTitle'}>
          {title}
        </div>
        <div className={'modalContent'}>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Ea iure veritatis similique ad, aperiam quae aspernatur distinctio
            consequatur commodi architecto ratione quod, deserunt porro vitae
            incidunt rerum facilis! Cupiditate, iusto.
          </p>
        </div>
      </div>
    </div>
  ) : null;
};