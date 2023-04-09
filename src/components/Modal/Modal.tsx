import React, { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ModalBody from './ModalBody';
import styles from './Modal.module.css';

type IProps = {
  children: React.ReactNode;
  onClose: () => void;
};
const modalRoot = document.getElementById('modal-root');

const Modal: FC<IProps> = (props) => {
  useEffect(() => {
    const onClose = (e: MouseEvent) => {
      if (e.target !== modalRoot) {
        return;
      }
      props.onClose();
    };
    if (modalRoot) {
      modalRoot.className = styles.overlay;
      modalRoot.addEventListener('click', onClose);
    }
    return () => {
      if (modalRoot) {
        modalRoot.className = '';
        modalRoot.addEventListener('click', onClose);
      }
    };
  }, [props]);
  if (modalRoot) {
    return ReactDOM.createPortal(
      <ModalBody onClose={props.onClose}>{props.children}</ModalBody>,
      modalRoot
    );
  }
  return <div>Error</div>;
};

export default Modal;
