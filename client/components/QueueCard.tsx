import React from 'react';
import { Link } from 'react-router-dom';

const QueueCard = (props) => {
  const handleRemoveFromQueueBtnClick = () => {
    let newQueue;
    console.log('releaseID', props.release)
    console.log('instanceID', props.instance)
    fetch(`/api/deleteFromQueue/${props.release}/${props.instance}`, {
      method: 'DELETE'
    })
    .then(() => {
      newQueue = props.queue.filter(
        release => release.id !== props.release && release.instance_id !== props.instance
      )
      props.setQueue(newQueue)
    })
    .catch(err => console.log(err))
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
          <button className="overlayBtn" onClick={handleRemoveFromQueueBtnClick}>Remove from Queue</button>
          <button className="overlayBtn">Release Details</button>
        </div>
      </div>
    </div>
  );
};

export default QueueCard;