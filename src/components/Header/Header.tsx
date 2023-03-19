import React from 'react';
import { Link } from 'react-router-dom';
import { IHeaderState } from './IHeaderState';
import './header.css';
import Logo from '../Logo/Logo';

class Header extends React.Component<null, IHeaderState> {
  constructor(props: null) {
    super(props);
    this.state = {
      pathNames: {
        '/': 'HomePage',
        '/about': 'About Us',
      },
    };
  }
  render(): JSX.Element {
    return (
      <div className="header">
        <Logo />
        <div className="wrapper">
          <div>
            Current page:{' '}
            <strong>{this.state.pathNames[window.location.pathname] ?? 'Page not found'}</strong>
          </div>
          <div className="links">
            <Link to={'/'}>Home page</Link>
            <Link to={'/about'}>About Us</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
