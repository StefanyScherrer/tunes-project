import React, { Component } from 'react';
import PropType from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

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

    const [albumInfo, ...songList] = await getMusics(id);

    const favoriteSongs = await getFavoriteSongs();

    const songs = songList.map((song) => ({
      ...song,
      favorite: favoriteSongs.some(([{ trackId }]) => (
        trackId === song.trackId
      )),
    }));
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
            favorite={ song.favorite }
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
