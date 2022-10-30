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
  const [isEscKey, setIsEscKey] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const isOutside = useOutSide(suggestionsRef);

  const isSuggestion = !isEscKey && !isOutside && suggestions.length > 0;

  const searchInputDebounce = useDebounce(searchInput, 400);

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

  useEffect(() => {
    const handlerKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsEscKey(true);
      } else setIsEscKey(false);
      if (e.key === 'Enter') {
      }
    };

    document.addEventListener('keydown', handlerKeydown);

    return () => document.removeEventListener('keydown', handlerKeydown);
  }, [searchInputRef]);

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
      className={`search-box ${isSuggestion ? 'expand' : ''}`}
      ref={suggestionsRef}
    >
      <form onSubmit={searchSubmitHandler}>
        <button>
          <BsSearch />
        </button>
        <input
          ref={searchInputRef}
          type="text"
          value={searchInput}
          onChange={searchInputChangeHandler}
          autoFocus={autoFocus}
          placeholder="Search..."
          onFocus={() => setIsEscKey(false)}
        />
      </form>
      {isSuggestion && (
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
