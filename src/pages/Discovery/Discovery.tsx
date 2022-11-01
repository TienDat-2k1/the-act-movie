import { useState, useEffect, useCallback } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { GiArrowed } from 'react-icons/gi';
import { useSearchParams, useLocation } from 'react-router-dom';
import DiscoverMovie from '../../components/DiscoverMovie/DiscoverMovie';
import DiscoverTv from '../../components/DiscoverTv/DiscoverTv';
import GenresFilter from '../../components/GenresFilter/GenresFilter';

import Header from '../../components/Header/Header';

import './Discovery.scss';

const Discovery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState<'tv' | 'movie'>('tv');
  const [config, setConfig] = useState({});
  const [page, setPage] = useState(1);
  const [btnScrollVisible, setBtnScrollVisible] = useState(false);
  const [filterExpandToggle, setFilterExpandToggle] = useState(false);

  useEffect(() => {
    const mainDoc = document.getElementById('main');

    const scrollHandler = (e: Event) => {
      setBtnScrollVisible((e.target as HTMLDivElement).scrollTop > 800);
    };

    mainDoc?.addEventListener('scroll', scrollHandler);

    return () => mainDoc?.removeEventListener('scroll', scrollHandler);
  }, []);

  const scrollHandler = () => {
    const mainDoc = document.getElementById('main');
    mainDoc?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const changeConfig = useCallback((key: string, value: string | number) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  }, []);

  useEffect(() => {
    const genre = searchParams.getAll('genre');
    changeConfig('with_genres', genre.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const onChangeTab = (tab: 'tv' | 'movie') => {
    setPage(1);
    setCurrentTab(tab);
    setSearchParams({});
  };

  return (
    <div className="discover" id="discover">
      <Header currentTab={currentTab} onChangeTab={onChangeTab} />
      <section className="discover__container">
        <div>
          {currentTab === 'tv' ? (
            <DiscoverTv page={page} onChangePage={setPage} config={config} />
          ) : (
            <DiscoverMovie page={page} onChangePage={setPage} config={config} />
          )}
        </div>
        <div className="discover__filters">
          <div
            className={`discover__filter ${filterExpandToggle ? 'expand' : ''}`}
            onClick={() => setFilterExpandToggle(!filterExpandToggle)}
          >
            <div>
              <h1>Filter </h1>
              <BiChevronRight className="filter-icon" />
            </div>
            <GenresFilter currentTab={currentTab} />
          </div>
        </div>
      </section>
      <div
        className={`discover__scrollTop ${btnScrollVisible ? 'show' : ''}`}
        onClick={scrollHandler}
      >
        <GiArrowed />
      </div>
    </div>
  );
};
export default Discovery;
