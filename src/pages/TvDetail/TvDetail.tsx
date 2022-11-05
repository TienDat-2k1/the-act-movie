import { useParams } from 'react-router-dom';
import Detail from '../../components/common/Detail/Detail';
import Skeleton from '../../components/Skeleton/Skeleton';
import useTvDetail from '../../hooks/useTvDetail';
import './TvDetail.scss';

const TvDetail = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useTvDetail(id);

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
export default TvDetail;
