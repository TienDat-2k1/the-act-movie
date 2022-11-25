import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import 'react-lazy-load-image-component/src/effects/blur.css';

import imageURL from '../../utils/imageURL';
import Button from '../common/Button/Button';
import { Item } from '../../utils/types';
import './ItemCard.scss';

type ItemCardProps = {
  data: Item;
};

const ItemCard: React.FC<ItemCardProps> = ({ data }) => {
  if (!data.backdrop_path) return <></>;

  return (
    <Link
      to={
        data.media_type === 'movie'
          ? `/movie/${data.id}`
          : data.media_type === 'tv'
          ? `/tv/${data.id}`
          : '/'
      }
      className="card"
    >
      <article className="item-card">
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
          <FaHeart className="item-card__wishlist" />
        </div>
      </article>
    </Link>
  );
};
export default React.memo(ItemCard);
