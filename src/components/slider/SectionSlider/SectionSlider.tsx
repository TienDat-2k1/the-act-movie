import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { Item } from '../../../utils/types';
import ItemCard from '../../ItemCard/ItemCard';
import './SectionSlider.scss';
import { capitalizeLetter } from '../../../utils/functions';

type SectionSliderProps = {
  title?: string;
  data: Item[] | undefined;
};

const SectionSlider: React.FC<SectionSliderProps> = ({ data, title }) => {
  const name = title && capitalizeLetter(title);
  return (
    <section className="section-slider">
      <h1 className="section-slider__name">
        {name?.includes('_') ? name.split('_').join(' ') : name}
      </h1>
      <Swiper slidesPerView={'auto'} spaceBetween={30} className="mySwiper">
        {data?.map(item => (
          <SwiperSlide key={item.id}>
            <ItemCard data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
export default SectionSlider;
