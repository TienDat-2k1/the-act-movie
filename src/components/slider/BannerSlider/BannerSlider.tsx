import React from 'react';
import { useSelector } from 'react-redux';
import { AiFillStar } from 'react-icons/ai';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';

import imageURL from '../../../utils/imageURL';
import {
  homeMovieBanner,
  homeTvBanner,
} from '../../../store/Home/homeSelector';
import './BannerSlider.scss';
import Button from '../../common/Button/Button';
import Skeleton from '../../Skeleton/Skeleton';

type BannerSliderProps = {
  currentTab: string;
};

const BannerSlider: React.FC<BannerSliderProps> = ({ currentTab }) => {
  const tvBanner = useSelector(homeTvBanner);
  const movieBanner = useSelector(homeMovieBanner);
  const banner = currentTab === 'movie' ? movieBanner : tvBanner;

  if (!Object.entries(banner).length)
    return (
      <Skeleton
        variant="rect"
        style={{ width: '100%', height: '60vh', marginTop: '2rem' }}
      />
    );

  return (
    <section className="banner">
      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay]}
      >
        {banner.length &&
          banner.map(b => (
            <SwiperSlide key={b.id}>
              <div className="banner__backdrop">
                <LazyLoadImage
                  alt={b.title}
                  src={imageURL(b.backdrop_path)}
                  effect={'blur'}
                />
              </div>
              <div className="banner__contents">
                <div className="banner__poster">
                  <LazyLoadImage
                    src={imageURL(b.poster_path, 'w300')}
                    alt={'' + b.id}
                    className="banner__poster-img"
                    effect="blur"
                  />
                </div>
                <div className="banner__content">
                  {currentTab === 'tv' ? <h1>{b.name}</h1> : <h1>{b.title}</h1>}
                  {b.tagline && <h2>"{b.tagline}"</h2>}
                  {currentTab === 'tv' ? (
                    <span className="banner__date">
                      <span>First air date:</span>
                      <span>{b.first_air_date}</span>
                    </span>
                  ) : (
                    <span className="banner__date">
                      <span>Release Date:</span>
                      <span>{b.release_date}</span>
                    </span>
                  )}
                  <p>{b.overview}</p>
                  <div className="banner__genres">
                    {b.genres
                      .filter((_, i) => i < 3)
                      .map(genre => (
                        <div key={genre.id} className="banner__genre">
                          <span>{genre.name}</span>
                        </div>
                      ))}
                  </div>
                  <div className="banner__cta">
                    <Button className="btn--outline">Trailer</Button>
                    <Button className="btn--primary">Watch Now</Button>
                  </div>
                </div>
              </div>
              <div className="banner__ratingAvg">
                <span>{b.vote_average.toFixed(1)}</span>
                <AiFillStar />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};
export default React.memo(BannerSlider);
