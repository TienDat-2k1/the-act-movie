import InfiniteScroll from 'react-infinite-scroll-component';
import useDataMovie from '../../hooks/useDataMovie';
import { IConfig } from '../../utils/types';
import ItemCard from '../ItemCard/ItemCard';
import Skeleton from '../Skeleton/Skeleton';

type DiscoverMovieProps = {
  page: number;
  onChangePage: React.Dispatch<React.SetStateAction<number>>;
  config: IConfig;
};

const DiscoverMovie: React.FC<DiscoverMovieProps> = ({
  page,
  onChangePage,
  config,
}) => {
  const { results, isLoading, isError, error, hasNextPage } = useDataMovie(
    page,
    config
  );

  if (isError) return <h1>Error: {error}</h1>;

  if (!isLoading && results.length === 0)
    return (
      <h1 style={{ textAlign: 'center', marginTop: '4rem' }}>
        No Tv Show match with your options
      </h1>
    );

  return (
    <>
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
      {!!results.length && (
        <InfiniteScroll
          dataLength={results.length}
          next={() => {
            onChangePage(prev => prev + 1);
          }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
            paddingTop: '2rem',
          }} //To put endMessage and loader to the top.
          // inverse={true} //
          hasMore={hasNextPage}
          loader={<></>}
          scrollableTarget="main"
        >
          {results.map(r => (
            <ItemCard key={r.id} data={r} />
          ))}
        </InfiniteScroll>
      )}
    </>
  );
};
export default DiscoverMovie;
