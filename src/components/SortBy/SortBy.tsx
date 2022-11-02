import { FiCheck } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';
import useCurrentParams from '../../hooks/useCurrentParams';
import './SortBy.scss';

type SortByProps = {
  currentTab: 'tv' | 'movie';
};

const SortBy: React.FC<SortByProps> = ({ currentTab }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentParams] = useCurrentParams();
  const sortTv = [
    { name: 'Most Popular', key: 'popularity.desc' },
    { name: 'Most Rating', key: 'vote_average.desc' },
    { name: 'Most Recent', key: 'first_air_date.desc' },
  ];

  const sortMovie = [
    { name: 'Most Popular', key: 'popularity.desc' },
    { name: 'Most Rating', key: 'vote_average.desc' },
    { name: 'Most Recent', key: 'release_date.desc' },
  ];

  const sorts = currentTab === 'tv' ? sortTv : sortMovie;

  const sortHandler = (key: string) => {
    setSearchParams({
      ...currentParams,
      sort: key,
    });
  };

  return (
    <ul className="sort-list" onClick={e => e.stopPropagation()}>
      {sorts.map((sort, i) => (
        <li
          key={i}
          className={`sort-item ${
            currentParams.sort.includes(sort.key) ? 'sort-item--active' : ''
          }`}
          onClick={() => sortHandler(sort.key)}
        >
          <span>{sort.name}</span>
          <FiCheck />
        </li>
      ))}
    </ul>
  );
};
export default SortBy;
