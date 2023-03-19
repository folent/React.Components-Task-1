import React from 'react';
import CardList from '../../components/CardList/CardList';
import cards from '../../db/data.json';
import SearchBox from '../../components/SearchBox/SearchBox';
import { IStateHomePage } from './IStateHomePage';

class HomePage extends React.Component<null, IStateHomePage> {
  constructor(props: never) {
    super(props);
    this.state = {
      items: [],
    };
  }
  componentDidMount() {
    this.setState({
      items: cards,
    });
  }

  render() {
    return (
      <>
        <h2>Home page</h2>
        <SearchBox />
        <CardList cards={this.state.items} />
      </>
    );
  }
}
export default HomePage;
