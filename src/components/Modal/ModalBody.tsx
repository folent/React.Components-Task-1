import React, { FC } from 'react';
import styles from './Modal.module.css';

type IProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const ModalBody: FC<IProps> = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.controls}>
        <span onClick={props.onClose} className={styles.closeButton}>
          &times;
        </span>
      </div>
      {props.children}
    </div>
  );
};

export default ModalBody;
