import React, { Component } from 'react';
import PropType from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

class MusicCard extends Component {
    state = {
      loading: false,
      favorite: false,
    }

      addToFavorites = async (e) => {
        const { trackId,
        } = this.props;

        this.setState({
          favorite: e.target.checked,
          loading: true,
        });

        if (e.target.checked) {
          await addSong(await getMusics(trackId));
        } else {
          await removeSong(await getMusics(trackId));
        }

        this.setState({
          loading: false,
        });
      }

      render() {
        const {
          state: {
            loading,
            favorite,
          },
          props: {
            trackName,
            previewUrl,
            trackId,
          },
        } = this;

        return (
          <div>
            <h3>{trackName}</h3>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
            <label htmlFor={ `favorite-${trackId}` }>
              Favorita
              <input
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                id={ `favorite-${trackId}` }
                checked={ favorite }
                onChange={ this.addToFavorites }
              />
            </label>
            {loading && (
              <div>Carregando...</div>
            )}
          </div>
        );
      }
}

MusicCard.propTypes = {
  trackName: PropType.string.isRequired,
  previewUrl: PropType.string.isRequired,
  trackId: PropType.number.isRequired,
};

export default MusicCard;
