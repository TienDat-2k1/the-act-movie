import { useState } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import useWinDowDimension from '../../hooks/useWindowDimensions';
import GenresFilter from '../GenresFilter/GenresFilter';
import SortBy from '../SortBy/SortBy';

type DiscoverFilterProps = {
  currentTab: 'tv' | 'movie';
};

const DiscoverFilter: React.FC<DiscoverFilterProps> = ({ currentTab }) => {
  const { width } = useWinDowDimension();
  const [filterExpandToggle, setFilterExpandToggle] = useState(width > 992);
  const [sortExpandToggle, setSortExpandTogge] = useState(width > 992);

  return (
    <>
      <div
        className={`discover__sort ${sortExpandToggle ? 'expand' : ''}`}
        onClick={() => setSortExpandTogge(!sortExpandToggle)}
      >
        <div>
          <h1>Sort by </h1>
          <BiChevronRight className="filter-icon" />
        </div>
        <SortBy currentTab={currentTab} />
      </div>
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
    </>
  );
};
export default DiscoverFilter;
