import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    user: {},
  }

  componentDidMount = async () => {
    const user = await getUser();
    this.setState({
      user,
    });
  }

  render() {
    const {
      user,
    } = this.state;

    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">
          { user.name }
        </p>
        { !user.name && <div>Carregando...</div> }
        <div
          className="siteName"
        >
          <h3 className="title">TrybeTunes</h3>
        </div>
        <Link data-testid="link-to-search" to="/search"> Search </Link>
        <Link data-testid="link-to-favorites" to="/favorites"> Favorites </Link>
        <Link data-testid="link-to-profile" to="/profile"> Profile </Link>
      </header>
    );
  }
}
export default Header;
