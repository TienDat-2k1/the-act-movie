import { useSelector } from 'react-redux';
import ItemCard from '../../components/ItemCard/ItemCard';
import Skeleton from '../../components/Skeleton/Skeleton';
import useBookmark from '../../hooks/useBookmark';
import { bookmarksSelector } from '../../store/user/userSelector';

import './Bookmark.scss';

const Bookmark = () => {
  const bookmarks = useSelector(bookmarksSelector);

  const { results, isLoading } = useBookmark(bookmarks);

  return (
    <div className="bookmarks-container">
      <h2>My Favourite Film</h2>
      {isLoading && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2rem',
            marginTop: '2rem',
          }}
        >
          {new Array(20).fill(0).map((_, i) => {
            return (
              <Skeleton
                key={i}
                variant="rect"
                style={{ width: '240px', height: '330px' }}
              />
            );
          })}
        </div>
      )}

      {!isLoading && !results.length && (
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#ccc',
            fontSize: '2.4rem',
          }}
        >
          Your favourite film is empty!!
        </span>
      )}

      <div className="bookmarks-list">
        {results &&
          results.map(result => (
            <ItemCard key={result.id} data={result} isBookmark={true} />
          ))}
      </div>
    </div>
  );
};
export default Bookmark;
