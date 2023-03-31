import { useState } from 'react';
import { useSelector } from 'react-redux';
import Skeleton from '../../components/Skeleton/Skeleton';
import { historySelector, userSelector } from '../../store/user/userSelector';
import './History.scss';
import useHistory from '../../hooks/useHistory';
import ItemCard from '../../components/ItemCard/ItemCard';
import Button from '../../components/common/Button/Button';
import HistoryDeleteModal from '../../components/HistoryDeleteModal/HistoryDeleteModal';
import { updateUserHistoryDocument } from '../../utils/firebase';

const History = () => {
  const history = useSelector(historySelector);
  const [isDeleteAllHistory, setIsDeleteAllHistory] = useState(false);
  const user = useSelector(userSelector);

  const { results, isLoading } = useHistory(history);

  return (
    <div className="bookmarks-container">
      <div className="bookmarks__heading">
        <h2>My History Film</h2>
        <Button
          className="btn--outline btn--red"
          onClick={() => {
            setIsDeleteAllHistory(true);
          }}
        >
          Clear All History
        </Button>
      </div>
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
          Your history film is empty!!
        </span>
      )}

      <div className="bookmarks-list">
        {results &&
          results
            .reverse()
            .map(result => (
              <ItemCard key={result.id} data={result} isHistory={true} />
            ))}
      </div>
      <HistoryDeleteModal
        isOpen={isDeleteAllHistory}
        setIsOpen={setIsDeleteAllHistory}
        isClear={true}
        handler={() => {}}
        clearAll={() => {
          user.uid && updateUserHistoryDocument(user.uid, []);
          setIsDeleteAllHistory(false);
        }}
      />
    </div>
  );
};
export default History;
