import { useState, useEffect, useCallback } from 'react';
import { GiArrowed } from 'react-icons/gi';
import { useSearchParams, useLocation } from 'react-router-dom';
import ButtonScrollTop from '../../components/common/ButtonScrollTop/ButtonScrollTop';
import DiscoverFilter from '../../components/DiscoverFilter/DiscoverFilter';
import DiscoverMovie from '../../components/DiscoverMovie/DiscoverMovie';
import DiscoverTv from '../../components/DiscoverTv/DiscoverTv';

import Header from '../../components/Header/Header';

import './Discovery.scss';

const Discovery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState<'tv' | 'movie'>('tv');
  const [config, setConfig] = useState({});
  const [page, setPage] = useState(1);

  const changeConfig = useCallback((key: string, value: string | number) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  }, []);

  useEffect(() => {
    const genre = searchParams.getAll('genre');
    changeConfig('with_genres', genre.toString());

    const sort = searchParams.get('sort') || 'popularity.desc';
    changeConfig('sort_by', sort);
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
          <DiscoverFilter currentTab={currentTab} />
        </div>
      </section>
      <ButtonScrollTop />
    </div>
  );
};
export default Discovery;
