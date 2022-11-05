import { BsChevronLeft, BsSuitHeartFill } from 'react-icons/bs';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import imageURL from '../../../utils/imageURL';
import { DetailInfo, IDetailMovie, IDetailTv } from '../../../utils/types';
import './Detail.scss';
import Button from '../Button/Button';
import { FaShareAlt } from 'react-icons/fa';
import { IoMdMore } from 'react-icons/io';
import SimilarItem from '../SimilarItem/SimilarItem';
import CastItem from '../CastItem/CastItem';
import { useNavigate } from 'react-router-dom';

type DetailProps<T> = {
  data: DetailInfo<T>;
  // type: 'tv' | 'movie';
};

const Detail = <T extends IDetailMovie | IDetailTv>({
  data,
}: DetailProps<T>) => {
  const navigate = useNavigate();
  const { detail, cast, similar, videos } = data;

  const languages = detail?.spoken_languages.reduce((acc, curr) => {
    if (!curr.english_name) return acc;
    return [...acc, curr.english_name];
  }, [] as string[]);

  return (
    <>
      {detail && (
        <div className="detail">
          <div className="detail__backdrop">
            <LazyLoadImage
              src={imageURL(detail?.backdrop_path)}
              wrapperClassName="backdrop-img"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              effect="blur"
            />
            <div className="detail__back" onClick={() => navigate(-1)}>
              <span>
                <BsChevronLeft />
              </span>
              <h2>{detail.media_type === 'tv' ? detail.name : detail.title}</h2>
            </div>
            <div className="detail__type">
              <h2>{detail.media_type === 'tv' ? 'TV Show' : 'Movie'}</h2>
            </div>
            <div className="detail__votes">
              <span>
                <CircularProgressbar
                  value={detail.vote_average}
                  maxValue={10}
                  text={detail.vote_average.toFixed(1)}
                />
              </span>
              <div>
                <h4>{detail.vote_count} VOTES</h4>
                <span>Our Users Are Recommending It</span>
              </div>
            </div>
            <Button
              as="a"
              href="#trailer"
              className="btn--outline btn--round detail__trailer-btn"
            >
              Trailer
            </Button>
          </div>
          <div className="detail__contents">
            <div className="detail__wrapper">
              <LazyLoadImage
                src={imageURL(detail.poster_path)}
                wrapperClassName="detail__poster"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '20px',
                }}
              />
              <div className="detail__heading">
                <h1 className="detail__name">
                  {detail.media_type === 'tv' ? detail.name : detail.title}
                </h1>
                {/* <h2>
                  <em
                    style={{
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                    }}
                  >
                    {detail.tagline}
                  </em>
                </h2> */}
                <ul className="detail__genres">
                  {detail.genres
                    .filter((_, i) => i < 6)
                    .map(genre => (
                      <li key={genre.id} className="detail__genre">
                        <span>{genre.name}</span>
                      </li>
                    ))}
                </ul>
                <div>
                  <div className="detail__cta">
                    <Button className="btn--primary btn--round detail__cta-watch">
                      Watch
                    </Button>
                    <BsSuitHeartFill className="detail__cta-btn" />
                    <FaShareAlt className="detail__cta-btn" />
                    <IoMdMore className="detail__cta-btn" />
                  </div>
                </div>
              </div>
              <div className="detail__info">
                {detail.media_type === 'tv' ? (
                  <span>
                    EP LENGTH: {(detail as IDetailTv).episode_run_time[0]} MIN
                  </span>
                ) : (
                  <span>RUN TIME: {(detail as IDetailMovie).runtime} MIN</span>
                )}
                <span>Status: {detail.status}</span>
                {detail.media_type === 'tv' ? (
                  <span>
                    Last air date: {(detail as IDetailTv).last_air_date}
                  </span>
                ) : (
                  <span>
                    Release date: {(detail as IDetailMovie).release_date}
                  </span>
                )}
                <div>
                  <span>Spoken language: </span>
                  <em>{languages?.join(', ')}</em>
                </div>
              </div>
              <div className="detail__story">
                <h2>Story line</h2>
                <p>{detail.overview}</p>
              </div>
              {cast && !!cast.length && (
                <div className="detail__cast">
                  <h2>Cast</h2>
                  <div>
                    {cast?.map(c => {
                      if (!c.profile_path) return <></>;
                      return <CastItem key={c.id} data={c} />;
                    })}
                  </div>
                </div>
              )}
              {videos && !!videos.length && (
                <ul className="detail__videos" id="trailer">
                  {videos
                    ?.filter((_, i: number) => i < 2)
                    .map(video => (
                      <li key={video.id} className="detail__video">
                        <h1>{video.name}</h1>
                        <iframe
                          allowFullScreen
                          title="Trailer"
                          src={`https://www.youtube.com/embed/${video.key}?enablejsapi=1&amp;origin=http%3A%2F%2Flocalhost%3A3000&amp;widgetid=1`}
                          frameBorder="0"
                          width={'100%'}
                          height="400px"
                        ></iframe>
                      </li>
                    ))}
                </ul>
              )}
            </div>
            {similar && !!similar.length && (
              <div className="detail__similar">
                <h1>More like this</h1>
                {similar?.map(item => (
                  <SimilarItem key={item.id} data={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Detail;
