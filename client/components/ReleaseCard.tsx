import React from 'react';
import { Link } from 'react-router-dom';
import { DiscogsEntry } from '../interfaces/DiscogsEntry';

type ReleaseCardProps = {
  key?: number;
  release?: number;
  albumArt?: string;
  title?: string;
  year?: number;
  artist?: string;
  queue: DiscogsEntry[];
  setQueue: React.Dispatch<React.SetStateAction<DiscogsEntry[]>>;
}

const ReleaseCard = ({ 
  key,
  release,
  albumArt,
  title,
  year,
  artist,
  queue,
  setQueue
 }: ReleaseCardProps) => {

  const handleAddToQueueBtnClick = () => {
    fetch(`/api/addToQueue/${release}`, {
      method: 'POST'
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setQueue(queue => [...queue, res])
      }).catch(err => console.log(err))
  } 

  return (
    <div className="release">
      <div className="coverImgContainer">
        <img
          className="coverImg"
          src={albumArt}
          alt={`${title} by ${artist}`}
          loading="lazy"
        />
        <div className="overlay">
          <button className="overlayBtn" onClick={handleAddToQueueBtnClick}>Add to Queue</button>
          <button className="overlayBtn">Release Details</button>
        </div>
      </div>
    </div>
  );
};

export default ReleaseCard;
