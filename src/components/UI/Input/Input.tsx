import React from 'react';
import { FieldError, FieldErrorsImpl, Merge, UseFormRegisterReturn } from 'react-hook-form';
import styles from '../../AddCardForm/AddCardForm.module.css';

type IProps = {
  type: string;
  register: () => UseFormRegisterReturn<string>;
  checked?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl> | undefined;
  placeholder?: string;
  dataTestId?: string;
};

const Input: React.FC<IProps> = ({
  type,
  register,
  error,
  className,
  placeholder,
  onChange,
  value,
  checked,
  dataTestId,
}) => {
  return (
    <div>
      <input
        type={type}
        {...register()}
        className={className + ` ${error && styles.errorBorder}`}
        onChange={onChange}
        value={value}
        checked={checked}
        placeholder={placeholder}
        data-testid={dataTestId}
      />
      {error && <p className={styles.error}>{error.toString()}</p>}
    </div>
  );
};

export default Input;
