import { LazyLoadImage } from 'react-lazy-load-image-component';
import imageURL from '../../../utils/imageURL';
import { Cast } from '../../../utils/types';
import './CastItem.scss';

type CastItemProps = {
  data: Cast;
};

const CastItem = ({ data }: CastItemProps) => {
  return (
    <article className="cast">
      {data.profile_path && (
        <LazyLoadImage
          src={imageURL(data.profile_path, 'w200')}
          wrapperClassName="cast__profile"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '50%',
          }}
        />
      )}
      <div className="cast__contents">
        <h3 className="cast__character">{data.character}</h3>
        <span className="cast__name">{data.name}</span>
      </div>
    </article>
  );
};
export default CastItem;
