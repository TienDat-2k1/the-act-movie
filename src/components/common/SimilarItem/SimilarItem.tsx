import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import imageURL from '../../../utils/imageURL';
import { Item } from '../../../utils/types';
import './SimilarItem.scss';

type SimilarItemProps = {
  data: Item;
};

const SimilarItem: React.FC<SimilarItemProps> = ({ data }) => {
  return (
    <Link
      to={
        data.media_type === 'tv'
          ? `/tv/${data.id}`
          : data.media_type === 'movie'
          ? `/movie/${data.id}`
          : '/'
      }
    >
      <article className="similar">
        <LazyLoadImage
          src={imageURL(data.poster_path, 'w200')}
          effect="blur"
          wrapperClassName="similar__poster"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '12px',
          }}
        />
        <div className="similar__contents">
          <h3 className="similar__name">
            {data.media_type === 'tv' ? data.name : data.title}
          </h3>
          <div className="similar__info">
            <div className="similar__votes">
              <span>{data.vote_average.toFixed(1)}</span>
            </div>
            <span>
              <strong>
                {data.media_type === 'tv'
                  ? data.first_air_date
                  : data.release_date}
              </strong>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};
export default SimilarItem;
