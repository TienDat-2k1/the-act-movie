import { useEffect, useState } from 'react';

const useOutSide = (ref: any) => {
  const [status, setStatus] = useState(false);
  useEffect(() => {
    function handlerOnClickOutside(e: Event) {
      if (ref.current && !ref.current.contains(e.target)) {
        setStatus(true);
      } else {
        setStatus(false);
      }
    }
    document.addEventListener('mousedown', handlerOnClickOutside);

    return () => {
      document.removeEventListener('mousedown', handlerOnClickOutside);
    };
  }, [ref]);

  return status;
};

export default useOutSide;
