import React, { useEffect } from 'react';
import ReleaseCard from './ReleaseCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { DiscogsEntry } from '../interfaces/DiscogsEntry';

type CollectionProps = {
  collectionData: DiscogsEntry[];
  setCollection: React.Dispatch<React.SetStateAction<DiscogsEntry[]>>;
  queue: DiscogsEntry[];
  setQueue: React.Dispatch<React.SetStateAction<DiscogsEntry[]>>;
  collectionLength: number;
  pageNum: number;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  totalReleases: number;
};

const Collection = ({
  collectionData,
  setCollection,
  queue,
  setQueue,
  collectionLength,
  pageNum,
  setPageNum,
  totalReleases
}: CollectionProps) => {
  const releases = [];
  for (let release of collectionData) {
    releases.push(
      <ReleaseCard
        key={release.id}
        release={release.id}
        albumArt={release.basic_information.cover_image}
        title={release.basic_information.title}
        year={release.basic_information.year}
        artist={release.basic_information.artists[0].name}
        queue={queue}
        setQueue={setQueue}
      />
    );
  }

  let page = pageNum;

  const fetchData = () => {
    // console.log(totalReleases, pageNum);
    // const nextPage = pageNum + 1;
    fetch(`/api/getCollection/${page}`)
      .then((res) => res.json())
      .then((res) => {
        setCollection((collection) => {
          return collection.concat(res.collection);
        });
        // setPageNum(nextPage);
        // log(props.pageNum)
        page++;
      })
      .catch((err) => console.log('App.useEffect error: Error: ', err));
  };

  return (
    // <InfiniteScroll
    //     dataLength={props.totalReleases}
    //     next={fetchData}
    //     hasMore={true}
    //     loader={<h2 className="loading">Gathering collection...</h2>}
    //     endMessage={<h4>That's it!</h4>}
    //   >
    <section className="mainSection">{releases}</section>
    // </InfiniteScroll>
  );
};

export default Collection;
