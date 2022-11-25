import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Watch from '../../components/Watch/Watch';
import { getMovieWatch } from '../../services/movieServices';
import { Watch as WatchType } from '../../utils/types';

const MovieWatch = () => {
  const { id } = useParams();
  const [data, setData] = useState<WatchType>();
  useEffect(() => {
    if (!id) return;
    getMovieWatch(id)
      .then(data => {
        setData(data);
      })
      .catch(e => console.log(e));
  }, [id]);
  return (
    <div>
      <Watch data={data} />
    </div>
  );
};
export default MovieWatch;
