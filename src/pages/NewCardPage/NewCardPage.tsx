import React from 'react';
import AddCardForm from '../../components/AddCardForm/AddCardForm';
import CardList from '../../components/CardList/CardList';
import { ICard } from '../../Interfaces/ICard';

interface IState {
  newCards: ICard[];
}

class NewCardPage extends React.Component<object, IState> {
  constructor(props: object) {
    super(props);

    this.state = {
      newCards: [],
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(data: ICard) {
    this.setState({
      newCards: [...this.state.newCards, data],
    });
  }

  render() {
    const cards = this.state.newCards;
    return (
      <div>
        <h2>Add new card</h2>
        <div>
          <AddCardForm onSubmit={this.onSubmit} />
        </div>
        <div>
          <CardList cards={cards} />
        </div>
      </div>
    );
  }
}

export default NewCardPage;
