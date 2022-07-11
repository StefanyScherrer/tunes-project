// enableButton = () => {
//   const { inputArtist } = this.state;
//   const inputMin = 2;
//   return inputArtist.length < inputMin;
// };

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const inputMin = 2;

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      artist: '',
      artistInput: '',
      albums: 'album_initial_state',
    };
  }

  getAlbumList = (artist) => {
    const { albums } = this.state;

    if (!albums.length) return (<h3>Nenhum álbum foi encontrado</h3>);
    return (
      <div>
        <h2>{`Resultado de álbuns de: ${artist}`}</h2>
        <section>
          { albums.map(({ collectionId, artworkUrl100, collectionName }, index) => (
            <div key={ collectionId }>
              <img src={ artworkUrl100 } alt={ collectionName } />
              <h3>{ collectionName }</h3>
              <Link
                to={ `/album/${collectionId}` }
                data-testid={ `link-to-album-${collectionId}` }
              >
                { `Album ${index + 1}` }
              </Link>
            </div>
          )) }
        </section>
      </div>
    );
  }

  onHandleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  onClickButton = async (event) => {
    event.preventDefault();
    const { artistInput } = this.state;
    this.setState({
      artist: artistInput,
      artistInput: '',
      albums: '',
    });

    const api = await searchAlbumsAPI(artistInput);
    this.setState(
      { albums: api },
    );
  }

  render() {
    const { artistInput, albums, artist } = this.state;

    const searchArtist = (
      <form>
        <label htmlFor="search-artist">
          <input
            name="artistInput"
            onChange={ this.onHandleChange }
            value={ artistInput }
            id="search-artist"
            data-testid="search-artist-input"
          />
        </label>
        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ artistInput.length < inputMin }
          onClick={ this.onClickButton }
        >
          Pesquisar
        </button>
      </form>
    );

    return (
      <div data-testid="page-search">
        <Header />
        { (albums === '') ? <Loading /> : searchArtist }
        { (Array.isArray(albums)) && this.getAlbumList(artist) }
      </div>
    );
  }
}
