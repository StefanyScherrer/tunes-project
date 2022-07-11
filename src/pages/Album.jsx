import React, { Component } from 'react';
import PropType from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends Component {
  state = {
    albumInfo: {},
    songs: [],
  }

  componentDidMount = async () => {
    const {
      match: {
        params: {
          id,
        },
      },
    } = this.props;

    const [albumInfo, ...songs] = await getMusics(id);

    this.setState({
      albumInfo,
      songs,
    });
  }

  render() {
    const {
      albumInfo,
      songs,
    } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">
          {albumInfo.artistName}
        </h2>
        <p data-testid="album-name">
          {albumInfo.collectionName}
        </p>
        {songs.map((song) => (
          <MusicCard
            trackId={ song.trackId }
            trackName={ song.trackName }
            previewUrl={ song.previewUrl }
            key={ song.trackId }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropType.objectOf(PropType.any).isRequired,
};

export default Album;
