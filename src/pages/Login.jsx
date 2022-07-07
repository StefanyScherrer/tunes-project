import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    login: '',
    changeOfButton: true,
    loading: false,
    nope: false,
  };

      handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({
          [name]: value,
        }, this.handleEnableButton);
      };

      handleEnableButton = () => {
        const { login } = this.state;
        const minCharacters = 3;
        if (login.length >= minCharacters) {
          this.setState({
            changeOfButton: false,
          });
        } else {
          this.setState({
            changeOfButton: true,
          });
        }
      };

      clickEventButton = async () => {
        const { login } = this.state;

        this.setState(
          { loading: true },
        );
        await createUser({ name: login });
        this.setState({ nope: true });
      }

      render() {
        const { login, nope, changeOfButton, loading } = this.state;
        return (
          <div data-testid="page-login">
            Login
            <label htmlFor="login-name-input">
              <input
                name="login"
                data-testid="login-name-input"
                type="text"
                onChange={ this.handleChange }
                value={ login }
              />
              <button
                type="button"
                data-testid="login-submit-button"
                disabled={ changeOfButton }
                onClick={ this.clickEventButton }
                name="Entrar"
                value="Entrar"
              >
                Entrar
              </button>
              <div>
                { loading ? <Loading /> : null }
                { nope ? <Redirect to="/search" /> : null }
              </div>
            </label>
          </div>
        );
      }
}

export default Login;
