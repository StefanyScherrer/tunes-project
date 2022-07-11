import React from 'react';
import { Route, Link } from 'react-router-dom';
import { arrayOf, shape } from 'prop-types';

class AlbumCard extends React.Component {
  render() {
    const { album } = this.props;
    return (
      <>
        { album.map(
          ({
            artistName,
            collectionId,
            collectionName,
            artworkUrl100,
          }) => (
            <div className="card-album" key={ collectionId }>
              <img src={ artworkUrl100 } alt={ collectionName } />
              <p>{ collectionName }</p>
              <p>{ artistName }</p>
              <Route>
                <Link
                  to={ `/album/${collectionId}` }
                  data-testid={ `link-to-album-${collectionId}` }
                >
                  Ir para o álbum
                </Link>
              </Route>
            </div>
          ),
        )}
      </>
    );
  }
}

export default AlbumCard;
AlbumCard.propTypes = {
  album: arrayOf(shape({})).isRequired,
};
