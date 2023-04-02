import React, { useRef, useState } from 'react';
import categories from '../../db/categories.json';
import styles from './AddCardForm.module.css';
import { ICard } from '../../Interfaces/ICard';
import { IProps } from './types';
import Input from '../UI/Input/Input';
import TextArea from '../UI/Textarea/TextArea';
import { useForm } from 'react-hook-form';

const AddCardForm: React.FC<IProps> = (props) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [addToSlider, setAddToSlider] = useState<boolean>(false);

  const categoriesList = categories.map((item) => {
    return (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    );
  });
  const showSuccessMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };
  const onChangeAddToSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const addToSlider = (target.value === 'add' && target.checked) || false;
    setAddToSlider(addToSlider);
  };
  const resetForm = () => {
    reset();
    setAddToSlider(false);
  };

  const onSubmit = (data: any) => {
    const { name, description, price, createDate, category, addToSlider, image } = data;
    const payload: ICard = {
      id: Number(new Date()),
      name: name ?? '',
      description: description ?? '',
      price: Number(price) ?? 0,
      createDate: createDate ?? new Date().toISOString(),
      category: category ?? '1',
      addToSlider: addToSlider ?? false,
      image: image.length > 0 ? URL.createObjectURL(image[0]) : null,
    };

    props.onSubmit(payload);
    // resetForm();
    showSuccessMessage();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper} role="Add-card-form">
      {showMessage && <div className={styles.success}>New card has added!</div>}
      <Input
        type={'text'}
        register={() =>
          register('name', { required: { value: true, message: 'Name field should not empty' } })
        }
        className={styles.input}
        placeholder={'Title'}
        error={errors.name?.message}
        dataTestId={'name-input'}
      />
      <TextArea
        register={() =>
          register('description', {
            required: { value: true, message: 'Description field should not empty' },
          })
        }
        className={styles.input}
        placeholder="Description"
        error={errors.description?.message}
        dataTestId={'desc-textarea'}
      />
      <Input
        register={() =>
          register('price', {
            validate: (value) => Number(value) > 0,
          })
        }
        type={'text'}
        className={styles.input}
        placeholder={'Price'}
        error={errors.price && 'Price field should be number and more than 0'}
        dataTestId={'price-input'}
      />
      <Input
        register={() =>
          register('createDate', {
            required: { value: true, message: 'Date field should not empty' },
          })
        }
        type={'date'}
        className={styles.input}
        error={errors.createDate?.message}
        dataTestId={'date-input'}
      />
      <label>
        Category
        <select {...register('category')} className={styles.input}>
          {categoriesList}
        </select>
      </label>
      <div>
        <div>Add to slider</div>
        <label className={styles.label}>
          Yes
          <Input
            register={() => register('addToSlider')}
            type={'radio'}
            checked={addToSlider}
            value={'add'}
            onChange={onChangeAddToSlider}
          />
        </label>
        <label className={styles.label}>
          No
          <Input
            register={() => register('notAddToSlider')}
            type={'radio'}
            checked={!addToSlider}
            value={'notAdd'}
            onChange={onChangeAddToSlider}
            className={styles.input}
          />
        </label>
      </div>
      <label className={styles.label}>
        I agree with rules
        <Input
          register={() =>
            register('rules', {
              required: { value: true, message: "You have to agree to the rules'" },
            })
          }
          type={'checkbox'}
          className={styles.input}
          error={errors.rules?.message}
          dataTestId={'rules-checkbox'}
        />
      </label>
      <Input register={() => register('image')} type={'file'} />
      <div>
        <button type="submit" data-testid="submit-btn">
          Add
        </button>
      </div>
    </form>
  );
};

export default AddCardForm;
