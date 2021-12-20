import React, { useEffect } from 'react';
import QueueCard from './QueueCard';

const Queue = (props) => {

  useEffect(() => {
    const currentQueue = [];
    for (let release of props.queue) {
      currentQueue.push(<QueueCard 
        key={release.id}
        release={release.id}
        instance={release.instance_id}
        albumArt={release.basic_information.cover_image}
        title={release.basic_information.title}
        year={release.basic_information.year}
        artist={release.basic_information.artists[0].name}
      />)
    }
  }, [props.queue])

    const currentQueue = [];
    for (let release of props.queue) {
      currentQueue.push(<QueueCard 
        key={release.id}
        release={release.id}
        instance={release.instance_id}
        albumArt={release.basic_information.cover_image}
        title={release.basic_information.title}
        year={release.basic_information.year}
        artist={release.basic_information.artists[0].name}
      />)
      }

  return (
    <div className="mainSection">
      {currentQueue}
    </div>
  );
};

export default Queue;
