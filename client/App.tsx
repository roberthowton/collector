import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Collection from './components/Collection';
import './stylesheets/styles.scss';
import { SidePane } from 'react-side-pane';
import Queue from './components/Queue';
import { DiscogsEntry } from './interfaces/DiscogsEntry';

const App = () => {
  const [collection, setCollection] = useState<DiscogsEntry[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalReleases, setTotalReleases] = useState<number>(0);
  const [queue, setQueue] = useState<DiscogsEntry[]>([]);
  const [btnText, setBtnText] = useState<string>('Queue');
  const [btnLink, setBtnLink] = useState<string>('/queue');

  const fetchCollection = () => {
    fetch(`/api/getCollection/${pageNum}`)
      .then((res) => res.json())
      .then((res) => {
        setCollection((collection) => {
          return collection.concat(res.collection);
        });
        setTotalReleases(res.totalReleases);
        setTotalPages(res.totalPages);
        setPageNum(pageNum + 1);
      })
      .catch((err) => console.log('Error fetching collection: ', err));
  };

  useEffect(() => {
    fetch('/api/getQueue')
      .then((res) => res.json())
      .then((res) => {
        setQueue(res.collection);
      });
  }, [queue]);

  useEffect(() => {
    if (pageNum === 1 || pageNum <= totalPages) fetchCollection()
  }, [pageNum]);

  const handleNavBtnClick = () => {
    if (btnText === 'Queue') setBtnText('Collection');
    else setBtnText('Queue');
    if (btnLink === '/queue') setBtnLink('/');
    else setBtnLink('/queue');
  };

  return (
    <Router>
      <div>
        <div id="navbar">
          <header>Collector.</header>
          <nav>
            <Link to={btnLink}>
              <button className="queueToggle" onClick={handleNavBtnClick}>
                {btnText}
              </button>
            </Link>
          </nav>
        </div>
        <Switch>
          <Route path="/queue">
            {/* <SidePane
              open={true} 
              width={50}
              duration={250}
              offset={10}
              style={
                {backgroundColor: "#131516"}
              }
              onClose={() => {console.log('I don\'t know how to make this work')}}> */}
            <Queue
              collectionData={collection}
              queue={queue}
              setQueue={setQueue}
            />
            {/* </SidePane> */}
          </Route>
          <Route path="/">
            <Collection
              collectionData={collection}
              setCollection={setCollection}
              queue={queue}
              setQueue={setQueue}
              collectionLength={totalPages}
              pageNum={pageNum}
              setPageNum={setPageNum}
              totalReleases={totalReleases}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
