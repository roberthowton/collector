import React from 'react';
import { Link } from 'react-router-dom';

const ReleaseCard = (props) => {

  const handleAddToQueueBtnClick = () => {
    fetch(`/api/addToQueue/${props.release}`, {
      method: 'POST'
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        props.setQueue(queue => [...queue, res])
      }).catch(err => console.log(err))
  } 

  return (
    <div className="release">
      <div className="coverImgContainer">
        <img
          className="coverImg"
          src={props.albumArt}
          alt={`${props.title} by ${props.artist}`}
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
