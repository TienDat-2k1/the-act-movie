import { useState } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSearchParams } from 'react-router-dom';
import ButtonScrollTop from '../../components/common/ButtonScrollTop/ButtonScrollTop';
import SearchInput from '../../components/common/SearchInput/SearchInput';
import ItemCard from '../../components/ItemCard/ItemCard';
import Skeleton from '../../components/Skeleton/Skeleton';
import useSearch from '../../hooks/useSearch';
import useWinDowDimension from '../../hooks/useWindowDimensions';

import searchPlaceholder from '../../assets/img/search_placeholder.jpg';
import './Search.scss';

const Search = () => {
  const { width } = useWinDowDimension();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [searchTypeToggle, setSearchTypeToggle] = useState(width > 992);
  const [searchType, setSearchType] = useState<'multi' | 'tv' | 'movie'>(
    'multi'
  );
  const { results, hasNextPage, isLoading } = useSearch(searchType, page);

  const searchTypes: { name: string; key: 'multi' | 'tv' | 'movie' }[] = [
    {
      name: 'All',
      key: 'multi',
    },
    {
      name: 'TV Show',
      key: 'tv',
    },
    {
      name: 'Movie',
      key: 'movie',
    },
  ];

  const changeTypeSearchHandler = (type: 'multi' | 'tv' | 'movie') => {
    setSearchType(type);
  };

  return (
    <div className="search">
      <div
        className="search__header"
        style={
          (searchParams.get('query') && { transform: 'translateY(0' }) || {}
        }
      >
        {!searchParams.get('query') && (
          <h1 style={{ fontWeight: 700 }}>
            Find your favourite movies, TV shows and more
          </h1>
        )}
        <div className="search__form">
          <SearchInput autoFocus />
        </div>
      </div>

      <div className="search__container">
        <div className="search__results">
          {!searchParams.get('query') && (
            <LazyLoadImage
              src={searchPlaceholder}
              effect="blur"
              className="search__img"
            />
          )}
          {!isLoading && results.length === 0 && searchParams.get('query') && (
            <h1 style={{ textAlign: 'center', marginTop: '4rem' }}>
              No result match with your query
            </h1>
          )}
          {!!results.length && searchParams.get('query') && (
            <InfiniteScroll
              dataLength={results.length}
              next={() => {
                setPage(prev => prev + 1);
              }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '2rem',
                flexWrap: 'wrap',
                paddingTop: '2rem',
              }}
              hasMore={hasNextPage}
              loader={<></>}
              scrollableTarget="main"
            >
              {results.map(r => (
                <ItemCard key={r.id} data={r} />
              ))}
            </InfiniteScroll>
          )}
          {isLoading && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '2rem',
                marginTop: '2rem',
              }}
            >
              {new Array(20).fill(0).map((_, i) => {
                return (
                  <Skeleton
                    key={i}
                    variant="rect"
                    style={{ width: '240px', height: '330px' }}
                  />
                );
              })}
            </div>
          )}
        </div>
        <div
          className={`search__types ${searchTypeToggle ? 'expand' : ''}`}
          onClick={() => setSearchTypeToggle(!searchTypeToggle)}
        >
          <div>
            <h2>Search Type</h2>
            <BiChevronRight className="type-icon" />
          </div>

          {searchTypes.map((type, i) => (
            <div
              key={i}
              className={`search__type ${
                searchType === type.key ? 'search__type--active' : ''
              }`}
              onClick={e => {
                e.stopPropagation();
                changeTypeSearchHandler(type.key);
              }}
            >
              <span>{type.name}</span>
            </div>
          ))}
        </div>
      </div>
      <ButtonScrollTop />
    </div>
  );
};
export default Search;
