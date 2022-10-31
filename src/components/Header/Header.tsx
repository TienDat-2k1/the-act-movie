import { LazyLoadImage } from 'react-lazy-load-image-component';
import SearchInput from '../common/SearchInput/SearchInput';
import './Header.scss';

type HeaderProps = {
  currentTab: string;
  onChangeTab: (tab: 'movie' | 'tv') => void;
};

const Header: React.FC<HeaderProps> = ({ currentTab, onChangeTab }) => {
  return (
    <header className="header">
      <nav>
        <ul>
          {[
            { tab: 'tv', name: 'TV Show' },
            { tab: 'movie', name: 'Movie' },
          ].map((tab, i) => (
            <li
              key={i}
              className={currentTab === tab.tab ? 'active' : ''}
              onClick={() => onChangeTab(tab.tab as 'movie' | 'tv')}
            >
              <span>{tab.name}</span>
            </li>
          ))}
        </ul>
      </nav>
      <div className="home__search">
        <SearchInput />
      </div>
      <div className="home__user">
        <h4>To Nguyen Tien Dat</h4>
        <div>
          <LazyLoadImage
            src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
            effect="blur"
          />
        </div>
      </div>
    </header>
  );
};
export default Header;
