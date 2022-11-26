/* eslint-disable eqeqeq */
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import imageURL from '../../utils/imageURL';
import { IDetailSeason, IEpisode } from '../../utils/types';
import { useSearchParams } from 'react-router-dom';

type SeasonProps = {
  season: IDetailSeason;
  watch: { season: number | string; episode: number | string };
  active: boolean;
};

const Season = ({ season, watch, active }: SeasonProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams();
  const [isExpandEpisodes, setIsExpandEpisodes] = useState(false);

  useEffect(() => {
    setIsExpandEpisodes(active);
  }, [active]);

  const episodeClickHandler = (ep: IEpisode) => {
    const season = ep.season_number + '';
    const episode = ep.episode_number + '';
    setSearchParams({
      season,
      episode,
    });
  };

  const listVariants = {
    collapse: { height: 0, overflow: 'hidden', opacity: 0 },
    expand: {
      opacity: 1,
      height: 'auto',
      padding: '16px 0',
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  return (
    <>
      <div
        className={`watch__season ${active ? 'watch__season--active' : ''} `}
        onClick={() => setIsExpandEpisodes(!isExpandEpisodes)}
      >
        <LazyLoadImage
          src={imageURL(season.poster_path, 'w200')}
          wrapperClassName="season__poster"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          effect="blur"
        />
        <div style={{ flex: 1 }}>
          <h2>{season.name}</h2>
          <span>{season.episodes.length} Episodes</span>
        </div>
      </div>

      <motion.ul
        variants={listVariants}
        animate={isExpandEpisodes ? 'expand' : 'collapse'}
        transition={{ duration: 0.3 }}
        className="season__episodes"
      >
        {season.episodes.map((episode, i) => (
          <li
            key={episode.id}
            onClick={() => episodeClickHandler(episode)}
            className={
              watch.episode == episode.episode_number &&
              watch.season == episode.season_number
                ? 'active'
                : ''
            }
          >
            <span style={{ minWidth: '20px' }}>{i + 1}</span>
            <div className="episode">
              {episode.still_path && (
                <LazyLoadImage
                  src={imageURL(episode.still_path, 'w200')}
                  wrapperClassName="episode__poster"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                  effect="blur"
                />
              )}
              <div style={{ flex: 1 }}>
                <h3>{episode.name}</h3>
                <span>{episode.runtime} Minute</span>
              </div>
            </div>
          </li>
        ))}
      </motion.ul>
    </>
  );
};
export default Season;
