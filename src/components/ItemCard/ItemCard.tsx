import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import imageURL from '../../utils/imageURL';
import { Item } from '../../utils/types';
import Button from '../common/Button/Button';
import './ItemCard.scss';

type ItemCardProps = {
  data: Item;
};

const ItemCard: React.FC<ItemCardProps> = ({ data }) => {
  if (!data.backdrop_path) return <></>;

  return (
    <Link to="" className="card">
      <article className="item-card">
        <LazyLoadImage
          src={imageURL(data.poster_path, 'w300')}
          wrapperClassName="item-card__poster"
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
        <div className="item-card__cta">
          <Button className="btn--primary btn--round">Watch</Button>
          <FaHeart className="item-card__wishlist" />
        </div>
      </article>
    </Link>
  );
};
export default React.memo(ItemCard);
