import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import imageURL from '../../utils/imageURL';
import { Item } from '../../utils/types';

type RecommendationProps = {
  data: Item;
};

const Recommendation = ({ data }: RecommendationProps) => {
  return (
    <Link
      to={
        data.media_type === 'movie'
          ? `/movie/${data.id}`
          : data.media_type === 'tv'
          ? `/tv/${data.id}`
          : '/'
      }
      className="recommendation"
    >
      <LazyLoadImage
        src={imageURL(data.poster_path, 'w200')}
        effect="blur"
        wrapperClassName="recommendation__poster"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '12px',
        }}
      />
      <div>
        <h2>{data.title}</h2>
      </div>
    </Link>
  );
};
export default Recommendation;
