import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import Header from '../../components/Header/Header';
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
import HomeSection from './HomeSection';

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
      <Header currentTab={currentTab} onChangeTab={onChangeTab} />
      <BannerSlider currentTab={currentTab} />
      <HomeSection currentTab={currentTab} />
    </section>
  );
};
export default Home;
