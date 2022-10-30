import { useEffect, useState } from 'react';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch } from 'react-redux';
import SearchInput from '../../components/common/SearchInput/SearchInput';
import BannerSlider from '../../components/slider/BannerSlider/BannerSlider';
import {
  getBanner,
  getHomeMovie,
  getHomeTv,
  getTvBanner,
} from '../../store/Home/homeSlice';
import { AppDispatch } from '../../store/store';
import { HomeMovie, HomeTv } from '../../utils/types';

import './Home.scss';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [currentTab, setCurrentTab] = useState<'movie' | 'tv'>('tv');

  useEffect(() => {
    dispatch(getHomeMovie())
      .unwrap()
      .then(
        (res: HomeMovie) => res.trending && dispatch(getBanner(res.trending))
      )
      .catch(() => console.log('Error'));

    dispatch(getHomeTv())
      .unwrap()
      .then((res: HomeTv) => {
        res.trending && dispatch(getTvBanner(res.trending));
      })
      .catch(() => console.log('Tv fetch error'));
  }, [dispatch]);

  const onChangeTab = (tab: 'movie' | 'tv') => {
    setCurrentTab(tab);
  };

  return (
    <section className="home">
      <header>
        <nav>
          <ul>
            {[
              { tab: 'tv', name: 'TV Show' },
              { tab: 'movie', name: 'Movie' },
            ].map((tab, i) => (
              <li
                key={i}
                className={currentTab === tab.tab ? 'active' : ''}
                onClick={() => onChangeTab(tab.tab as 'movie' | 'tv')}
              >
                <span>{tab.name}</span>
              </li>
            ))}
          </ul>
        </nav>
        <div className="home__search">
          <SearchInput />
        </div>
        <div className="home__user">
          <h4>To Nguyen Tien Dat</h4>
          <div>
            <LazyLoadImage
              src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
              effect="blur"
            />
          </div>
        </div>
      </header>

      <BannerSlider currentTab={currentTab} />
    </section>
  );
};
export default Home;
