import { LazyLoadImage } from 'react-lazy-load-image-component';
import SearchInput from '../../components/common/SearchInput/SearchInput';

import './Home.scss';

const Home = () => {
  return (
    <section className="home">
      <header>
        <nav>
          <ul>
            <li className="active">
              <span>Movie</span>
            </li>
            <li>
              <span>TV Show</span>
            </li>
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
    </section>
  );
};
export default Home;
