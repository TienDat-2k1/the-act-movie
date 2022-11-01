import { useEffect, useState } from 'react';
import { getGenres } from '../../services/discoveryServices';
import { IoIosAdd } from 'react-icons/io';
import { FiCheck } from 'react-icons/fi';

import { IGenre } from '../../utils/types';
import './GenresFilter.scss';
import { useSearchParams } from 'react-router-dom';
import useCurrentParams from '../../hooks/useCurrentParams';

type GenresFilterProps = {
  currentTab: 'tv' | 'movie';
};

const GenresFilter: React.FC<GenresFilterProps> = ({ currentTab }) => {
  const [genres, setGenres] = useState<IGenre[]>([]);
  let [searchParams, setSearchParams] = useSearchParams();
  const [currentParams] = useCurrentParams();

  useEffect(() => {
    getGenres(currentTab)
      .then(data => {
        setGenres(data);
      })
      .catch(e => console.log('Error get genre list '));
  }, [currentTab]);

  const genreHandler = (id: string) => {
    const existingGenre = searchParams.getAll('genre');

    if (existingGenre.includes(id)) {
      const newGenre = existingGenre.filter(genre => genre !== id);
      setSearchParams({
        genre: newGenre,
      });
    } else {
      setSearchParams({ genre: [...existingGenre, id] });
    }
  };

  return (
    <div className="genres">
      <h3>Genres</h3>
      <ul className="genres__list">
        {genres.length &&
          genres.map(genre => (
            <li
              key={genre.id}
              className={`genres__item ${
                currentParams.genre.includes(genre.id + '')
                  ? 'genres__item--active'
                  : ''
              }`}
              onClick={e => {
                e.stopPropagation();
                genreHandler(genre.id + '');
              }}
            >
              <span>{genre.name}</span>
              {currentParams.genre.includes(genre.id + '') ? (
                <FiCheck />
              ) : (
                <IoIosAdd />
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};
export default GenresFilter;
