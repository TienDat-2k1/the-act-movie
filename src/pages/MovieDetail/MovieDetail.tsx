import { useParams } from 'react-router-dom';
import Detail from '../../components/common/Detail/Detail';
import Skeleton from '../../components/Skeleton/Skeleton';
import useMovieDetail from '../../hooks/useMovieDetail';
import './MovieDetail.scss';

const MovieDetail = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useMovieDetail(id);

  if (isError) return <h1>Error: 404 NOT FOUND</h1>;

  return (
    <>
      {isLoading &&
        new Array(6)
          .fill(0)
          .map((item, i) => (
            <Skeleton
              key={i}
              variant="text"
              style={{ width: '100%', height: '100px' }}
            />
          ))}
      {data && !isLoading && <Detail data={data} />}
    </>
  );
};
export default MovieDetail;
