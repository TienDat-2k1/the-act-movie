import { useSelector } from 'react-redux';
import Skeleton from '../../components/Skeleton/Skeleton';
import SectionSlider from '../../components/slider/SectionSlider/SectionSlider';
import {
  homeMoviesSelector,
  homeTvSectionSelector,
} from '../../store/Home/homeSelector';

type HomeSectionProps = {
  currentTab: string;
};

const HomeSection: React.FC<HomeSectionProps> = ({ currentTab }) => {
  const homeMoviesSection = useSelector(homeMoviesSelector);
  const homeTvSection = useSelector(homeTvSectionSelector);

  const homeSections = currentTab === 'tv' ? homeTvSection : homeMoviesSection;

  if (!Object.entries(homeSections).length)
    return (
      <Skeleton
        variant="rect"
        style={{ width: '100%', height: '200px', marginTop: '4rem' }}
      />
    );

  return (
    <>
      {Object.entries(homeSections).map(obj => {
        return <SectionSlider key={obj[0]} title={obj[0]} data={obj[1]} />;
      })}
    </>
  );
};
export default HomeSection;
