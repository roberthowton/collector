import { useEffect, useState } from "react";
import axios from 'axios';
import { urlencoded } from "express";

const useCollectionFetch = (pageNum, perPage, user, token, sort = 'artist', sort_order = 'asc') => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [releases, setReleases] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel

    axios({
      method: 'GET',
      url: `https://api.discogs.com/users/${user}/collection/folders/${folder_id}/releases?sort=${sort}&sort_order=${sort_order}&page=${pageNum}&per_page=${perPage}&User-Agent="collector/1.0"&Authorization="Discogs token=${token}"`,
    })
      .then(res => {
        setReleases(prevReleases => {
          return [...prevReleases, res.releases]
        })
        setHasMore(res.pagination.page < res.pagination.pages);
        setLoading(false);
      })
      .catch(err => {
        if (axios.isCancel(err)) return;
        setError(true);
      })
      return () => cancel();
  }, [pageNum]);

  return { loading, error, releases, hasMore }
}

export default useCollectionFetch;