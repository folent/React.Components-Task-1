import React from 'react';
import categories from '../../db/categories.json';
import styles from './AddCardForm.module.css';
import { ICard } from '../../Interfaces/ICard';
import { IProps, IState } from './types';

class AddCardForm extends React.Component<IProps, IState> {
  formRef: React.RefObject<HTMLFormElement>;
  nameRef: React.RefObject<HTMLInputElement>;
  descRef: React.RefObject<HTMLTextAreaElement>;
  priceRef: React.RefObject<HTMLInputElement>;
  dateRef: React.RefObject<HTMLInputElement>;
  categoryRef: React.RefObject<HTMLSelectElement>;
  rulesRef: React.RefObject<HTMLInputElement>;
  addToSliderRef: React.RefObject<HTMLInputElement>;
  NotAddToSliderRef: React.RefObject<HTMLInputElement>;
  imageRef: React.RefObject<HTMLInputElement>;
  constructor(props: IProps) {
    super(props);
    this.formRef = React.createRef();
    this.nameRef = React.createRef();
    this.descRef = React.createRef();
    this.priceRef = React.createRef();
    this.dateRef = React.createRef();
    this.categoryRef = React.createRef();
    this.rulesRef = React.createRef();
    this.addToSliderRef = React.createRef();
    this.NotAddToSliderRef = React.createRef();
    this.imageRef = React.createRef();

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeAddToSlider = this.onChangeAddToSlider.bind(this);

    this.state = {
      addToSlider: false,
      showMessage: false,
      nameEmpty: false,
      descEmpty: false,
      priceNotNumber: false,
      dateEmpty: false,
      disagreeWithRules: false,
    };
  }
  categoriesList = categories.map((item) => {
    return (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    );
  });
  showMessage() {
    this.setState({
      showMessage: true,
    });
    setTimeout(() => {
      this.setState({
        showMessage: false,
      });
    }, 3000);
  }
  onChangeAddToSlider(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    const addToSlider = (target.value === 'add' && target.checked) || false;
    this.setState({
      addToSlider,
    });
  }
  resetForm() {
    this.formRef.current?.reset();
    this.setState({
      addToSlider: false,
    });
  }

  validateCheckboxes(rules: boolean) {
    this.setState({
      disagreeWithRules: !rules,
    });
    return rules;
  }

  validateInputForNumber(value: string | undefined) {
    value = value?.trim();
    const isNumber = Number(value) > 0;
    this.setState({
      priceNotNumber: !isNumber,
    });
    return isNumber;
  }

  validateInputsForEmpty(
    name: string | undefined,
    desc: string | undefined,
    date: string | undefined
  ) {
    const isNameEmpty = !name || !name.length;
    const isDescEmpty = !desc || !desc.length;
    const isDateEmpty = !date || !date.length;

    this.setState({
      nameEmpty: isNameEmpty,
      descEmpty: isDescEmpty,
      dateEmpty: isDateEmpty,
    });
    return !isNameEmpty && !isDescEmpty && !isDateEmpty;
  }
  onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = this.nameRef.current?.value;
    const description = this.descRef.current?.value;
    const price = this.priceRef.current?.value;
    const date = this.dateRef.current?.value;
    const category = this.categoryRef.current?.value;
    const rules = this.rulesRef.current?.checked as boolean;
    const addToSlider = this.addToSliderRef.current?.checked;
    const image = this.imageRef.current?.files && this.imageRef.current.files[0];

    if (!this.validateInputsForEmpty(name, description, date)) {
      return;
    }
    if (!this.validateInputForNumber(price)) {
      return;
    }
    if (!this.validateCheckboxes(rules)) {
      return;
    }

    const data: ICard = {
      id: Number(new Date()),
      name: name ?? '',
      description: description ?? '',
      price: Number(price) ?? 0,
      createDate: date ?? new Date().toISOString(),
      category: category ?? '1',
      addToSlider: addToSlider ?? false,
      image: (image && URL.createObjectURL(image)) ?? null,
    };

    this.props.onSubmit(data);
    this.resetForm();
    this.showMessage();
  }
  render() {
    const {
      addToSlider,
      showMessage,
      nameEmpty,
      descEmpty,
      dateEmpty,
      disagreeWithRules,
      priceNotNumber,
    } = this.state;
    return (
      <form
        onSubmit={this.onSubmit}
        ref={this.formRef}
        className={styles.wrapper}
        role="Add-card-form"
      >
        {showMessage && <div>New card has added!</div>}
        <div>
          <input
            type="text"
            ref={this.nameRef}
            className={styles.input}
            placeholder="Title"
            style={{ borderColor: nameEmpty ? 'red' : '' }}
            data-testid="name-input"
          />
          {nameEmpty && <div className={styles.error}>Name field should not empty</div>}
        </div>
        <div>
          <textarea
            ref={this.descRef}
            className={styles.input}
            placeholder="Description"
            style={{ borderColor: descEmpty ? 'red' : '' }}
            data-testid="desc-textarea"
          />
          {descEmpty && <div className={styles.error}>Description field should not empty</div>}
        </div>
        <div>
          <input
            ref={this.priceRef}
            className={styles.input}
            placeholder="Price"
            style={{ borderColor: descEmpty ? 'red' : '' }}
            data-testid="price-input"
          />
          {priceNotNumber && (
            <div className={styles.error}>Price field should be number and more than 0</div>
          )}
        </div>
        <div>
          <input
            type="date"
            ref={this.dateRef}
            className={styles.input}
            style={{ borderColor: dateEmpty ? 'red' : '' }}
            data-testid="date-input"
          />
          {dateEmpty && <div className={styles.error}>Date field should not empty</div>}
        </div>
        <div>
          <label>
            Category
            <select ref={this.categoryRef} className={styles.input}>
              {this.categoriesList}
            </select>
          </label>
        </div>
        <div>
          <label className={styles.label}>Add to slider</label>
          <label>
            Yes
            <input
              type="radio"
              value="add"
              checked={addToSlider}
              onChange={this.onChangeAddToSlider}
              ref={this.addToSliderRef}
            />
          </label>
          <label>
            No
            <input
              type="radio"
              value="notAdd"
              checked={!addToSlider}
              onChange={this.onChangeAddToSlider}
              ref={this.NotAddToSliderRef}
            />
          </label>
        </div>
        <div>
          <label htmlFor="agree">I agree with rules</label>
          <input type="checkbox" id="agree" ref={this.rulesRef} data-testid="rules-checkbox" />
          {disagreeWithRules && <div className={styles.error}>You have to agree to the rules</div>}
        </div>
        <div>
          <input type="file" ref={this.imageRef} />
        </div>
        <div>
          <button type="submit" data-testid="submit-btn">
            Add
          </button>
        </div>
      </form>
    );
  }
}

export default AddCardForm;
