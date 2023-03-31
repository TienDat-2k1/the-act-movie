import { useEffect } from 'react';
import { AiFillStar, AiTwotoneCalendar } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { addHistory, embedMovie, embedTv } from '../../utils/functions';
import { IDetailMovie, Watch as WatchType } from '../../utils/types';
import Recommendation from '../Recommendation/Recommendation';
import Season from '../Season/Season';
import Skeleton from '../Skeleton/Skeleton';
import './Watch.scss';
import { updateUserHistoryDocument } from '../../utils/firebase';
import { useSelector } from 'react-redux';
import { historySelector, userSelector } from '../../store/user/userSelector';

type WatchProps = {
  data: WatchType | undefined;
  watch?: {
    season: number | string;
    episode: number | string;
  };
};

const Watch = ({ data, watch }: WatchProps) => {
  const { id } = useParams();

  const user = useSelector(userSelector);
  const history = useSelector(historySelector);

  useEffect(() => {
    const updateHistory = async () => {
      user.uid &&
        data?.detail &&
        (await updateUserHistoryDocument(
          user.uid,
          addHistory(history, {
            id: data.detail.id,
            type: data.detail.media_type,
            timestamp: new Date(),
          })
        ));
    };

    // updateHistory();

    return () => {
      (async function () {
        await updateHistory();
      })();
    };
  }, [data?.detail]);

  const season = data?.detailSeasons?.find(
    season => season.season_number == watch?.season
  );

  const episode = season?.episodes.find(
    epi => epi.episode_number == watch?.episode
  );

  return (
    <>
      {!data && (
        <div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div
              style={{
                flexBasis: '70%',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <Skeleton style={{ width: '100%', height: '80vh' }} />
              <Skeleton
                variant="text"
                style={{ width: '100%', height: '40px' }}
              />
              <Skeleton
                variant="text"
                style={{ width: '100%', height: '40px' }}
              />
            </div>
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
              }}
            >
              {new Array(6).fill(0).map((_, i) => (
                <Skeleton key={i} style={{ width: '100%', height: '90px' }} />
              ))}
            </div>
          </div>
        </div>
      )}
      {data && (
        <div className="watch">
          <div className="watch__left">
            {id && (
              <iframe
                title={data?.detail?.title}
                src={
                  data.detail?.media_type === 'tv'
                    ? watch && embedTv(+id, watch?.season, watch?.episode)
                    : embedMovie(id)
                }
                // src="https://www.youtube.com/embed?v=zlTlHyo3_ok"
                allowFullScreen
              ></iframe>
            )}
            <div className="watch__title">
              {data.detail?.media_type === 'tv' ? (
                <h1>{data?.detail?.name}</h1>
              ) : (
                <h1>{data?.detail?.title}</h1>
              )}
              {episode && <span>{episode.name}</span>}
            </div>
            <div className="watch__info">
              <span>
                <span>
                  <AiFillStar className="watch-icon" />
                  <span>{data?.detail?.vote_average.toFixed(1)}</span>
                </span>
                <span>
                  <AiTwotoneCalendar className="watch-icon" />
                  {data.detail?.media_type === 'tv' ? (
                    <span>{data?.detail?.first_air_date}</span>
                  ) : (
                    <span>{data?.detail?.release_date}</span>
                  )}
                </span>
              </span>
              {data.detail?.media_type === 'tv' ? (
                <span>
                  <span>Season {watch?.season}</span>
                  <span>-</span>
                  <span>Episode {watch?.episode}</span>
                </span>
              ) : (
                <span>{(data.detail as IDetailMovie).runtime} Minute</span>
              )}
            </div>
            <div className="watch__overview">
              <h2>Overview</h2>
              {data.detail?.media_type === 'tv' ? (
                <>
                  {(episode || data?.detailSeasons) && (
                    <p>{episode?.overview || data.detail.overview}</p>
                  )}
                </>
              ) : (
                <p>{data.detail?.overview}</p>
              )}
            </div>
          </div>
          <div className="watch__right">
            {data.detail?.media_type === 'tv' ? (
              <>
                {watch &&
                  data.detailSeasons?.map(season => (
                    <Season
                      key={season.id}
                      season={season}
                      active={watch.season == season.season_number}
                      watch={watch}
                    ></Season>
                  ))}
              </>
            ) : (
              <div className="watch__recommendations">
                <h1>Recommendations</h1>
                {data.recommendations?.map(rec => (
                  <Recommendation key={rec.id} data={rec} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Watch;
