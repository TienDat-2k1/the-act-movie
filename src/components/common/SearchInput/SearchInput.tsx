import React, { useEffect, useState, useRef } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';
import useDebounce from '../../../hooks/useDebounce';
import useOutSide from '../../../hooks/useOutSide';
import { getSearchWithKeyword } from '../../../services/searchSevices';
import './SearchInput.scss';

type SearchInputProps = {
  autoFocus?: boolean;
};

const SearchInput: React.FC<SearchInputProps> = ({ autoFocus = false }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const isOutside = useOutSide(suggestionsRef);

  const searchInputDebounce = useDebounce(searchInput, 500);

  useEffect(() => {
    if (!searchInputDebounce) return;
    const getSearchData = async () => {
      const data = await getSearchWithKeyword(
        encodeURIComponent(searchInputDebounce)
      );
      setSuggestions(data);
    };
    getSearchData();
  }, [searchInputDebounce]);

  const searchInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) setSuggestions([]);
    setSearchInput(e.target.value);
  };

  const searchSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput) return;
  };

  return (
    <div
      className={`search-box ${suggestions.length ? 'expand' : ''}`}
      ref={suggestionsRef}
    >
      <form onSubmit={searchSubmitHandler}>
        <button>
          <BsSearch />
        </button>
        <input
          type="text"
          value={searchInput}
          onChange={searchInputChangeHandler}
          autoFocus={autoFocus}
          placeholder="Search..."
        />
      </form>
      {!!suggestions.length && !isOutside && (
        <ul className="search-box__results">
          {suggestions.map((keyword, i) => (
            <li key={i} className="search-box__result">
              <BiSearchAlt />
              <span>{keyword}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default React.memo(SearchInput);
