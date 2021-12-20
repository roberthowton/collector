import React, { useEffect } from 'react';
import ReleaseCard from './ReleaseCard';
import InfiniteScroll from 'react-infinite-scroll-component';

const Collection = (props) => {
  const releases = [];
  for (let release of props.collectionData) {
    releases.push(
      <ReleaseCard
        key={release.id}
        release={release.id}
        albumArt={release.basic_information.cover_image}
        title={release.basic_information.title}
        year={release.basic_information.year}
        artist={release.basic_information.artists[0].name}
        queue={props.queue}
        setQueue={props.setQueue}
      />
    );
  }

  let page = props.pageNum;

  const fetchData = () => {
    // console.log(props.totalReleases, props.pageNum);
    // const nextPage = props.pageNum + 1;
    fetch(`/api/getCollection/${page}`)
      .then((res) => res.json())
      .then((res) => {
        props.setCollection((collection) => {
          return collection.concat(res.collection);
        });
        // props.setPageNum(nextPage);
        // console.log(props.pageNum)
        page++;
      })
      .catch((err) => console.log('App.useEffect error: Error: ', err));
  };

  return (
    <InfiniteScroll
        dataLength={props.totalReleases}
        next={fetchData}
        hasMore={true}
        loader={<h2 className="loading">Gathering collection...</h2>}
        endMessage={<h4>That's it!</h4>}
      >
    <section className="mainSection">
        {releases}
    </section>
      </InfiniteScroll>
  );
};

export default Collection;
