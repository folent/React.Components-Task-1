import styles from '../../AddCardForm/AddCardForm.module.css';
import React from 'react';

type IProps = {
  type: string;
  checked?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
  isError: boolean;
  error: string;
  placeholder?: string;
  dataTestId?: string;
};

const Input = React.forwardRef(
  (
    { type, isError, error, className, placeholder, onChange, value, checked, dataTestId }: IProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div>
        <input
          type={type}
          ref={ref}
          className={className}
          onChange={onChange}
          value={value}
          checked={checked}
          placeholder={placeholder}
          style={{ borderColor: isError ? 'red' : '' }}
          data-testid={dataTestId}
        />
        {isError && <div className={styles.error}>{error}</div>}
      </div>
    );
  }
);

export default Input;
