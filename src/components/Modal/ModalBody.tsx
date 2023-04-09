import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

type IProps = {
  children: React.ReactNode;
};

const Modal: FC<IProps> = (props) => {
  const modalRoot = document.getElementById('modal-root');
  if (modalRoot) {
    modalRoot.className = styles.modal;
    return ReactDOM.createPortal(props.children, modalRoot);
  }
  return <div>Error</div>;
};

export default Modal;
