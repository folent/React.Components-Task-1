import React from 'react';
import { Link } from 'react-router-dom';

class Logo extends React.Component {
  render() {
    return <Link to={'/'}>MyReactApp</Link>;
  }
}

export default Logo;
