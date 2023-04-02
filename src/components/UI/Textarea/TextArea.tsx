import styles from '../../AddCardForm/AddCardForm.module.css';
import React from 'react';
import { FieldError, FieldErrorsImpl, Merge, UseFormRegisterReturn } from 'react-hook-form';

type IProps = {
  register: () => UseFormRegisterReturn<string>;
  className: string;
  error: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  placeholder?: string;
  dataTestId?: string;
};

const TextArea: React.FC<IProps> = ({ register, error, className, placeholder, dataTestId }) => {
  return (
    <div>
      <textarea
        {...register()}
        className={className + ` ${error && styles.errorBorder}`}
        placeholder={placeholder}
        data-testid={dataTestId}
      />
      {error && <p className={styles.error}>{error.toString()}</p>}
    </div>
  );
};

export default TextArea;
