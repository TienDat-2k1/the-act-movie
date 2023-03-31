import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useNavigate } from 'react-router-dom';
import 'react-lazy-load-image-component/src/effects/blur.css';

import imageURL from '../../utils/imageURL';
import Button from '../common/Button/Button';
import { Bookmark, Item } from '../../utils/types';
import './ItemCard.scss';
import { useSelector } from 'react-redux';
import {
  bookmarksSelector,
  historySelector,
  userSelector,
} from '../../store/user/userSelector';
import {
  updateUserBookmarkDocument,
  updateUserHistoryDocument,
} from '../../utils/firebase';
import { addOrRemove } from '../../utils/functions';
import { toast } from 'react-toastify';
import { BsFillBookmarkFill } from 'react-icons/bs';
import BookmarkDeleteModal from '../BookmarkDeleteModal/BookmarkDeleteModal';
import { MdOutlineHistory } from 'react-icons/md';
import HistoryDeleteModal from '../HistoryDeleteModal/HistoryDeleteModal';

type ItemCardProps = {
  data: Item;
  isBookmark?: boolean;
  isHistory?: boolean;
};

const ItemCard: React.FC<ItemCardProps> = ({
  data,
  isBookmark = false,
  isHistory = false,
}) => {
  const navigate = useNavigate();
  const user = useSelector(userSelector);
  const bookmarks = useSelector(bookmarksSelector);
  const history = useSelector(historySelector);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isDeleteHistory, setIsDeleteHistory] = useState(false);

  if (!data.backdrop_path) return <></>;

  const itemClickHandler = () => {
    navigate(
      data.media_type === 'movie'
        ? `/movie/${data.id}`
        : data.media_type === 'tv'
        ? `/tv/${data.id}`
        : '/'
    );
  };

  const deleteHistoryItemHandler = async (id: number) => {
    user.uid &&
      (await updateUserHistoryDocument(
        user.uid,
        history.filter(h => h.id !== id)
      ));
  };

  const itemBookmarksHandler = async (item: Bookmark) => {
    if (!user.uid) {
      toast.info('Please login for this action!!');

      return;
    }

    await updateUserBookmarkDocument(user.uid, addOrRemove(bookmarks, item));
    toast.success('Update bookmarks!');
  };

  return (
    // <Link
    //   to={
    //     data.media_type === 'movie'
    //       ? `/movie/${data.id}`
    //       : data.media_type === 'tv'
    //       ? `/tv/${data.id}`
    //       : '/'
    //   }
    //   className="card"
    // >
    <>
      <article className="item-card" onClick={itemClickHandler}>
        <LazyLoadImage
          src={imageURL(data.poster_path, 'w300')}
          wrapperClassName="item-card__poster"
          effect="blur"
        />
        <div className="item-card__rate">
          <AiFillStar />
          <span>{data.vote_average.toFixed(1)}</span>
        </div>
        {data.media_type === 'tv' ? (
          <h1 className="item-card__title">{data.name}</h1>
        ) : (
          <h1 className="item-card__title">{data.title}</h1>
        )}
        {data.media_type === 'tv' ? (
          <span className="item-card__date">{data.first_air_date}</span>
        ) : (
          <span className="item-card__date">{data.release_date}</span>
        )}
        {isBookmark && (
          <BsFillBookmarkFill
            className="item-card__bookmark"
            onClick={e => {
              e.stopPropagation();
              setIsOpenDeleteModal(true);
            }}
          />
        )}

        {isHistory && (
          <MdOutlineHistory
            className="item-card__history"
            onClick={e => {
              e.stopPropagation();
              setIsDeleteHistory(true);
            }}
          />
        )}

        {!isBookmark && !isHistory && (
          <div className="item-card__cta">
            <Button
              as={Link}
              to={
                data.media_type === 'movie'
                  ? `/movie/${data.id}/watch`
                  : data.media_type === 'tv'
                  ? `/tv/${data.id}/watch`
                  : '/'
              }
              className="btn--primary btn--round"
            >
              Watch
            </Button>
            <FaHeart
              className={`item-card__wishlist ${
                bookmarks &&
                bookmarks.find(bookmark => bookmark.id === data.id) &&
                'item-card__wishlist--active'
              }`}
              onClick={e => {
                e.stopPropagation();
                itemBookmarksHandler({ id: data.id, type: data.media_type });
              }}
            />
          </div>
        )}
      </article>
      <BookmarkDeleteModal
        isOpen={isOpenDeleteModal}
        setIsOpen={setIsOpenDeleteModal}
        handler={() => {
          itemBookmarksHandler({ id: data.id, type: data.media_type });
          setIsOpenDeleteModal(false);
        }}
      />
      <HistoryDeleteModal
        isOpen={isDeleteHistory}
        setIsOpen={setIsDeleteHistory}
        handler={() => {
          deleteHistoryItemHandler(data.id);
          setIsDeleteHistory(false);
        }}
      />
    </>
    // </Link>
  );
};
export default React.memo(ItemCard);
