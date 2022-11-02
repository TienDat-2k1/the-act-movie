import { useState, useEffect } from 'react';
import { GiArrowed } from 'react-icons/gi';

import './ButtonScrollTop.scss';

const ButtonScrollTop = () => {
  const [btnScrollVisible, setBtnScrollVisible] = useState(false);
  useEffect(() => {
    const mainDoc = document.getElementById('main');

    const scrollHandler = (e: Event) => {
      setBtnScrollVisible((e.target as HTMLDivElement).scrollTop > 800);
    };

    mainDoc?.addEventListener('scroll', scrollHandler);

    return () => mainDoc?.removeEventListener('scroll', scrollHandler);
  }, []);

  const scrollHandler = () => {
    const mainDoc = document.getElementById('main');
    mainDoc?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div
      className={`btn-scrollTop ${btnScrollVisible ? 'show' : ''}`}
      onClick={scrollHandler}
    >
      <GiArrowed />
    </div>
  );
};
export default ButtonScrollTop;
