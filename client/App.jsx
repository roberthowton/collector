import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Collection from './components/Collection';
import './stylesheets/styles.scss';
import { SidePane } from 'react-side-pane';
import Queue from './components/Queue';

const App = () => {
  const [collection, setCollection] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [totalReleases, setTotalReleases] = useState(null);
  const [queue, setQueue] = useState([]);
  const [btnText, setBtnText] = useState('Queue');
  const [btnLink, setBtnLink] = useState('/queue');

  useEffect(() => {
    fetch('/api/getQueue')
      .then((res) => res.json())
      .then((res) => {
        setQueue(res.collection);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/getCollection/${pageNum}`)
      .then((res) => res.json())
      .then((res) => {
        setCollection((collection) => {
          return collection.concat(res.collection);
        });
        setTotalReleases(res.totalReleases);
        setTotalPages(res.totalPages);
        setPageNum((pageNum) => pageNum + 1);
      })
      .catch((err) => console.log('App.useEffect error: Error: ', err));

    // // needs attention
    // for (let i = 2; i <= totalPages; i++) {
    //   fetch(`api/collection/${pageNum}`)
    //     .then((res) => res.json())
    //     .then((res) => {
    //       setCollection((collection) => {
    //         console.log(res.collection);
    //         return collection.concat(res.collection);
    //       });
    //       setPageNum((pageNum) => pageNum + 1);
    //     });
    // }
    // console.log(collection);
  }, []);

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
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
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
