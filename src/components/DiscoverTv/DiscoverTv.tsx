import InfiniteScroll from 'react-infinite-scroll-component';
import useDataTv from '../../hooks/useDataTv';
import ItemCard from '../ItemCard/ItemCard';
import Skeleton from '../Skeleton/Skeleton';

type DiscoverTvProps = {
  page: number;
  onChangePage: React.Dispatch<React.SetStateAction<number>>;
  config: { [key: string]: string | number };
};

const DiscoverTv: React.FC<DiscoverTvProps> = ({
  page,
  onChangePage,
  config,
}) => {
  const { results, isError, error, hasNextPage, isLoading } = useDataTv(
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

export default DiscoverTv;
