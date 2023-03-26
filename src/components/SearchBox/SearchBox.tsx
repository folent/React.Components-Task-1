import React from 'react';
import './SearchBox.css';

interface IState {
  value: string;
}

class SearchBox extends React.Component<object, IState> {
  constructor(props: object) {
    super(props);
    this.state = {
      value: '',
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', () => {
      window.localStorage.setItem('last_search', this.state.value);
    });
    const lastSearch = localStorage.getItem('last_search');
    if (lastSearch) {
      this.onChange(lastSearch);
    }
  }
  componentWillUnmount() {
    window.localStorage.setItem('last_search', this.state.value);
    window.removeEventListener('beforeunload', () => {
      window.localStorage.setItem('last_search', this.state.value);
    });
  }

  onChange(value: string) {
    this.setState({
      value,
    });
  }

  render() {
    return (
      <>
        <input
          type="search"
          className="search"
          value={this.state.value}
          onChange={(e) => this.onChange(e.target.value)}
        />
      </>
    );
  }
}

export default SearchBox;
