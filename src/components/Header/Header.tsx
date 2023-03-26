import React from 'react';
import { Link } from 'react-router-dom';
import { IHeaderState } from './IHeaderState';
import styles from './header.module.css';
import Logo from '../Logo/Logo';

class Header extends React.Component<object, IHeaderState> {
  constructor(props: object) {
    super(props);
    this.state = {
      pathNames: {
        '/': 'HomePage',
        '/about': 'About Us',
        '/add': 'Add new card',
      },
    };
  }
  render(): JSX.Element {
    return (
      <div className={styles.header}>
        <Logo />
        <div className={styles.wrapper}>
          <div>
            Current page:{' '}
            <strong>{this.state.pathNames[window.location.pathname] ?? 'Page not found'}</strong>
          </div>
          <div className={styles.links}>
            <Link to={'/'}>Home page</Link>
            <Link to={'/about'}>About Us</Link>
            <Link to={'/add'}>Add card</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
